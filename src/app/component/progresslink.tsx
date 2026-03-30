'use client';

import Link from "next/link";
import NProgress from "nprogress";

export default function ProgressLink({ href, children, ...props }: any) {
  const handleClick = () => {
    NProgress.start();
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}