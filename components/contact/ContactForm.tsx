"use client"

import { useState, type FormEvent } from "react"
import { createClient } from "@/src/lib/supabase/client"

export function ContactForm() {
  const supabase = createClient()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  function validate() {
    const errs: Record<string, string> = {}

    if (!name.trim()) {
      errs.name = "Name is required"
    }

    if (!email.trim()) {
      errs.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address"
    }

    if (!message.trim()) {
      errs.message = "Message is required"
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    setSuccess(false)

    const { error } = await supabase.from("contact_submissions").insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      subject: subject.trim() || null,
      message: message.trim(),
    })

    setLoading(false)

    if (error) {
      setErrors({ form: error.message })
      return
    }

    setSuccess(true)
    setName("")
    setEmail("")
    setPhone("")
    setSubject("")
    setMessage("")
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
      <h2 className="font-serif text-2xl font-semibold text-accent">Send us a message</h2>
      <p className="mt-2 text-muted-foreground">
        Fill out the form below and we will get back to you as soon as we can.
      </p>

      {success && (
        <div className="mt-6 rounded-xl border border-primary/30 bg-primary/10 p-5 text-center">
          <p className="text-lg font-semibold text-primary">Thank you for your message!</p>
          <p className="mt-1 text-muted-foreground">
            We have received your enquiry and will be in touch soon.
          </p>
        </div>
      )}

      {errors.form && (
        <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4">
          <p className="font-semibold text-destructive">{errors.form}</p>
        </div>
      )}

      {!success && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-semibold text-accent">
              Name <span className="text-primary">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-border bg-card p-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="Your full name"
            />
            {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold text-accent">
              Email <span className="text-primary">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-card p-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="your@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-accent">
              Phone <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-border bg-card p-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="084 712 9925"
            />
          </div>

          <div>
            <label htmlFor="subject" className="mb-1 block text-sm font-semibold text-accent">
              Subject <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-border bg-card p-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="What is this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-semibold text-accent">
              Message <span className="text-primary">*</span>
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-32 w-full rounded-xl border border-border bg-card p-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="Tell us how we can help..."
            />
            {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send message"}
          </button>
        </form>
      )}
    </div>
  )
}
