"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Coins, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function TokensView() {
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
            <CardTitle>Token Management</CardTitle>
            <CardDescription>Connect your wallet to manage your SPL tokens.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center relative z-10">
            <div className="text-center">
              <p className="mb-4">Please connect your wallet to view and manage your tokens.</p>
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
        <h1 className="text-3xl font-bold">Tokens</h1>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Token
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
            <CardTitle>Your SPL Tokens</CardTitle>
            <CardDescription>Manage your Solana Program Library tokens</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Coins className="h-8 w-8 text-primary" />
                </div>
              </motion.div>
              <p className="text-muted-foreground mb-4">You don't have any SPL tokens yet.</p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Token
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
            <CardTitle>Create a New SPL Token</CardTitle>
            <CardDescription>Launch your own token on Solana Devnet</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                className="p-4 rounded-lg border bg-card"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-medium mb-2 flex items-center">
                  <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  Configure
                </div>
                <p className="text-sm text-muted-foreground">Set your token name, symbol, and initial supply</p>
              </motion.div>

              <motion.div
                className="p-4 rounded-lg border bg-card"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-medium mb-2 flex items-center">
                  <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  Mint
                </div>
                <p className="text-sm text-muted-foreground">Create your token on the Solana blockchain</p>
              </motion.div>

              <motion.div
                className="p-4 rounded-lg border bg-card"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-medium mb-2 flex items-center">
                  <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  Manage
                </div>
                <p className="text-sm text-muted-foreground">Transfer, burn, or mint more of your token</p>
              </motion.div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground mb-4">
                This feature will be available in the next version of the application.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button disabled className="bg-gradient-to-r from-primary/80 to-primary/60">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

