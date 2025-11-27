'use client';

import { ReactNode } from 'react';

interface InfoItem {
  label: string;
  value: ReactNode;
  condition?: boolean;
}

interface InfoGridProps {
  items: InfoItem[];
  className?: string;
}

export function InfoGrid({ items, className = "grid-cols-1 sm:grid-cols-2" }: InfoGridProps) {
  const filteredItems = items.filter(item => item.condition !== false);

  if (filteredItems.length === 0) return null;

  return (
    <div className={`grid ${className} gap-6`}>
      {filteredItems.map((item, index) => (
        <div key={index}>
          <h3 className="font-semibold mb-1">{item.label}</h3>
          <div className="text-gray-300">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
