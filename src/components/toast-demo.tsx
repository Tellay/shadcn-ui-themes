"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export function ToastDemo({ className }: { className?: string }) {
  const { toast } = useToast();

  return (
    <Button
      className={cn(className)}
      variant="default"
      onClick={() =>
        toast({ title: "Wohoo!", description: "Your message has been sent." })
      }
    >
      Show Toast
    </Button>
  );
}
