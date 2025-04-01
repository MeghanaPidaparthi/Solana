import type React from "react"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Navbar } from "@/components/navbar"

interface SidebarPageLayoutProps {
  children: React.ReactNode
}

export default function SidebarPageLayout({ children }: SidebarPageLayoutProps) {
  return (
    <SidebarLayout>
      <Navbar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </SidebarLayout>
  )
}

