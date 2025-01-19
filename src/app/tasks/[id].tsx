// pages/tasks/[id].tsx
import { useRouter } from 'next/router';
import { useTaskStore } from '../../../store/useTaskStore';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';

const TaskDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { tasks } = useTaskStore();
  
  const task = tasks.find(t => t.id === Number(id));

  if (!task) {
    return <div className="flex items-center justify-center h-screen">Task not found</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-8 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
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
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {task.taskNumber}
          </div>
          <p className="text-lg">{task.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetail;