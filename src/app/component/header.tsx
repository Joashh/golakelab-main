'use client'
import ProgressLink from './progresslink';
import { Droplets, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

   const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Lakes', path: '/lake-categories' },
    { label: 'Data & Insights', path: '/data-insight' },
    { label: 'Downloads', path: '/downloads' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <ProgressLink href="/" className="flex items-center gap-3 group">
            <div className="bg-linear-to-br from-sky-500 to-emerald-500 p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Droplets className="size-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-slate-900">GoLake Lab</h1>
              <p className="text-xs text-slate-600 hidden sm:block">Governance Leadership, Advocacy for Knowledge Enhancement</p>
            </div>
          </ProgressLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
             {menuItems.map((item) => (
              <ProgressLink
                key={item.path}
                href={item.path}
                className="text-slate-700 hover:text-sky-600 transition-colors font-medium"
              >
                {item.label}
              </ProgressLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <ProgressLink
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-700 hover:text-sky-600 transition-colors py-2 font-medium"
                >
                  {item.label}
                </ProgressLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
