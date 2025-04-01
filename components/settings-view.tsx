"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { useState } from "react"
import { Save, Moon, Sun, Wallet, Shield, Bell, Globe, RefreshCw } from "lucide-react"

export function SettingsView() {
  const { connected } = useWallet()
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [autoConnect, setAutoConnect] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1500)
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
            <CardTitle>Settings</CardTitle>
            <CardDescription>Connect your wallet to access application settings.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center relative z-10">
            <div className="text-center">
              <p className="mb-4">Please connect your wallet to access settings.</p>
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
        Settings
      </motion.h1>

      <Tabs defaultValue="general" className="w-full">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="general">
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
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>Configure application preferences</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode" className="text-base">
                      <div className="flex items-center gap-2">
                        {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        Dark Mode
                      </div>
                    </Label>
                    <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                  </div>
                  <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications" className="text-base">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Notifications
                      </div>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about transactions and updates
                    </p>
                  </div>
                  <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="relative z-10 flex justify-end gap-2">
                <Button variant="outline">Reset</Button>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="mr-2"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </motion.div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="wallet">
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
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Wallet Settings
                </CardTitle>
                <CardDescription>Configure wallet connection preferences</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-connect" className="text-base">
                      Auto-connect
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically connect to your wallet when the app loads
                    </p>
                  </div>
                  <Switch id="auto-connect" checked={autoConnect} onCheckedChange={setAutoConnect} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="network">Default Network</Label>
                  <Select defaultValue="devnet">
                    <SelectTrigger id="network">
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mainnet">Mainnet</SelectItem>
                      <SelectItem value="devnet">Devnet</SelectItem>
                      <SelectItem value="testnet">Testnet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rpc-url">Custom RPC URL (Optional)</Label>
                  <Input id="rpc-url" placeholder="https://..." />
                  <p className="text-xs text-muted-foreground">
                    Enter a custom RPC endpoint URL if you want to use a specific provider
                  </p>
                </div>
              </CardContent>
              <CardFooter className="relative z-10 flex justify-end gap-2">
                <Button variant="outline">Reset</Button>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="mr-2"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </motion.div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
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
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Configure security preferences</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="transaction-signing" className="text-base">
                      Transaction Confirmation
                    </Label>
                    <p className="text-sm text-muted-foreground">Always confirm before signing transactions</p>
                  </div>
                  <Switch id="transaction-signing" defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-timeout" className="text-base">
                      Session Timeout
                    </Label>
                    <p className="text-sm text-muted-foreground">Automatically disconnect after period of inactivity</p>
                  </div>
                  <Switch id="session-timeout" defaultChecked={true} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeout-duration">Timeout Duration</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="timeout-duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="approved-sites">Approved Sites</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Sites that are allowed to request wallet connections
                  </p>
                  <div className="rounded-md border p-4 text-sm">
                    <p className="text-muted-foreground">No approved sites yet</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="relative z-10 flex justify-end gap-2">
                <Button variant="outline">Reset</Button>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="mr-2"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </motion.div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

