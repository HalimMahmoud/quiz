import { memo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { Student } from '@/interfaces/student.interface';

interface StudentDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

const StudentDetailsDialog = memo(({ isOpen, onClose, student }: StudentDetailsDialogProps) => {
  if (!student) return null;

  const fullName = `${student.first_name} ${student.last_name}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`/api/placeholder/64/64`} alt={fullName} />
              <AvatarFallback className="text-lg">{student.first_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{fullName}</h2>
              <p className="text-sm text-gray-500">{student.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Group</p>
              <p className="font-medium">{student.group?.name || 'Not Assigned'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Status</p>
              <p
                className={`font-medium capitalize ${
                  student.status.toLocaleLowerCase() === 'active'
                    ? ' text-green-500'
                    : ' text-red-500'
                }`}
              >
                {student.status}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

StudentDetailsDialog.displayName = 'StudentDetailsDialog';

export default StudentDetailsDialog;
