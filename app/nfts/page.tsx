import { Navbar } from "@/components/navbar"
import { NFTsView } from "@/components/nfts-view"
import { PageTransition } from "@/components/page-transition"

export default function NFTsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-background/80">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <PageTransition>
          <NFTsView />
        </PageTransition>
      </div>
    </main>
  )
}

