import type { SVGProps } from "react";

/**
 * EcoTrail icon system — one consistent outline style.
 * 24×24 grid, 1.6 stroke, round caps/joins, currentColor.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 24, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Icon = {
  Map: (p: IconProps) => (
    <Base {...p}>
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </Base>
  ),
  Location: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 21c4-4.5 7-7.9 7-11a7 7 0 1 0-14 0c0 3.1 3 6.5 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Base>
  ),
  Compass: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </Base>
  ),
  Train: (p: IconProps) => (
    <Base {...p}>
      <rect x="5" y="3" width="14" height="14" rx="3" />
      <path d="M5 11h14M8 21l2-2m6 2-2-2" />
      <circle cx="8.5" cy="14" r=".6" fill="currentColor" />
      <circle cx="15.5" cy="14" r=".6" fill="currentColor" />
    </Base>
  ),
  Bus: (p: IconProps) => (
    <Base {...p}>
      <rect x="4" y="4" width="16" height="13" rx="2.5" />
      <path d="M4 11h16M8 21l1.5-2m7 2-1.5-2" />
      <circle cx="8" cy="14.5" r=".6" fill="currentColor" />
      <circle cx="16" cy="14.5" r=".6" fill="currentColor" />
    </Base>
  ),
  Flight: (p: IconProps) => (
    <Base {...p}>
      <path d="M10.5 3.5c.7-.7 1.6-.7 1.9.3l1.4 5.3 5.4 3.1c1 .6.9 1.6-.2 1.9l-4.7 1 -1 4.7c-.3 1.1-1.3 1.2-1.9.2l-3.1-5.4-5.3-1.4c-1-.3-1-1.2-.3-1.9" />
    </Base>
  ),
  Car: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 13.5 5.6 8A2 2 0 0 1 7.5 6.5h9A2 2 0 0 1 18.4 8L20 13.5" />
      <path d="M3 13.5h18v4a1 1 0 0 1-1 1h-1.5v-2h-11v2H4a1 1 0 0 1-1-1v-4Z" />
    </Base>
  ),
  Walk: (p: IconProps) => (
    <Base {...p}>
      <circle cx="13" cy="4.5" r="1.6" />
      <path d="M13 8v5l3 3M13 10l-3 1-1.5 3M13 13l-2 7M16 20l-1-4" />
    </Base>
  ),
  EV: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 13.5 5.6 8A2 2 0 0 1 7.5 6.5h9A2 2 0 0 1 18.4 8L18 13.5" />
      <path d="M4 13.5h16v4a1 1 0 0 1-1 1h-1v-2H6v2H5a1 1 0 0 1-1-1v-4Z" />
      <path d="m12 8.5-1.2 2h1.8L11.4 12.5" strokeWidth={1.3} />
    </Base>
  ),
  Accessibility: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="4.5" r="1.7" />
      <path d="M5 8.5c2 .8 4.5 1.2 7 1.2s5-.4 7-1.2M12 9.5V15l3.5 5M12 12l-3.5 8" />
    </Base>
  ),
  Wheelchair: (p: IconProps) => (
    <Base {...p}>
      <circle cx="10" cy="4" r="1.6" />
      <path d="M10 7v5h4.5l2 5M10 12a5 5 0 1 0 4.7 6.6" />
      <path d="M17 17h2" />
    </Base>
  ),
  Carbon: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 15a5.5 5.5 0 0 1 5.5-5.5c1 0 2 .3 2.8.8" />
      <path d="M15 4c-1.5 3 .5 4.5 2 6s2.5 4-.5 6.5" />
      <circle cx="9.5" cy="15" r="5.5" />
    </Base>
  ),
  Leaf: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 19c0-8 5-13 14-13 0 9-5 14-13 14a6 6 0 0 1-1-1Z" />
      <path d="M8 16c3-3 6-4.5 9-5.5" />
    </Base>
  ),
  AI: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3.5 13.4 8 18 9.4 13.4 10.8 12 15.5 10.6 10.8 6 9.4 10.6 8 12 3.5Z" />
      <path d="M18.5 15.5 19 17.5 21 18l-2 .5-.5 2-.5-2L16 18l2-.5.5-2ZM5.5 15 6 16.8 7.8 17.3 6 17.8 5.5 19.6 5 17.8 3.2 17.3 5 16.8 5.5 15Z" strokeWidth={1.2} />
    </Base>
  ),
  Weather: (p: IconProps) => (
    <Base {...p}>
      <circle cx="8" cy="8" r="3" />
      <path d="M8 2.5v1.5M8 12v1.5M2.5 8H4M12 8h1.5M4.2 4.2l1 1M11.8 4.2l-1 1" strokeWidth={1.3} />
      <path d="M9 17a3.5 3.5 0 0 1 6.8-1.2A3 3 0 1 1 16 21H9a2.2 2.2 0 0 1 0-4Z" />
    </Base>
  ),
  Calendar: (p: IconProps) => (
    <Base {...p}>
      <rect x="4" y="5" width="16" height="16" rx="2.5" />
      <path d="M4 9.5h16M8 3v4M16 3v4" />
    </Base>
  ),
  Clock: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  ),
  Money: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.2A2.7 2.7 0 0 0 12 7.8c-1.5 0-2.7.9-2.7 2s1.2 1.7 2.7 2 2.7 1 2.7 2-1.2 2-2.7 2a2.7 2.7 0 0 1-2.5-1.4M12 6.5v11" />
    </Base>
  ),
  Profile: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.7-3.6 3.5-5.5 7-5.5s6.3 1.9 7 5.5" />
    </Base>
  ),
  Settings: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.2 6.8l1.9 1.1M17.9 15.1l1.9 1.1M19.8 6.8l-1.9 1.1M6.1 15.1l-1.9 1.1" />
    </Base>
  ),
  Search: (p: IconProps) => (
    <Base {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Base>
  ),
  Notification: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6Z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </Base>
  ),
  Verified: (p: IconProps) => (
    <Base {...p}>
      <path d="m12 2.5 2.4 1.7 2.9-.2.9 2.8 2.4 1.7-.9 2.8.9 2.8-2.4 1.7-.9 2.8-2.9-.2L12 21.5l-2.4-1.7-2.9.2-.9-2.8L3.4 15l.9-2.8L3.4 9.4l2.4-1.7.9-2.8 2.9.2L12 2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  ),
  Warning: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 4 3 19.5h18L12 4Z" />
      <path d="M12 10v4M12 17h.01" />
    </Base>
  ),
  Info: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </Base>
  ),
  Check: (p: IconProps) => (
    <Base {...p}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Base>
  ),
  Chevron: (p: IconProps) => (
    <Base {...p}>
      <path d="m8 4 8 8-8 8" />
    </Base>
  ),
  Close: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 5 19 19M19 5 5 19" />
    </Base>
  ),
  Plus: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  ),
  Sliders: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </Base>
  ),
  Layers: (p: IconProps) => (
    <Base {...p}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5M3 16.5l9 5 9-5" strokeWidth={1.3} />
    </Base>
  ),
  Route: (p: IconProps) => (
    <Base {...p}>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H14a3.5 3.5 0 0 0 0-7H10a3.5 3.5 0 0 1 0-7h5.5" />
    </Base>
  ),
};

export type IconName = keyof typeof Icon;
