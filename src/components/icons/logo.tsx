import type { SVGProps } from 'react';

export function DarukaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="currentColor"
      {...props}
    >
      <path d="M50 10 C 20 20, 20 80, 50 90 C 80 80, 80 20, 50 10 Z M50 25 C 65 30, 65 70, 50 75 C 35 70, 35 30, 50 25 Z" />
      <circle cx="50" cy="50" r="10" />
    </svg>
  );
}
