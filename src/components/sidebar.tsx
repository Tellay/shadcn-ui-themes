import { themeColors } from "@/lib/theme";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Radius } from "@/components/radius";
import { ResetTheme } from "@/components/reset-theme";
import { Item } from "@/components/item";

export async function Sidebar() {
  return (
    <aside className="sticky top-0 z-30 hidden h-[calc(100vh-3.6rem)] w-full shrink-0 md:block">
      <ScrollArea className="relative h-full overflow-hidden py-6 pl-8 pr-6 lg:py-8">
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
    </aside>
  );
}
