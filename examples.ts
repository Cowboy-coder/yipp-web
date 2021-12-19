import { parse } from "yipp/lib/ApiParser";

const examples = [
  {
    id: "",
    name: "GET example",
    ast: parse(`
      enum UserType {
        Admin
        User
      }

      getUser: GET /users/:id(Int) {
        200: {
          body: {
            id: Int!
            username: String!
            type: UserType!
            createdAt: DateTime!
          }
        }
        404: {
          body: {
            message: String!
          }
        }
      }
    `),
  },
  {
    id: "post-example",
    name: "POST example",
    ast: parse(`
      login: POST /login {
        body: {
          username: String!
          password: String!
        }
        200: {
          body: {
            token: String!
          }
          headers: {
            x-rate-limit: String!
          }
        }
        400: {
          body: {
            message: String!
          }
        }
      }
    `),
  },
  {
    id: "doc-syntax",
    name: "Doc-syntax",
    ast: parse(`
      """
      Supports multi-line
      documentation
      """
      enum UserType {
        "and single-line"
        Admin
        User
      }

      """
      ... and different parts
      """
      getUser: GET /users/:id(Int) {
        "... can be documented."
        200: {
          "\\_👀_/"
          body: {
            """
            The documentation will be used in
            in the generated code. For example
            in typescript this will be converted
            to doc comments:
            /**
             * <generated>
             */
            """
            id: Int!
          }
        }
      }
    `),
  },
  {
    id: "nested-objects",
    name: "Nested objects",
    ast: parse(`
      enum Country {
        SE = "Sweden"
        UK = "United Kingdom"
      }
      type User {
        id: Int!
        firstName: String
        lastName: String
        createdAt: DateTime
        address: {
          city: String!
          country: Country!
          zipCode: String!
          lines: {
            line1: String!
            line2: String
          }!
        }!
      }

      getUsers: GET /users {
        query: {
          country: Country
          freeText: String
        }
        200: {
          body: [User!]
        }
      }
    `),
  },
  {
    id: "api-groups",
    name: "API groups",
    ast: parse(`
      api Authentication {
        login: POST /login {
          body: {
            username: String!
            password: String!
          }
          200: {
            body: {
              token: String!
            }
          }
        }
        logout: POST /logout {
          204: {}
        }
      }

      """
      Instead of every endpoint being
      exposed on top-level, API groups
      make it possible to group apis
      together.
      Also it makes it possible to describe
      a group of apis using Doc-syntax, like
      what I'm doing here.
      """
      api Users {
        get: GET /users/:id {
          200: {
            body: {
              id: String!
              username: String!
            }
          }
        }
      }
    `),
  },
  {
    id: "union-types",
    name: "Union types",
    ast: parse(`
      enum FeedType {
        Video
        Photo
        Post
      }

      type Video {
        id: String!
        videoUrl: String!
        type: "Video"!
      }

      type Photo {
        id: String!
        photoUrl: String!
        type: "Photo"!
      }

      type Post {
        id: String!
        postBody: String!
        type: "Post"!
      }

      """
      Unions are supported, but requires
      a discriminator field explicitly
      defined on all types. In this case
      it's \`type\`. For languages that
      doesn't support unions it's still
      possible to represent them using
      for example:
      \`\`\`
      struct Feed {
        type: string // 'Video', 'Post' or 'Photo'
        video: Video // nullable
        photo: Photo // nullable
        post: Post // nullable
      }
      \`\`\`
      """
      union Feed = Video | Photo | Post, type

      getFeed: GET /feed {
        200: {
          body: [Feed!]
        }
      }
    `),
  },
  {
    id: "large-example",
    name: "Large example",
    ast: parse(`
      type IsLoggedIn {
        "In the format of \`Bearer <JWT>\`"
        authorization: String!
      }

      type Field {
        """
        Uses dot-notation to signify errors
        in nested structures. For example:
        \`user.address.line1\`.
        """
        name: String!
        message: String!
      }

      "Returned on status code >= 400."
      type Error {
        message: String!
        fields: [Field!]!
      }

      enum UserType {
        admin
        user
      }

      type User {
        id: Int!
        username: String!
        age: Int!
        type: UserType!
        createdAt: DateTime!
      }

      api Auth {
        login: POST /login {
          body: {
            username: String!
            password: String!
          }

          200: {
            body: {
              """
              The JWT token.
              """
              token: String!
            }
          }

          400: {
            body: Error
          }
        }
        logout: POST /logout {
          headers: IsLoggedIn
          "Returns no content if successful"
          204: {
          }
        }
      }

      api Users {
        getAll: GET /users {
          headers: IsLoggedIn

          query: {
            q: String
          }

          200: {
            body: [User!]
          }

          400: {
            body: Error
          }
        }


        get: GET /users/:id(Int) {
          headers: IsLoggedIn

          200: {
            body: User
          }

          400: {
            body: Error
          }
        }


        create: POST /users {
          headers: IsLoggedIn

          body: {
            username: String!
            age: Int!
          }

          200: {
            body: User
          }

          400: {
            body: Error
          }
        }

        update: PATCH /users/:id(Int) {
          headers: IsLoggedIn

          body: {
            username: String
            age: Int
            "only admins can set this"
            type: UserType
          }

          200: {
            body: User
          }

          400: {
            body: Error
          }

          404: {
            body: Error
          }
        }

        delete: DELETE /users/:id(Int) {
          headers: IsLoggedIn
          "Returns no content if successful"
          204: {}
        }
      }
    `),
  },
];

export type Example = typeof examples[number];

export const getExamples = () => examples;

export const getExample = (id: string) => examples.find((x) => x.id === id);
