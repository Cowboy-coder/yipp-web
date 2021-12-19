import Link from "next/link";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen pb-12 px-2">
      <h1 className="tracking-widest py-2 h-54px leading-[54px] max-w-[800px] mx-auto text-[34px]">
        <Link href="/">
          <a className="text-inherit">yipp</a>
        </Link>
      </h1>
      <div className="w-full mx-auto grid max-w-[800px]">
        <p className="text-md pb-4">
          A schema format for designing JSON APIs, heavily inspired by GQL.
        </p>
        <p className="text-sm pb-8 max-w-lg">
          Check out how it can be used to generate a{" "}
          <a href="https://github.com/Cowboy-coder/yipp/tree/master/src/examples/fastify">
            fully typed, schema enforced fastify plugin
          </a>{" "}
          or a{" "}
          <a href="https://github.com/Cowboy-coder/yipp/tree/master/src/examples/axios-client">
            fully typed axios client
          </a>
          . Since the yipp specification is relatively(
          <a href="https://swagger.io/specification/#schema">!</a>) small it's
          possible to write generators in about ~100-200 lines of code to
          automate building your HTTP client of choice. Or even to build a fully
          typed and schema enforced API for your favorite web framework.
        </p>
        {children}
        <p className="font-mono text-sm pt-6">
          Check out <a href="https://github.com/Cowboy-coder/yipp">yipp</a> on
          github.
        </p>
      </div>
    </div>
  );
};

export default Layout;
