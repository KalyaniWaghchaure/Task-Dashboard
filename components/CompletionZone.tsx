// components/CompletionZone.tsx
import { useDroppable } from '@dnd-kit/core'

export default function CompletionZone() {
  const { setNodeRef } = useDroppable({
    id: 'completion-zone',
  })

  return (
    <div
      ref={setNodeRef}
      className="w-64 p-4 border-2 border-dashed rounded-lg flex items-center justify-center bg-accent/50"
    >
      <p className="text-center text-muted-foreground">
        Drop tasks here to mark as completed
      </p>
    </div>
  )
}