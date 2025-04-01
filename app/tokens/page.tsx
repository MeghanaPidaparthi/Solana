import { Navbar } from "@/components/navbar"
import { TokensView } from "@/components/tokens-view"
import { PageTransition } from "@/components/page-transition"

export default function TokensPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-background/80">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <PageTransition>
          <TokensView />
        </PageTransition>
      </div>
    </main>
  )
}

