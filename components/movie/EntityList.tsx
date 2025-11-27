'use client';

import Image from 'next/image';

interface EntityItem {
  id: string | number;
  name: string;
  logoUrl?: string;
  subtitle?: string;
}

interface EntityListProps {
  title: string;
  items: EntityItem[];
  logoSize?: number;
}

export function EntityList({ title, items, logoSize = 40 }: EntityListProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            {item.logoUrl && (
              <Image
                src={item.logoUrl}
                alt={item.name}
                width={logoSize}
                height={logoSize}
                className="rounded bg-white p-1"
              />
            )}
            <div>
              <p className="font-medium">{item.name}</p>
              {item.subtitle && (
                <p className="text-sm text-gray-400">{item.subtitle}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
