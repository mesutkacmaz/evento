"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const routes = [
  { name: "Home", path: "/" },
  { name: "All Events", path: "/events/all" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center justify-between border-b border-white/10 px-3 sm:px-9">
      <Logo />
      <nav className="h-full">
        <ul className="flex h-full gap-x-6 text-sm">
          {routes.map((route) => (
            <li
              key={route.path}
              className={cn(
                "relative flex items-center transition hover:text-white",
                {
                  "text-white": pathname === route.path,
                  "text-white/50": pathname !== route.path,
                },
              )}
            >
              <Link href={route.path}>{route.name}</Link>

              {pathname === route.path && (
                <motion.div
                  layoutId="header-active-link"
                  className="absolute bottom-0 h-1 w-full bg-accent"
                ></motion.div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
