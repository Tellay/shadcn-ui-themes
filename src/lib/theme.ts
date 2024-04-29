export interface Theme {
  title: string;
  variable: string;
}

export const themeColors = [
  {
    title: "Primary",
    variable: "--primary",
  },
  {
    title: "Primary Foreground",
    variable: "--primary-foreground",
  },
  {
    title: "Secondary",
    variable: "--secondary",
  },
  {
    title: "Secondary Foreground",
    variable: "--secondary-foreground",
  },
  {
    title: "Background",
    variable: "--background",
  },
  {
    title: "Foreground",
    variable: "--foreground",
  },
  {
    title: "Card",
    variable: "--card",
  },
  {
    title: "Card Foreground",
    variable: "--card-foreground",
  },
  {
    title: "Popover",
    variable: "--popover",
  },
  {
    title: "Popover Foreground",
    variable: "--popover-foreground",
  },
  {
    title: "Muted",
    variable: "--muted",
  },
  {
    title: "Muted Foreground",
    variable: "--muted-foreground",
  },
  {
    title: "Accent",
    variable: "--accent",
  },
  {
    title: "Accent Foreground",
    variable: "--accent-foreground",
  },
  {
    title: "Destructive",
    variable: "--destructive",
  },
  {
    title: "Destructive Foreground",
    variable: "--destructive-foreground",
  },
  {
    title: "Border",
    variable: "--border",
  },
  {
    title: "Input",
    variable: "--input",
  },
  {
    title: "Ring",
    variable: "--ring",
  },
];

export const radiusTheme = {
  title: "Radius",
  variable: "--radius",
};

export type savedTheme = {
  name: string;
  radius: string;
  colors: {
    title: string;
    variable: string;
  }[];
};
