import React from 'react';

export default function Testimonials({ items }: { items: { name: string; text: string; avatar?: string }[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((t, i) => (
        <div key={i} className="border p-4 rounded">
          <div className="flex items-center gap-3 mb-2">
            <img src={t.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}`} alt={t.name} className="w-10 h-10 rounded-full" />
            <div className="font-semibold">{t.name}</div>
          </div>
          <div className="text-sm">{t.text}</div>
        </div>
      ))}
    </div>
  );
}