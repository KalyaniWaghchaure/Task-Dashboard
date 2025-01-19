import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Moon, Home, ListTodo, User } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';
import { useRouter } from 'next/router';

const TaskDashboard = () => {
  const router = useRouter();
  const { tasks, isLoading, error, fetchTasks, updateTaskStatus } = useTaskStore();
  const [theme, setTheme] = React.useState('light');
  const [taskToUpdate, setTaskToUpdate] = React.useState<number | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Implement drop functionality
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: { id: number }) => {
      setTaskToUpdate(item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  const handleStatusUpdate = (taskId: number) => {
    updateTaskStatus(taskId, 'Completed');
    setTaskToUpdate(null);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading tasks...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer">
            <ListTodo className="h-5 w-5" />
            <span>Tasks</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer">
            <User className="h-5 w-5" />
            <span>Profile</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">{getGreeting()}, User</h1>
        </header>

        <div className="flex gap-8">
          {/* Tasks List */}
          <div className="flex-1 space-y-4">
            {tasks.map((task) => (
              <Card 
                key={task.id} 
                className="cursor-move"
                onClick={() => router.push(`/tasks/${task.id}`)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-bold">
                    {task.title}
                  </CardTitle>
                  <div className={`px-2 py-1 rounded-full text-sm ${
                    task.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {task.status}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-2">
                    {task.taskNumber}
                  </div>
                  <p>{task.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Drop Zone */}
          <div
            ref={drop}
            className={`w-64 border-2 border-dashed rounded-lg flex items-center justify-center p-8 ${
              isOver ? 'border-primary bg-primary/10' : 'border-muted'
            }`}
          >
            <p className="text-center text-muted-foreground">
              Drop tasks here to mark as completed
            </p>
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 left-4 p-2 rounded-full bg-primary text-primary-foreground"
      >
        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </button>

      {/* Confirmation Dialog */}
      <AlertDialog open={taskToUpdate !== null} onOpenChange={() => setTaskToUpdate(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark task as completed?</AlertDialogTitle>
            <AlertDialogDescription>
              This will change the task status to completed. You can always change it back later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => taskToUpdate && handleStatusUpdate(taskToUpdate)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TaskDashboard;