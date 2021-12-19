import Link from "next/link";
import { Example } from "../examples";
import Code from "./Code";

const ExampleCode = ({ id, examples }: { id: string; examples: Example[] }) => {
  const example = examples.find((e) => e.id === id);
  if (!example) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-8 w-full gap-0">
      <div className="w-full text-white col-span-6 mb-[2px]">
        <div className="text-white p-4 bg-zinc-800 rounded-xl md:rounded-tr-none w-full shadow-xl text-sm md:text-md">
          <Code ast={example.ast} />
        </div>
      </div>
      <ul className="col-span-2">
        {examples.map((ex) => (
          <li className="mb-[2px]" key={ex.id}>
            <Link href={`/${ex.id}`}>
              <a
                className={`block w-full text-left bg-zinc-800 h-10 leading-10 px-4 rounded-xl md:rounded-l-none font-mono text-sm shadow-sm ${
                  ex.id === example.id
                    ? "bg-zinc-800 text-amber-100"
                    : "bg-zinc-800/50 text-amber-100"
                } hover:bg-zinc-800 hover:text-amber-100`}
              >
                {ex.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleCode;
