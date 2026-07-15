import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, Heart, Users, ShieldCheck, Sparkles } from "lucide-react"
import { SiteShell } from "@/src/components/site-shell"
import { PageHero } from "@/src/components/Hero"

export const metadata: Metadata = {
  title: "About Us | Seniors on Main Club",
  description:
    "Learn about the story, mission, and values of Seniors on Main Club - a welcoming community for older adults.",
}

const VALUES = [
  { icon: Heart, title: "Kindness first", text: "Every member is treated with warmth, patience, and respect - no exceptions." },
  { icon: Users, title: "Belonging", text: "We make sure nobody sits alone. There is always a seat and a friend for you here." },
  { icon: ShieldCheck, title: "Safe & inclusive", text: "A welcoming space for people of all backgrounds, abilities, and walks of life." },
  { icon: Sparkles, title: "Joyful living", text: "We believe later life should be full of laughter, purpose, and new experiences." },
]

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About Us"
        title="A community built on friendship"
        description="For over a decade, Seniors on Main Club has been a home away from home for older adults in our neighbourhood."
      />

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
          <Image
            src="/about-community.png"
            alt="Two senior friends chatting warmly on a bench outside the community centre"
            width={640}
            height={520}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Our story</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-balance text-accent md:text-4xl">
            It started with a pot of tea and a few good chairs
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              In 2013, a small group of neighbours noticed that many older residents were spending their days alone. They
              set out a few chairs in the Main Street community hall, put the kettle on, and invited people to simply
              come and chat.
            </p>
            <p>
              Word spread quickly. What began as a handful of friends is now a thriving club of more than 200 members,
              with activities running six days a week and a team of dedicated staff and volunteers.
            </p>
            <p>
              Through it all, our purpose has never changed: to make sure that no one in our community has to feel lonely
              or forgotten.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-semibold text-accent">Our mission</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                To enrich the lives of older adults by providing a safe, welcoming, and lively space where friendships
                grow, wellbeing thrives, and every day holds something to look forward to.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-semibold text-accent">Our vision</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                A community where growing older means staying connected, active, and valued - and where every senior
                knows they always have somewhere to belong.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">What we stand for</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-balance text-accent md:text-4xl">Our values</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-2xl border border-border bg-card p-7 shadow-sm">
              <span className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                <value.icon className="size-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-accent">{value.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-24">
        <div className="rounded-3xl bg-accent px-6 py-12 text-center text-accent-foreground md:px-12 md:py-16">
          <h2 className="font-serif text-3xl font-semibold text-balance md:text-4xl">Want to be part of our story?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-accent-foreground/85">
            Whether you would like to join, volunteer, or support the club, we would love to hear from you.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get in touch
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </SiteShell>
  )
}
