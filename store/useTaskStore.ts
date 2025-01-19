// store/useTaskStore.ts
import { create } from 'zustand'

export interface Task {
  id: number
  title: string
  description: string
  status: 'In Progress' | 'Completed'
}

interface TaskStore {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  setTasks: (tasks: Task[]) => void
  updateTaskStatus: (taskId: number, status: 'In Progress' | 'Completed') => void
  fetchTasks: () => Promise<void>
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

// Mock API function
const fetchTasksFromAPI = async (): Promise<Task[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return mockTasks
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,
  setTasks: (tasks) => set({ tasks }),
  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      ),
    })),
  fetchTasks: async () => {
    set({ isLoading: true, error: null })
    try {
      const tasks = await fetchTasksFromAPI()
      set({ tasks, isLoading: false })
    } catch (error) {
      set({ 
        error: 'Failed to fetch tasks', 
        isLoading: false 
      })
    }
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}))

// Mock API data
export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Complete Assignment",
    description: "Frontend developer task",
    status: "In Progress"
  },
  {
    id: 2,
    title: "Review Code",
    description: "Review pull requests",
    status: "In Progress"
  },
  {
    id: 3,
    title: "Update Documentation",
    description: "Update project README",
    status: "In Progress"
  }
]