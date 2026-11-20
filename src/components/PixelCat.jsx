import { useState } from 'react';

export default function PixelCat({ className = '', onPet }) {
  const [wagKey, setWagKey] = useState(0);

  return (
    <button
      type="button"
      onClick={() => {
        setWagKey((key) => key + 1);
        onPet?.();
      }}
      aria-label="Pet the pixel cat"
      title="Pet the cat"
      className={`pixel-cat w-[72px] h-[54px] md:w-[88px] md:h-[66px] p-0 border-0 bg-transparent cursor-pointer ${className}`}
    >
      <svg viewBox="0 0 64 48" aria-hidden="true" className="w-full h-full [image-rendering:pixelated]" shapeRendering="crispEdges">
        <g className="pixel-cat-walking">
        <g key={wagKey} className="pixel-cat-tail">
          <rect x="6" y="15" width="6" height="19" fill="#2B2118" />
          <rect x="10" y="11" width="7" height="9" fill="#2B2118" />
          <rect x="14" y="9" width="7" height="6" fill="#2B2118" />
          <rect x="8" y="17" width="3" height="14" fill="#D97721" />
          <rect x="12" y="13" width="5" height="5" fill="#F5A139" />
          <rect x="16" y="11" width="4" height="3" fill="#F5A139" />
        </g>

        <rect x="14" y="18" width="34" height="21" fill="#2B2118" />
        <rect x="17" y="20" width="30" height="16" fill="#E88927" />
        <rect x="22" y="22" width="4" height="7" fill="#B85B20" />
        <rect x="32" y="21" width="4" height="6" fill="#B85B20" />
        <rect x="24" y="31" width="17" height="5" fill="#F8C977" />

        <g className="pixel-cat-legs-a">
          <rect x="18" y="36" width="9" height="9" fill="#2B2118" />
          <rect x="37" y="36" width="9" height="9" fill="#2B2118" />
          <rect x="20" y="36" width="5" height="7" fill="#E88927" />
          <rect x="39" y="36" width="5" height="7" fill="#E88927" />
        </g>
        <g className="pixel-cat-legs-b">
          <rect x="15" y="36" width="10" height="9" fill="#2B2118" />
          <rect x="41" y="36" width="10" height="9" fill="#2B2118" />
          <rect x="17" y="36" width="6" height="7" fill="#E88927" />
          <rect x="43" y="36" width="6" height="7" fill="#E88927" />
        </g>

        <rect x="43" y="14" width="18" height="21" fill="#2B2118" />
        <rect x="45" y="8" width="6" height="10" fill="#2B2118" />
        <rect x="54" y="8" width="6" height="10" fill="#2B2118" />
        <rect x="47" y="11" width="3" height="7" fill="#F19D87" />
        <rect x="56" y="11" width="3" height="7" fill="#F19D87" />
        <rect x="45" y="16" width="14" height="16" fill="#F5A139" />
        <rect x="44" y="25" width="3" height="3" fill="#F8C977" />
        <rect x="57" y="25" width="3" height="3" fill="#F8C977" />
        <rect x="48" y="21" width="2" height="4" fill="#2B2118" />
        <rect x="55" y="21" width="2" height="4" fill="#2B2118" />
        <rect x="52" y="27" width="3" height="2" fill="#B85154" />
        <rect x="49" y="30" width="8" height="2" fill="#F8C977" />
        </g>

        <g className="pixel-cat-sitting">
          <g key={wagKey} className="pixel-cat-tail">
            <rect x="6" y="18" width="7" height="22" fill="#2B2118" />
            <rect x="9" y="36" width="12" height="7" fill="#2B2118" />
            <rect x="8" y="20" width="3" height="18" fill="#E88927" />
            <rect x="11" y="38" width="9" height="3" fill="#F5A139" />
          </g>
          <rect x="21" y="20" width="28" height="24" fill="#2B2118" />
          <rect x="23" y="22" width="24" height="20" fill="#E88927" />
          <rect x="27" y="23" width="5" height="8" fill="#B85B20" />
          <rect x="16" y="36" width="20" height="9" fill="#2B2118" />
          <rect x="18" y="36" width="16" height="7" fill="#F5A139" />
          <rect x="38" y="39" width="18" height="6" fill="#2B2118" />
          <rect x="40" y="39" width="14" height="4" fill="#F8C977" />
          <rect x="43" y="14" width="18" height="21" fill="#2B2118" />
          <rect x="45" y="8" width="6" height="10" fill="#2B2118" />
          <rect x="54" y="8" width="6" height="10" fill="#2B2118" />
          <rect x="47" y="11" width="3" height="7" fill="#F19D87" />
          <rect x="56" y="11" width="3" height="7" fill="#F19D87" />
          <rect x="45" y="16" width="14" height="16" fill="#F5A139" />
          <rect x="44" y="25" width="3" height="3" fill="#F8C977" />
          <rect x="57" y="25" width="3" height="3" fill="#F8C977" />
          <rect x="48" y="21" width="2" height="4" fill="#2B2118" />
          <rect x="55" y="21" width="2" height="4" fill="#2B2118" />
          <rect x="52" y="27" width="3" height="2" fill="#B85154" />
          <rect x="49" y="30" width="8" height="2" fill="#F8C977" />
        </g>
      </svg>
    </button>
  );
}
