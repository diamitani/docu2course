
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface ContentActionsProps {
  onDownload: () => void;
}

const ContentActions: React.FC<ContentActionsProps> = ({ onDownload }) => {
  return (
    <div className="flex justify-end mt-6 space-x-3">
      <Button variant="outline" onClick={onDownload}>Download</Button>
      <Button onClick={() => toast.success("Saved to library")}>Save to Library</Button>
    </div>
  );
};

export default ContentActions;
