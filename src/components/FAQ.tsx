"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const FAQS = [
  {
    q: "Who can join Seniors on Main Club?",
    a: "Anyone aged 55 and over is warmly welcome, whether you live alone, with family, or in the area. You do not need to come with a friend - most of our members arrived on their own and quickly made new ones.",
  },
  {
    q: "How much does membership cost?",
    a: "Annual membership is just R60, which includes access to all regular activities. Some special outings and workshops have a small extra charge to cover costs, always announced in advance.",
  },
  {
    q: "Do I need to book activities in advance?",
    a: "Most of our weekly activities are drop-in, so you can simply turn up. For lunches, outings, and workshops with limited spaces, we ask that you let us know beforehand so we can plan properly.",
  },
  {
    q: "Is the venue accessible?",
    a: "Yes. Our community centre is fully wheelchair accessible with step-free entry, accessible restrooms, and plenty of comfortable seating. If you have specific needs, just let us know and we will make sure you are looked after.",
  },
  {
    q: "Can I get help with transport?",
    a: "We run a volunteer-led lift-share scheme for members who cannot drive or use public transport easily. Contact us and we will do our best to arrange a ride to and from the club.",
  },
  {
    q: "How do I get started?",
    a: "The easiest way is to pop in during opening hours for a cup of tea, or send us a message through the contact page. We will show you around and help you find activities you will enjoy.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
  <div className="mx-auto max-w-3xl">
    <ul className="space-y-4">
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i

        return (
          <li
            key={faq.q}
            className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300"
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-serif text-lg font-semibold text-accent md:text-xl">
                  {faq.q}
                </span>

                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-accent transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  {isOpen ? (
                    <Minus className="size-5" />
                  ) : (
                    <Plus className="size-5" />
                  )}
                </span>
              </button>
            </h3>

            <div
              className={`grid transition-all duration-500 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 text-lg leading-relaxed text-muted-foreground">
                  {faq.a}
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  </div>
)
}
