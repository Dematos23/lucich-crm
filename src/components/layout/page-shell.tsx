import * as React from "react";

import { cn } from "@/lib/utils";

type PageShellProps = React.HTMLAttributes<HTMLDivElement>;

export function PageShell({ className, ...props }: PageShellProps) {
  return (
    <div
      className={cn("w-full max-w-full min-w-0 overflow-x-hidden", className)}
      {...props}
    />
  );
}
