import React from "react";
import {
  Ast,
  BodyType,
  ObjectField,
  ObjectVariable,
  Docs,
  ApiDefinition,
} from "yipp/lib/ApiParser";

const Colors = {
  type: "#e78a4e",
  field: "#7daea3",
  comment: "#928374",
  keyword: "#d8a657",
  string: "#a9b665",
  apiIdentifier: "#d3869b",
};

const Object = ({ obj, indent }: { obj: ObjectVariable; indent: number }) => {
  return (
    <>
      {"{"}
      {obj.fields.map((field, i) => (
        <React.Fragment key={i}>
          <br />
          <Field field={field.name} obj={field} indent={indent}></Field>
          {field.isRequired ? "!" : ""}
        </React.Fragment>
      ))}
      <br />
      {"}".padStart((indent - 1) * 2 + 1)}
    </>
  );
};

const Field = ({
  field,
  obj,
  indent,
}: {
  field: string;
  obj: ObjectVariable | BodyType | ObjectField | undefined;
  indent: number;
}) => {
  if (!obj) {
    return null;
  }
  const docs = obj.variableType !== "Object" ? obj.docs : undefined;
  return (
    <>
      <Comment docs={docs} indent={indent} />
      {"".padStart(indent * 2, " ")}
      <span style={{ color: "#7daea3" }}>{field}</span>
      {": "}
      {obj.variableType === "TypeReference" ? (
        <span style={{ color: "#e78a4e" }}>{obj.value}</span>
      ) : obj.variableType === "Array" ? (
        <>
          [
          <span style={{ color: "#e78a4e" }}>
            {obj.items.variableType === "TypeReference"
              ? obj.items.value
              : obj.items.variableType}
          </span>
          {obj.items.isRequired ? "!" : ""}]
        </>
      ) : obj.variableType === "Object" ? (
        <Object obj={obj} indent={indent + 1} />
      ) : obj.variableType === "StringLiteral" ? (
        <String>{obj.value}</String>
      ) : obj.variableType === "IntLiteral" ||
        obj.variableType === "FloatLiteral" ? (
        <Number>{obj.value}</Number>
      ) : (
        <span style={{ color: "#e78a4e" }}>{obj.variableType}</span>
      )}
    </>
  );
};
const Comment = ({ docs, indent }: { docs: Docs; indent: number }) => {
  if (!docs) {
    return null;
  }
  const pad = "".padStart(indent * 2, " ");
  return (
    <span style={{ color: "#928374" }}>
      {docs.isMultiLine ? (
        <>
          {pad}"""
          <br />
          {docs.value.split("\n").map((x, i) => (
            <React.Fragment key={i}>
              {pad}
              {x}
              <br />
            </React.Fragment>
          ))}
          {pad}"""
        </>
      ) : (
        <>
          {pad}"{docs.value}"
        </>
      )}
      <br />
    </span>
  );
};

const String: React.FC = ({ children }) => (
  <span style={{ color: "#a9b665" }}>"{children}"</span>
);

const Number: React.FC = ({ children }) => (
  <span style={{ color: "#d3869b" }}>{children}</span>
);

const Api = ({ api, indent }: { api: ApiDefinition; indent: number }) => {
  const pad = "".padStart(indent * 2, " ");
  return (
    <>
      <Comment docs={api.docs} indent={indent} />
      {pad}
      <span style={{ color: "#d3869b" }}>{api.name}</span>:{" "}
      <span style={{ color: "#d8a657", fontWeight: "bold" }}>{api.method}</span>{" "}
      <span
        style={{ color: "#7daea3" }}
        dangerouslySetInnerHTML={{
          __html:
            api.params?.fields.reduce((path, field) => {
              if (field.variableType === "String") {
                return path;
              }
              return path.replace(
                `:${field.name}`,
                `:${field.name}(<span style="color:#e78a4e">${field.variableType}</span>)`
              );
            }, api.path) ?? api.path,
        }}
      ></span>
      {" {"}
      {(["headers", "query", "body"] as const).map((type) =>
        api[type] ? (
          <React.Fragment key={type}>
            <Comment docs={api[type]?.docs} indent={indent + 1} />
            <br />
            <Field field={type} obj={api[type]} indent={indent + 1} />
          </React.Fragment>
        ) : undefined
      )}
      {api.responses.map((r, i) => {
        return (
          <React.Fragment key={i}>
            <br />
            <Comment docs={r.docs} indent={indent + 1} />
            {"".padStart((indent + 1) * 2, " ")}
            <span style={{ color: "#d8a657", fontWeight: "bold" }}>
              {r.status}
            </span>
            :{" {"}
            {(["body", "headers"] as const).map((type) =>
              r[type] ? (
                <React.Fragment key={type}>
                  <br />
                  <Comment docs={r[type]?.docs} indent={indent + 2} />
                  <Field field={type} obj={r[type]} indent={indent + 2} />
                </React.Fragment>
              ) : undefined
            )}
            <br />
            {pad}
            {"  }"}
          </React.Fragment>
        );
      })}
      <br />
      {pad}
      {"}"}
    </>
  );
};

const Code = ({ ast }: { ast: Ast }) => {
  return (
    <code className="whitespace-pre text-amber-100">
      {ast.definitions.map((definition, i) => {
        return (
          <React.Fragment key={i}>
            {definition.type === "EnumDeclaration" ? (
              <>
                <Comment docs={definition.docs} indent={0} />
                <span style={{ color: "#e78a4e" }}>enum</span>{" "}
                <span style={{ color: "#d8a657" }}>{definition.name}</span>{" "}
                {`{`}
                <br />
                {definition.fields.map((f, i) => (
                  <React.Fragment key={i}>
                    <Comment docs={f.docs} indent={1} />
                    {"  "}
                    <span style={{ color: "#7daea3" }}>{f.name}</span>
                    {f.name !== f.value && (
                      <>
                        {" = "}
                        <String>{f.value}</String>
                      </>
                    )}
                    <br />
                  </React.Fragment>
                ))}
                {`}`}
              </>
            ) : definition.type === "TypeDeclaration" ? (
              <>
                <Comment docs={definition.docs} indent={0} />
                <span style={{ color: "#e78a4e" }}>type</span>{" "}
                <span style={{ color: "#d8a657" }}>{definition.name}</span>{" "}
                <Object obj={definition} indent={1} />
              </>
            ) : definition.type === "UnionDeclaration" ? (
              <>
                <Comment docs={definition.docs} indent={0} />
                <span style={{ color: "#e78a4e" }}>union</span>{" "}
                <span style={{ color: "#d8a657" }}>{definition.name}</span>
                {" = "}
                {definition.items.map((item, i) => (
                  <React.Fragment key={i}>
                    <span style={{ color: "#7daea3" }}>{item.value}</span>
                    {i === definition.items.length - 1 ? ", " : " | "}
                  </React.Fragment>
                ))}
                <span style={{ color: "#7daea3" }}>
                  {definition.discriminator}
                </span>
              </>
            ) : definition.type === "ApiDefinition" ? (
              <Api api={definition} indent={0} />
            ) : definition.type === "ApiGroup" ? (
              <>
                <Comment docs={definition.docs} indent={0} />
                <span style={{ color: "#d3869b" }}>api</span>{" "}
                <span style={{ color: "#d3869b", fontWeight: "bold" }}>
                  {definition.name}
                </span>
                {" {"}
                <br />
                {definition.apis.map((api, i) => (
                  <React.Fragment key={i}>
                    <Api api={api} indent={1} />
                    {i !== definition.apis.length - 1 ? <br /> : null}
                  </React.Fragment>
                ))}
                <br />
                {"}"}
              </>
            ) : null}
            {i !== ast.definitions.length - 1 ? (
              <>
                <br />
                <br />
              </>
            ) : null}
          </React.Fragment>
        );
      })}
    </code>
  );
};

export default Code;
