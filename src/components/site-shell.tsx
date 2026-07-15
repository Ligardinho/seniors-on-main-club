import type { ReactNode } from "react"
import Nav from "@/src/components/Nav"
import { Footer } from "@/src/components/Footer"

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
