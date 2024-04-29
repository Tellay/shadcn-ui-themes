"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getColors, getRadius, removeWhitespaces } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Theme, savedTheme } from "@/lib/theme";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

interface ISaveThemeFormProps {
  handleClose: () => void;
}

export function SaveThemeForm({ handleClose }: ISaveThemeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {
    const themeColors = getColors();
    const themeRadius = getRadius();

    const themeData = {
      name: data.name,
      colors: themeColors.map(({ title, variable, color }) => {
        return {
          title,
          variable,
          color,
        };
      }),
      radius: themeRadius,
    };

    const SAVED_THEMES_KEY = "saved_themes";
    let savedThemes: savedTheme[] = JSON.parse(
      localStorage.getItem(SAVED_THEMES_KEY) || "[]",
    );

    const hasSameThemeName = savedThemes.some(
      (savedTheme) =>
        removeWhitespaces(savedTheme.name) === removeWhitespaces(data.name),
    );

    if (hasSameThemeName) {
      toast({
        title: "Ops!",
        description: "Theme with the same name already exists!",
      });
      return;
    }

    localStorage.setItem(
      SAVED_THEMES_KEY,
      JSON.stringify([...savedThemes, themeData]),
    );

    toast({ title: "Wohoo!", description: "Theme save to local storage!" });
    form.reset();
    handleClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn-theme" {...field} />
              </FormControl>
              <FormDescription>
                This will be the way the theme will be identified.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
