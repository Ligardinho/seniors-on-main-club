import type { Metadata } from "next"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { SiteShell } from "@/src/components/site-shell"
import { PageHero } from "@/src/components/Hero"
import { ContactForm } from "@/components/contact/ContactForm"

export const metadata: Metadata = {
  title: "Contact | Seniors on Main Club",
  description:
    "Get in touch with Seniors on Main Club. Visit us, call us, or send us a message.",
}

export default async function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact"
        title="We would love to hear from you"
        description="Whether you have a question, want to join, or just feel like saying hello — we are always happy to hear from you."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="space-y-6 md:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <h2 className="font-serif text-xl font-semibold text-accent">Get in touch</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Pop in on a Wednesday or reach out anytime. We would love to meet you.
              </p>

              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-accent">Address</p>
                    <p className="text-muted-foreground">675 Main Road, Northdene Queensburgh</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-accent">Phone</p>
                    <a href="tel:+27847129925" className="text-muted-foreground transition-colors hover:text-primary">
                      084 712 9925
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-accent">Email</p>
                    <a
                      href="mailto:hello@seniorsonmain.club"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      hello@seniorsonmain.club
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Clock className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-accent">Opening times</p>
                    <p className="text-muted-foreground">Every Wednesday, 10:00 AM &ndash; 2:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-secondary/40 p-7 shadow-sm">
              <h2 className="font-serif text-xl font-semibold text-accent">Want to join?</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                New members are always welcome. Just show up on a Wednesday or send us a message and we will help you settle in.
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
