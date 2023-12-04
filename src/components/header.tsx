import Link from "next/link";

import { Logo } from "./logo";
import { GitHub } from "./icons";
import { buttonVariants } from "./ui/button";
import { ToggleTheme } from "./toggle-theme";
import { MobileSidebar } from "./mobile-sidebar";

export async function Header() {
  return (
    <header className="w-full border-b">
      <div className="container flex h-14 items-center justify-between">
        <MobileSidebar />
        <Link className="mr-6 hidden items-center space-x-2 md:flex" href="/">
          <Logo />
          <span className="font-bold">shadcn/ui themes</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            className={buttonVariants({ variant: "ghost", size: "icon" })}
            href="https://github.com/tellay/shadcn-themes"
            target="_blank"
          >
            <GitHub />
            <span className="sr-only">GitHub</span>
          </Link>

          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}
