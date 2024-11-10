"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface UrlDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (url: string) => void
}

export function UrlDialog({ open, onOpenChange, onSubmit }: UrlDialogProps) {
  const [url, setUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(url)
    setUrl("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Load JSON from URL</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="https://api.example.com/data.json"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-4"
          />
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={!url}>Load JSON</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}