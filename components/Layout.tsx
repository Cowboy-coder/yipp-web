const Layout: React.FC = ({ children }) => {
  return (
    <div className="text-amber-100 min-h-screen pb-12 px-2">
      <div className="text-amber-100 font-['Helvetica'] tracking-widest py-2 h-54px leading-[54px] max-w-[800px] mx-auto text-[34px]">
        yipp
      </div>
      <div className="w-full mx-auto grid max-w-[800px]">
        <p className="text-md pb-4 max-w-xl">
          yipp is a schema format for building HTTP REST servers and clients,
          borrowing heavily from the GQL syntax.
        </p>
        <p className="text-sm pb-8 max-w-lg">
          Check out how it can be used to generate a{" "}
          <a
            className="text-sky-500"
            href="https://github.com/Cowboy-coder/yipp/tree/master/src/examples/fastify"
          >
            fully typed, schema enforced fastify plugin
          </a>{" "}
          or a{" "}
          <a
            className="text-sky-500"
            href="https://github.com/Cowboy-coder/yipp/tree/master/src/examples/axios-client"
          >
            fully typed axios client
          </a>
          . Since the yipp specification is relatively small it's meant to be
          easy to write generators in about ~100-200 lines of code, for any
          programming language, server side framework or HTTP client.
        </p>
        {children}
        <p className="font-mono text-sm text-amber-100 pt-6">
          Check out{" "}
          <a
            className="text-sky-500"
            href="https://github.com/Cowboy-coder/yipp"
          >
            yipp
          </a>{" "}
          on github.
        </p>
      </div>
    </div>
  );
};

export default Layout;
