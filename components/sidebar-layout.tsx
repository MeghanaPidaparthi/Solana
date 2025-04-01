"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { SidebarNav } from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SidebarLayoutProps {
  children: React.ReactNode
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen">
      <motion.div
        className="hidden md:flex flex-col border-r bg-background/80 backdrop-blur-sm"
        animate={{ width: collapsed ? 60 : 240 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex h-16 items-center border-b px-4">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-semibold"
            >
              Solana Frontend
            </motion.div>
          )}
        </div>
        <div className="flex-1 overflow-auto py-4">
          <SidebarNav collapsed={collapsed} />
        </div>
        <div className="border-t p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full h-8"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </motion.div>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}

