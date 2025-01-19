// components/Sidebar.tsx
import Link from 'next/link'
import { Home, ListTodo, User } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="w-64 border-r h-screen p-4">
      <nav className="space-y-4">
        <Link 
          href="/"
          className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg"
        >
          <Home size={20} />
          Dashboard
        </Link>
        <Link 
          href="/tasks"
          className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg"
        >
          <ListTodo size={20} />
          Tasks
        </Link>
        <Link 
          href="/profile"
          className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg"
        >
          <User size={20} />
          Profile
        </Link>
      </nav>
    </aside>
  )
}