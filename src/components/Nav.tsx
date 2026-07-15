"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Sun } from "lucide-react"
import { cn } from "@/src/lib/utils"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/activities", label: "Activities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
]

const Nav = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Sun className="size-6" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold text-accent">Seniors on Main</span>
            <span className="block text-xs font-semibold uppercase tracking-wide text-primary">Community Club</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-base font-semibold transition-colors",
                  active ? "bg-secondary text-accent" : "text-foreground/80 hover:bg-secondary/60 hover:text-accent",
                )}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/contact"
            className="ml-2 rounded-full bg-primary px-5 py-2 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Join Us
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-border text-accent md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-lg font-semibold",
                    active ? "bg-secondary text-accent" : "text-foreground hover:bg-secondary/60",
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-xl bg-primary px-4 py-3 text-center text-lg font-bold text-primary-foreground"
            >
              Join Us
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Nav