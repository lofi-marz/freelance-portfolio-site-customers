'use client';
import { useState } from 'react';
const visible = false;
export function ColumnOverlay() {
    if (!visible) return null;
    return (
        <div
            className="pointer-events-none fixed inset-0 z-50 grid h-full w-full grid-cols-12 gap-6 px-6 opacity-10 mix-blend-difference"
            onKeyDown={(e) => console.log(e.key)}>
            {[...new Array(12)].map((_, i) => (
                <div key={i} className="rounded bg-primary" />
            ))}
        </div>
    );
}
