import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { SheetIcon } from "./icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "./logo";
import { themeColors } from "@/lib/theme";
import { Radius } from "./radius";
import { ResetTheme } from "./reset-theme";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Item } from "./item";

export async function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden" asChild>
        <Button variant="link" size={"icon"}>
          <SheetIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>
            <Link
              className="mr-6 flex items-center space-x-2 text-base"
              href="/"
            >
              <Logo />
              <span className="font-bold">shadcn/ui themes</span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="relative h-full overflow-hidden px-2 py-4 lg:py-8">
          <h4 className="mb-1 flex items-center justify-between rounded-md px-2 py-1 text-sm font-semibold">
            Theming
            <ResetTheme />
          </h4>

          <div className="grid grid-flow-row auto-rows-max pb-4 text-sm">
            {themeColors.map((item) => (
              <div key={item.title}>
                <Item theme={item} />
              </div>
            ))}
          </div>

          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            Radius
          </h4>

          <Radius />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
