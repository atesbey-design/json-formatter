import { JsonViewer } from "@/components/json-viewer"


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
   
      <div className="container mx-auto px-4 py-8">
        <JsonViewer />
      </div>
    </main>
  )
}