import { redirect } from "next/navigation"
import { createClient } from "@/src/lib/supabase/server"
import ContactManager from "@/components/contact/ContactManager"

export default async function ContactPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: submissions } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  return <ContactManager initialSubmissions={submissions ?? []} />
}
