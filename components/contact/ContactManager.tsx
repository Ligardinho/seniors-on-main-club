"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import {
  ArrowLeft,
  ExternalLink,
  Mail,
  Phone,
  CheckCheck,
  EyeOff,
} from "lucide-react"
import { createClient } from "@/src/lib/supabase/client"

export type ContactSubmission = {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  created_at: string
  is_read: boolean
}

interface Props {
  initialSubmissions: ContactSubmission[]
}

export default function ContactManager({ initialSubmissions }: Props) {
  const supabase = createClient()
  const router = useRouter()

  const [tab, setTab] = useState<"unread" | "all">("unread")
  const [toggling, setToggling] = useState<string | null>(null)

  const unread = initialSubmissions.filter((s) => !s.is_read)
  const displayed =
    tab === "unread" ? unread : initialSubmissions

  async function toggleRead(submission: ContactSubmission) {
    setToggling(submission.id)

    const { error } = await supabase
      .from("contact_submissions")
      .update({ is_read: !submission.is_read })
      .eq("id", submission.id)

    setToggling(null)

    if (error) {
      console.error(error)
      return
    }

    router.refresh()
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Seniors on Main Club"
              width={40}
              height={40}
              className="size-10 rounded-full object-cover"
            />
            <div>
              <p className="font-serif text-lg font-semibold text-accent">
                Contact Messages
              </p>
              <p className="text-xs text-muted-foreground">
                Seniors on Main Club
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-accent hover:bg-secondary"
            >
              <ExternalLink className="size-4" />
              View Site
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
            >
              <ArrowLeft className="size-4" />
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <section>
          <h1 className="font-serif text-3xl font-semibold text-accent">
            Contact Messages
          </h1>
          <p className="mt-2 text-muted-foreground">
            View and manage messages submitted through the contact form.
          </p>
        </section>

        {/* Tabs */}
        <div className="mt-8 flex gap-1 rounded-xl bg-secondary/60 p-1">
          <button
            onClick={() => setTab("unread")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              tab === "unread"
                ? "bg-card text-accent shadow-sm"
                : "text-muted-foreground hover:text-accent"
            }`}
          >
            Unread
            {unread.length > 0 && (
              <span className="ml-2 inline-flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {unread.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab("all")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              tab === "all"
                ? "bg-card text-accent shadow-sm"
                : "text-muted-foreground hover:text-accent"
            }`}
          >
            All ({initialSubmissions.length})
          </button>
        </div>

        {/* Messages */}
        <div className="mt-8 space-y-4">
          {displayed.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <Mail className="mx-auto size-10 text-muted-foreground/50" />
              <p className="mt-4 font-semibold text-accent">No messages</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {tab === "unread"
                  ? "All messages have been read."
                  : "No messages yet."}
              </p>
            </div>
          ) : (
            displayed.map((submission) => (
              <div
                key={submission.id}
                className={`rounded-2xl border p-6 shadow-sm transition ${
                  submission.is_read
                    ? "border-border bg-card/60"
                    : "border-primary/20 bg-card"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="truncate font-semibold text-accent">
                        {submission.name}
                      </h3>
                      {!submission.is_read && (
                        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-bold text-primary">
                          New
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span>{submission.email}</span>
                      {submission.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="size-3.5" />
                          {submission.phone}
                        </span>
                      )}
                      <span>
                        {format(
                          new Date(submission.created_at),
                          "dd MMM yyyy, HH:mm"
                        )}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleRead(submission)}
                    disabled={toggling === submission.id}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition disabled:opacity-50 ${
                      submission.is_read
                        ? "border-border text-muted-foreground hover:bg-secondary"
                        : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {toggling === submission.id
                      ? "..."
                      : submission.is_read
                        ? "Mark unread"
                        : "Mark read"}
                  </button>
                </div>

                {submission.subject && (
                  <p className="mt-4 font-semibold text-foreground">
                    {submission.subject}
                  </p>
                )}

                <p className="mt-2 whitespace-pre-wrap leading-relaxed text-muted-foreground">
                  {submission.message}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
