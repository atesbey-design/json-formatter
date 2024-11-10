import { Code2, Github } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center space-x-3 transition-colors hover:text-primary"
          >
            <Code2 className="h-7 w-7" />
            <span className="text-xl font-bold tracking-tight">
              JSON Formatter
            </span>
          </Link>

          <div className="flex items-center gap-6">
           
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="https://github.com/atesbey-design/json-formatter"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}