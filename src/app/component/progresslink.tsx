'use client';

import Link from "next/link";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";

interface ProgressLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export default function ProgressLink({ href, children, ...props }: ProgressLinkProps) {
  const pathname = usePathname();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't start progress if we're already on this page
    if (pathname === href) {
      e.preventDefault();
      return;
    }
    NProgress.start();
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}