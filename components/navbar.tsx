"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { connected } = useWallet()
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <motion.nav
      className="bg-background border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-bold">
              <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                    fill="currentColor"
                  />
                </svg>
                Solana Frontend
              </motion.div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard" passHref>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant={isActive("/dashboard") ? "default" : "ghost"} className="text-sm relative">
                  Dashboard
                  {isActive("/dashboard") && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="navbar-indicator"
                    />
                  )}
                </Button>
              </motion.div>
            </Link>
            <Link href="/tokens" passHref>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant={isActive("/tokens") ? "default" : "ghost"} className="text-sm relative">
                  Tokens
                  {isActive("/tokens") && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="navbar-indicator"
                    />
                  )}
                </Button>
              </motion.div>
            </Link>
            <Link href="/transactions" passHref>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant={isActive("/transactions") ? "default" : "ghost"} className="text-sm relative">
                  Transactions
                  {isActive("/transactions") && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="navbar-indicator"
                    />
                  )}
                </Button>
              </motion.div>
            </Link>
            <Link href="/nfts" passHref>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant={isActive("/nfts") ? "default" : "ghost"} className="text-sm relative">
                  NFTs
                  {isActive("/nfts") && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="navbar-indicator"
                    />
                  )}
                </Button>
              </motion.div>
            </Link>
            <Link href="/activity" passHref>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant={isActive("/activity") ? "default" : "ghost"} className="text-sm relative">
                  Activity
                  {isActive("/activity") && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="navbar-indicator"
                    />
                  )}
                </Button>
              </motion.div>
            </Link>
            <Link href="/settings" passHref>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant={isActive("/settings") ? "default" : "ghost"} className="text-sm relative">
                  Settings
                  {isActive("/settings") && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="navbar-indicator"
                    />
                  )}
                </Button>
              </motion.div>
            </Link>
            <div className="ml-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <WalletMultiButton className="wallet-adapter-button" />
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <div className="mr-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <WalletMultiButton className="wallet-adapter-button" />
              </motion.div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden py-4 space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/dashboard" passHref onClick={() => setIsMenuOpen(false)}>
              <Button variant={isActive("/dashboard") ? "default" : "ghost"} className="w-full text-left justify-start">
                Dashboard
              </Button>
            </Link>
            <Link href="/tokens" passHref onClick={() => setIsMenuOpen(false)}>
              <Button variant={isActive("/tokens") ? "default" : "ghost"} className="w-full text-left justify-start">
                Tokens
              </Button>
            </Link>
            <Link href="/transactions" passHref onClick={() => setIsMenuOpen(false)}>
              <Button
                variant={isActive("/transactions") ? "default" : "ghost"}
                className="w-full text-left justify-start"
              >
                Transactions
              </Button>
            </Link>
            <Link href="/nfts" passHref onClick={() => setIsMenuOpen(false)}>
              <Button variant={isActive("/nfts") ? "default" : "ghost"} className="w-full text-left justify-start">
                NFTs
              </Button>
            </Link>
            <Link href="/activity" passHref onClick={() => setIsMenuOpen(false)}>
              <Button variant={isActive("/activity") ? "default" : "ghost"} className="w-full text-left justify-start">
                Activity
              </Button>
            </Link>
            <Link href="/settings" passHref onClick={() => setIsMenuOpen(false)}>
              <Button variant={isActive("/settings") ? "default" : "ghost"} className="w-full text-left justify-start">
                Settings
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

