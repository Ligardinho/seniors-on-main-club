import Link from "next/link"
import { Sun, MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-auto bg-accent text-accent-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sun className="size-6" aria-hidden="true" />
            </span>
            <span className="font-serif text-lg font-semibold">Seniors on Main Club</span>
          </div>
          <p className="mt-4 max-w-xs leading-relaxed text-accent-foreground/80">
            A friendly place for older adults to connect, stay active, and enjoy life together. Everyone is welcome.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg font-semibold">Explore</h2>
          <ul className="mt-4 space-y-2">
            {[
              { href: "/about", label: "About Us" },
              { href: "/activities", label: "Activities" },
              { href: "/gallery", label: "Gallery" },
              { href: "/contact", label: "Contact Us" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-accent-foreground/80 transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-lg font-semibold">Visit Us</h2>
          <ul className="mt-4 space-y-3 text-accent-foreground/80">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>675 Main Road, Northdene Queensburgh</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <a href="tel:+27847129925" className="transition-colors hover:text-primary">
                084 712 9925
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <a href="mailto:hello@seniorsonmain.club" className="transition-colors hover:text-primary">
                hello@seniorsonmain.club
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>Every Wednesday, 10:00 AM - 2:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-accent-foreground/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-accent-foreground/70 md:flex-row md:px-6">
          <p>&copy; {new Date().getFullYear()} Seniors on Main Club. All rights reserved.</p>
          <Link href="/login" className="transition-colors hover:text-primary">
            Members &amp; Staff Login
          </Link>
        </div>
      </div>
    </footer>
  )
}
