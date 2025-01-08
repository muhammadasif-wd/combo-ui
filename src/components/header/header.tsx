"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "../theme/mode-toggle";

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 8) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 inset-x-0 border-b select-none z-50",
        scroll && "backdrop-blur-md"
      )}
    >
      <div className="flex items-center justify-between py-4 container mx-auto">
        <div>Logo</div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-gray-600">
            Home
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium hover:text-gray-600"
          >
            Docs
          </Link>
          <Link
            href="/components"
            className="text-sm font-medium hover:text-gray-600"
          >
            Components
          </Link>
          <Link
            href="/blogs"
            className="text-sm font-medium hover:text-gray-600"
          >
            Blogs
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost">Log in</Button>
          <Button>Sign up</Button>
          <ModeToggle />
        </div>
        <MobileMenu />
      </div>
    </header>
  );
};

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px]">
        <SheetTitle>
          <span className="sr-only">Title</span>
        </SheetTitle>
        <div className="flex flex-col gap-4 mt-8">
          <Link href="/" className="text-lg font-medium hover:text-gray-600">
            Home
          </Link>
          <Link
            href="/docs"
            className="text-lg font-medium hover:text-gray-600"
          >
            Docs
          </Link>
          <Link
            href="/components"
            className="text-lg font-medium hover:text-gray-600"
          >
            Components
          </Link>
          <Link
            href="/Blogs"
            className="text-lg font-medium hover:text-gray-600"
          >
            Blogs
          </Link>
          <div className="flex gap-2 w-full mt-4">
            <Button className="w-full" variant="outline" size={"sm"}>
              Log in
            </Button>
            <Button className="w-full" size={"sm"}>
              Sign up
            </Button>
            <ModeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Header;
