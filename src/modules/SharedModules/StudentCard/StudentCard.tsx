import { memo } from 'react';
import { ChevronRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { Student } from '@/interfaces/student.interface';
import StudentsDataDialog from '@/modules/AdminModules/Students/StudentsData/StudentsData';
import { useDeleteStudentMutation } from '@/store/auth/StudentApi';

interface StudentCardProps {
  student: Student;
  onViewDetails: (student: Student) => void;
}

const StudentCard = memo(({ student, onViewDetails }: StudentCardProps) => {
  const fullName = `${student.first_name} ${student.last_name}`;
  const [deleteStudent] = useDeleteStudentMutation()
  const handleDeleteStudent = async (id: string) => {
    await deleteStudent(id)
  }
  return (
    <div className="flex items-center justify-between h-[70px] gap-3 border rounded-sm overflow-hidden">
      <Avatar
        className="h-full aspect-[2/1] rounded-tr-md rounded-br-md "
        style={{
          width: '60px',
          borderRadius: '0',
          borderTopRightRadius: '6px',
          borderBottomRightRadius: '6px',
        }}
      >
        <AvatarImage style={{ borderRadius: '0' }} src={'/api/placeholder/40/40'} alt={fullName} />
        <AvatarFallback
          className="rounded-tr-[10px] rounded-br-[10px]"
          style={{ borderRadius: '0' }}
        >
          {student.first_name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="p-2 flex grow gap-3 items-center">
        <div>
          <h3 className="font-medium text-sm">{fullName}</h3>
        </div>
        <div className='flex items-center gap-2 ms-auto'>
          {/* <Trash2 className="h-4 w-4 text-red-400" onClick={() => handleDeleteStudent(student._id)} />
          <StudentsDataDialog mode='update' instructorData={student} /> */}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6  rounded-full pointer-events-auto p-0 bg-black/90 hover:bg-black"
            onClick={() => onViewDetails(student)}
          >
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );
});
export default StudentCard;
