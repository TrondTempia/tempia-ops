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
    <tr 
      className="transition-colors"
      style={{ 
        borderBottom: `1px solid var(--color-border-default)`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <td className="py-3 pr-4">
        <div
          className="font-medium"
          style={{
            fontSize: "var(--text-body-size)",
            lineHeight: "var(--text-body-line-height)",
            color: "var(--color-text-primary)",
            fontWeight: "var(--font-weight-medium)"
          }}
        >
          {title}
        </div>
      </td>
      <td className="py-3 px-4">
        <div
          style={{
            fontSize: "var(--text-small-size)",
            lineHeight: "var(--text-small-line-height)",
            color: "var(--color-text-secondary)"
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