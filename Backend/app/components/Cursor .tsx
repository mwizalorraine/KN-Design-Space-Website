'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    const over = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.magnetic')) cursor.classList.add('magnet');
    };
    const out = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.magnetic')) cursor.classList.remove('magnet');
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  return <div id="cursor" ref={ref}></div>;
} 