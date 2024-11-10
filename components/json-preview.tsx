"use client"

import { ChevronRight, ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface JsonPreviewProps {
  data: any
  level?: number
  isLast?: boolean
}

export function JsonPreview({ data, level = 0, isLast = true }: JsonPreviewProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const indent = level * 20

  if (data === null) return <span className="text-red-500">null</span>
  if (typeof data === "boolean") return <span className="text-purple-500">{data.toString()}</span>
  if (typeof data === "number") return <span className="text-blue-500">{data}</span>
  if (typeof data === "string") return <span className="text-green-500">"{data}"</span>

  if (Array.isArray(data)) {
    if (data.length === 0) return <span>[]</span>
    return (
      <div className="relative">
        <div className="flex items-center">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-muted rounded p-0.5 -ml-5"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          <span>[</span>
        </div>
        {!isCollapsed && (
          <div style={{ marginLeft: indent + 20 }}>
            {data.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute left-[-12px] top-[50%] w-[20px] border-t border-gray-300 dark:border-gray-700" />
                <JsonPreview
                  data={item}
                  level={level + 1}
                  isLast={index === data.length - 1}
                />
                {index < data.length - 1 && <span>,</span>}
              </div>
            ))}
          </div>
        )}
        <div style={{ marginLeft: indent }}>]</div>
      </div>
    )
  }

  if (typeof data === "object") {
    const entries = Object.entries(data)
    if (entries.length === 0) return <span>{"{}"}</span>
    return (
      <div className="relative">
        <div className="flex items-center">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-muted rounded p-0.5 -ml-5"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          <span>{"{"}</span>
        </div>
        {!isCollapsed && (
          <div style={{ marginLeft: indent + 20 }}>
            {entries.map(([key, value], index) => (
              <div key={key} className="relative">
                <div className="absolute left-[-12px] top-[50%] w-[20px] border-t border-gray-300 dark:border-gray-700" />
                <span className="text-yellow-500">"{key}"</span>
                <span className="text-gray-500">: </span>
                <JsonPreview
                  data={value}
                  level={level + 1}
                  isLast={index === entries.length - 1}
                />
                {index < entries.length - 1 && <span>,</span>}
              </div>
            ))}
          </div>
        )}
        <div style={{ marginLeft: indent }}>{"}"}</div>
      </div>
    )
  }

  return null
}