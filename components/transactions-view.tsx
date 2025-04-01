"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export function TransactionsView() {
  const { connected } = useWallet()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
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
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Connect your wallet to view your transaction history.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center relative z-10">
            <div className="text-center">
              <p className="mb-4">Please connect your wallet to view your transactions.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        Transactions
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <CardHeader className="relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>View your recent activity on Solana Devnet</CardDescription>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                  <motion.div
                    animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 1, repeat: isRefreshing ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                  </motion.div>
                  Refresh
                </Button>
              </motion.div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction Signature</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      <div className="flex items-center">
                        <motion.div
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        </motion.div>
                        No transactions found
                      </div>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell className="text-right">-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Transaction history will be available in the next version of the application.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                  <motion.div
                    animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 1, repeat: isRefreshing ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                  </motion.div>
                  Check Again
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

