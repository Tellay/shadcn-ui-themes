import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { themeColors } from "@/lib/theme";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColors() {
  let themeString = themeColors.map((item) => {
    const rootStyles = window.getComputedStyle(document.documentElement);
    const color = rootStyles
      .getPropertyValue(item.variable)
      .split(" ")
      .join(" ");
    return { title: item.title, variable: item.variable, color };
  });

  return themeString;
}

export function getRadius() {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const defaultRadius = rootStyles.getPropertyValue("--radius").split(" ");

  return defaultRadius[0];
}
