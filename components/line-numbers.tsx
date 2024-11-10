interface LineNumbersProps {
  content: string
}

export function LineNumbers({ content }: LineNumbersProps) {
  const lines = content.split("\n").length

  return (
    <div className="select-none pr-4 text-right text-sm text-muted-foreground">
      {Array.from({ length: lines }, (_, i) => (
        <div key={i + 1} className="leading-6">
          {i + 1}
        </div>
      ))}
    </div>
  )
}