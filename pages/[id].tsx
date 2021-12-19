import type { GetStaticProps, NextPage } from "next";
import ExampleCode from "../components/ExampleCode";
import { Example, getExamples } from "../examples";

const Page: NextPage<{ id: string; examples: Example[] }> = ({
  id,
  examples,
}) => {
  return <ExampleCode id={id} examples={examples} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      id: params?.id,
      examples: JSON.parse(JSON.stringify(getExamples())),
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: getExamples()
      .filter((x) => !!x.id)
      .map((x) => `/${x.id}`),
    fallback: false,
  };
}

export default Page;
