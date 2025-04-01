"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Image, Plus, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export function NFTsView() {
  const { connected } = useWallet()

  if (!connected) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 z-0"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <CardHeader className="relative z-10">
            <CardTitle>NFT Collection</CardTitle>
            <CardDescription>Connect your wallet to view and manage your NFTs.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center relative z-10">
            <div className="text-center">
              <p className="mb-4">Please connect your wallet to view your NFT collection.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">NFT Collection</h1>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
            <Plus className="mr-2 h-4 w-4" />
            Mint NFT
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <CardHeader className="relative z-10">
            <CardTitle>Your NFTs</CardTitle>
            <CardDescription>View and manage your Solana NFT collection</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Image className="h-8 w-8 text-primary" />
                </div>
              </motion.div>
              <p className="text-muted-foreground mb-4">You don't have any NFTs in your collection yet.</p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Mint Your First NFT
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <CardHeader className="relative z-10">
            <CardTitle>Popular NFT Collections</CardTitle>
            <CardDescription>Explore trending NFT collections on Solana</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="rounded-lg overflow-hidden border bg-card"
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <Image className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium">Collection #{i}</h3>
                    <p className="text-xs text-muted-foreground">Floor: 0.5 SOL</p>
                    <div className="mt-2 flex justify-end">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        <span className="text-xs">View</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                NFT minting will be available in the next version of the application.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

