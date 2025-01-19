'use client'

import { useEffect } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import TaskList from '../../components/TaskList'
import CompletionZone from '../../components/CompletionZone'
import { useTaskStore } from '../../store/useTaskStore'
import { mockTasks } from '../../store/useTaskStore'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Dashboard() {
  const { tasks, setTasks, updateTaskStatus } = useTaskStore()

  useEffect(() => {
    // Simulate API fetch
    setTasks(mockTasks)
  }, [setTasks])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (over?.id === 'completion-zone') {
      updateTaskStatus(Number(active.id), 'Completed')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="p-6 flex gap-6">
              <div className="flex-1">
                <TaskList tasks={tasks} />
              </div>
              <CompletionZone />
            </main>
          </div>
        </div>
      </DndContext>
      <div className="fixed bottom-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  )
}