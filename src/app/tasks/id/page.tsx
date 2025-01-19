// app/tasks/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Task } from '../../../../store/useTaskStore'
import { useTaskStore } from '../../../../store/useTaskStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function TaskDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)
  const { tasks } = useTaskStore()

  useEffect(() => {
    const foundTask = tasks.find(t => t.id === parseInt(params.id))
    setTask(foundTask || null)
  }, [params.id, tasks])

  if (!task) return <div>Task not found</div>

  return (
    <div className="p-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4"
      >
        ← Back
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {task.title}
            <Badge variant={task.status === 'Completed' ? 'default' : 'secondary'}>
              {task.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">{task.description}</p>
          <div className="text-sm text-muted-foreground">
            Task #{task.id}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}