import React from "react";
import { Button } from "./Button";

interface TableRowProps {
  title: string;
  updatedAt: string;
  onView?: () => void;
}

export function TableRow({
  title,
  updatedAt,
  onView,
}: TableRowProps) {
  return (
    <tr className="border-b border-border hover:bg-neutral-50 transition-colors">
      <td className="py-3 pr-4">
        <div
          className="font-medium text-foreground"
          style={{
            fontSize: "var(--text-body)",
            lineHeight: "var(--leading-body)",
          }}
        >
          {title}
        </div>
      </td>
      <td className="py-3 px-4">
        <div
          className="text-muted-foreground"
          style={{
            fontSize: "var(--text-small)",
            lineHeight: "var(--leading-small)",
          }}
        >
          {updatedAt}
        </div>
      </td>
      <td className="py-3 pl-4">
        <Button variant="secondary" size="sm" onClick={onView}>
          Vis
        </Button>
      </td>
    </tr>
  );
}