"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIStubButton({
  label = "Improve with AI",
}: {
  label?: string;
}) {
  const [pinged, setPinged] = React.useState(false);
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
      onClick={() => {
        setPinged(true);
        setTimeout(() => setPinged(false), 1800);
      }}
    >
      <Sparkles className="h-3.5 w-3.5" />
      {pinged ? "AI assist — coming soon" : label}
    </Button>
  );
}
