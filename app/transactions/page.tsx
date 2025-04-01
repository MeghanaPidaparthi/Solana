import { Navbar } from "@/components/navbar"
import { TransactionsView } from "@/components/transactions-view"
import { PageTransition } from "@/components/page-transition"

export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-background/80">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <PageTransition>
          <TransactionsView />
        </PageTransition>
      </div>
    </main>
  )
}

