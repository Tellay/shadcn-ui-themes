"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const avaliableRadius = [
  {
    value: 0,
  },
  {
    value: 0.3,
  },
  {
    value: 0.5,
  },
  {
    value: 0.75,
  },
  {
    value: 1.0,
  },
];

export function Radius() {
  const [activeRadius, setActiveRadius] = useState({ value: 0.5 });

  const handleClick = (radius: { value: number }) => {
    document.documentElement.style.setProperty(
      "--radius",
      `${radius.value}rem`,
    );

    setActiveRadius(radius);
  };

  return (
    <div className="relative grid w-full grid-cols-3 gap-1 border border-transparent px-2 py-1">
      {avaliableRadius.map((radius) => (
        <Button
          key={radius.value}
          className={
            activeRadius.value === radius.value
              ? "border-2 border-primary font-semibold"
              : ""
          }
          variant={"outline"}
          size={"sm"}
          onClick={() => handleClick(radius)}
        >
          {radius.value}
        </Button>
      ))}
    </div>
  );
}
