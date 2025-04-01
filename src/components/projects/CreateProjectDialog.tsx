
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CreateProjectForm from './CreateProjectForm';

interface CreateProjectDialogProps {
  onProjectCreated: () => void;
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({ onProjectCreated }) => {
  const [open, setOpen] = React.useState(false);

  const handleProjectCreated = () => {
    setOpen(false);
    onProjectCreated();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
          <DialogDescription>
            Enter the details for your new project. You can always edit these later.
          </DialogDescription>
        </DialogHeader>
        <CreateProjectForm 
          onProjectCreated={handleProjectCreated} 
          onCancel={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
