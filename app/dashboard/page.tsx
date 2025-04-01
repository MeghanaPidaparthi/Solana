import { Navbar } from "@/components/navbar"
import { Dashboard } from "@/components/dashboard"
import { PageTransition } from "@/components/page-transition"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-background/80">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <PageTransition>
          <Dashboard />
        </PageTransition>
      </div>
    </main>
  )
}

