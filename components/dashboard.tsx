"use client"

import { useEffect, useState } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, Copy, AlertCircle, Wallet } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import dynamic from "next/dynamic"

// Dynamically import Confetti to avoid SSR issues
const Confetti = dynamic(() => import("react-confetti"), { ssr: false })

export function Dashboard() {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  // Update window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Show confetti when connected
  useEffect(() => {
    if (connected) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [connected])

  useEffect(() => {
    const getBalance = async () => {
      if (connected && publicKey) {
        try {
          setLoading(true)
          setError(null)
          const balance = await connection.getBalance(publicKey)
          setBalance(balance / LAMPORTS_PER_SOL)
        } catch (err) {
          console.error("Error fetching balance:", err)
          setError("Failed to fetch balance. Please try again.")
        } finally {
          setLoading(false)
        }
      } else {
        setBalance(null)
      }
    }

    getBalance()
  }, [connection, publicKey, connected])

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const openExplorer = () => {
    if (publicKey) {
      window.open(`https://explorer.solana.com/address/${publicKey.toString()}?cluster=devnet`, "_blank")
    }
  }

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
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Welcome to Solana Frontend
            </CardTitle>
            <CardDescription>Connect your wallet to get started with Solana blockchain interactions.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center relative z-10">
            <div className="text-center">
              <p className="mb-4">Please connect your Phantom or Solflare wallet to continue.</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  Connect Wallet
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} />}

      <div className="space-y-6">
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          Dashboard
        </motion.h1>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <CardHeader className="relative z-10">
                <CardTitle>Wallet Information</CardTitle>
                <CardDescription>Your connected Solana wallet details</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Wallet Address</p>
                    <div className="flex items-center gap-2">
                      <code className="bg-muted p-2 rounded text-xs w-full overflow-x-auto">
                        {publicKey?.toString()}
                      </code>
                      <TooltipProvider>
                        <Tooltip open={copied}>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={copyAddress} title="Copy address">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copied!</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={openExplorer} title="View on Explorer">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View on Solana Explorer</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Network</p>
                    <p className="bg-muted p-2 rounded">Solana Devnet</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Connection Status</p>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="h-2 w-2 rounded-full bg-green-500"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.8, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                      <p>Connected</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <CardHeader className="relative z-10">
                <CardTitle>SOL Balance</CardTitle>
                <CardDescription>Your current balance on Devnet</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {loading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-12 w-24" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ) : (
                    <>
                      <motion.div
                        className="flex items-end gap-2"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <p className="text-4xl font-bold">{balance !== null ? balance.toFixed(4) : "0"}</p>
                        <p className="text-xl mb-1">SOL</p>
                      </motion.div>
                      <p className="text-sm text-muted-foreground">
                        Note: This is your Devnet balance. Devnet SOL has no real value and is used for testing.
                      </p>
                      <div className="pt-2">
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Button
                            variant="outline"
                            onClick={() => window.open("https://solfaucet.com", "_blank")}
                            className="transition-all duration-300 hover:bg-primary/10"
                          >
                            Get Devnet SOL
                          </Button>
                        </motion.div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <CardHeader className="relative z-10">
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common operations for your Solana wallet</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" className="w-full justify-start" disabled>
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 4V20M4 12H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Create New Token
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" className="w-full justify-start" disabled>
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 10L12 15L17 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Send SOL
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() =>
                      window.open(
                        `https://explorer.solana.com/address/${publicKey?.toString()}?cluster=devnet`,
                        "_blank",
                      )
                    }
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View on Explorer
                  </Button>
                </motion.div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                More actions will be available in the next version
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}

