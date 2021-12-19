import type { GetStaticProps, NextPage } from "next";
import ExampleCode from "../components/ExampleCode";
import { Example, getExamples } from "../examples";

const Home: NextPage<{ examples: Example[] }> = ({ examples }) => {
  return (
    <>
      <ExampleCode id="" examples={examples} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      examples: JSON.parse(JSON.stringify(getExamples())),
    },
  };
};

export default Home;
