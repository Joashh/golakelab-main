'use client';

import Link from "next/link";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface ProgressLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export default function ProgressLink({ href, children, ...props }: ProgressLinkProps) {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const cleanHref = href.startsWith("/") ? href : `/${href}`;
    
    if (pathname === cleanHref) {
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