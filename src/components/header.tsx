import Link from "next/link";

import { GitHub } from "@/components/icons";
import { Logo } from "@/components/logo";

import { ToggleTheme } from "@/components/toggle-theme";
import { MobileSidebar } from "@/components/mobile-sidebar";

import { buttonVariants } from "@/components/ui/button";

export async function Header() {
  return (
    <header className="w-full border-b">
      <div className="container flex h-14 items-center justify-between">
        <MobileSidebar />
        <Link
          className="mr-6 hidden items-center space-x-2 md:flex"
          href="https://github.com/shadcn-ui/ui"
          target="_blank"
        >
          <Logo />
          <span className="font-bold">shadcn/ui themes</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            className={buttonVariants({ variant: "ghost", size: "icon" })}
            href="https://github.com/Tellay/shadcn-ui-themes"
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
