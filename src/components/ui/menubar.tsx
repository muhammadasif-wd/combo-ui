import Link from "next/link";
import { Button } from "./button";

const Menubar = () => {
  return (
    <div className="flex flex-col gap-1.5">
      <Link href="/components/hierarchy-tree">
        <Button variant={"outline"} className="w-full p-1">
          Hierarchy Tree
        </Button>
      </Link>
    </div>
  );
};

export default Menubar;
