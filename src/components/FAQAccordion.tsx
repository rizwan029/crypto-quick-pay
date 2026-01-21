import React, { useState } from 'react';

export type FaqItem = { q: string; a: string; id?: string; };

export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id || null);
  return (
    <div className="w-full">
      {items.map((it, idx) => {
        const id = it.id || String(idx);
        const isOpen = open === id;
        return (
          <div key={id} className="border-b">
            <button onClick={() => setOpen(isOpen ? null : id)} className="w-full text-left p-4 flex justify-between">
              <span>{it.q}</span>
              <span>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <div className="p-4 bg-gray-50">{it.a}</div>}
          </div>
        );
      })}
    </div>
  );
}