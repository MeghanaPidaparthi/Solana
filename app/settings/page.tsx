import { Navbar } from "@/components/navbar"
import { SettingsView } from "@/components/settings-view"
import { PageTransition } from "@/components/page-transition"

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-background/80">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <PageTransition>
          <SettingsView />
        </PageTransition>
      </div>
    </main>
  )
}

