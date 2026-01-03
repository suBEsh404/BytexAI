// src/components/RatingStars.jsx
import React from 'react';

export default function RatingStars({ value = 0, size = 16, onChange = null, rating }) {
  const stars = [1,2,3,4,5];
  const ratingValue = rating ?? value;
  const filled = (s) => s <= Math.round(ratingValue);
  
  const sizeMap = { xs: 14, sm: 16, md: 18, lg: 20 };
  const starSize = typeof size === 'string' ? sizeMap[size] || 16 : size;
  
  return (
    <div style={{ display:'flex', gap:4, alignItems:'center' }}>
      {stars.map(s => (
        <svg
          key={s}
          onClick={() => onChange && onChange(s)}
          width={starSize}
          height={starSize}
          viewBox="0 0 20 20"
          className={`transition-all duration-200 ease-in-out ${onChange ? 'cursor-pointer hover:scale-105' : ''} ${filled(s) ? 'fill-[#FBBF24] stroke-[#FBBF24] dark:fill-[#FBBF24] dark:stroke-[#FBBF24] hover:fill-[#F59E0B] hover:stroke-[#F59E0B] hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]' : 'fill-none stroke-[#94A3B8] dark:stroke-[rgba(255,255,255,0.18)]'}`}
          strokeWidth="1.2"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.374 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.374 2.455c-.784.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.635 9.393c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69L9.05 2.927z"/>
        </svg>
      ))}
    </div>
  );
}
