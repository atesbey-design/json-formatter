"use client"

import { useState, useEffect } from "react"
import { Upload, Download, Copy, Trash2, ExternalLink, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { JsonPreview } from "./json-preview"
import { LineNumbers } from "./line-numbers"
import { UrlDialog } from "./url-dialog"
import { useDebounce } from "@/hooks/use-debounce"

export function JsonViewer() {
  const [jsonInput, setJsonInput] = useState("")
  const [parsedJson, setParsedJson] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [urlDialogOpen, setUrlDialogOpen] = useState(false)
  const { toast } = useToast()
  
  const debouncedInput = useDebounce(jsonInput, 500)

  useEffect(() => {
    validateJson(debouncedInput)
  }, [debouncedInput])

  const validateJson = (input: string) => {
    if (!input.trim()) {
      setParsedJson(null)
      setError(null)
      return
    }

    try {
      const parsed = JSON.parse(input)
      setParsedJson(parsed)
      setError(null)
    } catch (err) {
      setError("Invalid JSON format")
      setParsedJson(null)
    }
  }

  const handleFormat = () => {
    try {
      if (!jsonInput.trim()) return
      const parsed = JSON.parse(jsonInput)
      const formatted = JSON.stringify(parsed, null, 2)
      setJsonInput(formatted)
      setParsedJson(parsed)
      setError(null)
      toast({
        title: "Success",
        description: "JSON formatted successfully",
      })
    } catch (err) {
      setError("Invalid JSON format")
      setParsedJson(null)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        setJsonInput(text)
      }
      reader.readAsText(file)
    }
  }

  const handleUrlFetch = async (url: string) => {
    try {
      const response = await fetch(url)
      const json = await response.json()
      const formatted = JSON.stringify(json, null, 2)
      setJsonInput(formatted)
      setUrlDialogOpen(false)
      toast({
        title: "Success",
        description: "JSON loaded from URL successfully",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch JSON from URL",
        variant: "destructive",
      })
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonInput)
    toast({
      title: "Copied",
      description: "JSON copied to clipboard",
    })
  }

  const handleDownload = () => {
    const blob = new Blob([jsonInput], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "formatted.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setJsonInput("")
    setParsedJson(null)
    setError(null)
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <input
            id="file-upload"
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setUrlDialogOpen(true)}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Fetch URL
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!jsonInput}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={!jsonInput}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={!jsonInput}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4">
          <Card className="p-4">
            <div className="flex min-h-[600px] font-mono">
              <LineNumbers content={jsonInput} />
              <Textarea
                placeholder="Paste your JSON here..."
                className="flex-1 resize-none border-0 focus-visible:ring-0"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
              />
            </div>
          </Card>

          <div className="flex items-center justify-center">
            <Button
              size="lg"
              className="rounded-full w-12 h-12 p-0"
              onClick={handleFormat}
              disabled={!jsonInput}
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>

          <Card className="p-4">
            <div className="min-h-[600px] overflow-auto font-mono">
              {parsedJson ? (
                <div className="pl-6">
                  <JsonPreview data={parsedJson} />
                </div>
              ) : (
                <div className="text-muted-foreground">Preview will appear here...</div>
              )}
            </div>
          </Card>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      <UrlDialog
        open={urlDialogOpen}
        onOpenChange={setUrlDialogOpen}
        onSubmit={handleUrlFetch}
      />
    </>
  )
}