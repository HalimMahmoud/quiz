import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetStudentsQuery } from '@/store/auth/StudentApi';
import StudentCard from '@/modules/SharedModules/StudentCard/StudentCard';
import GroupSelector from '@/modules/SharedModules/StudentGroupTab/StudentsGroupSelector';
import StudentDetailsDialog from '@/modules/SharedModules/ViewDetails/StudentDetailsDialog';
import type { Student } from '@/interfaces/student.interface';
import StudentsDataDialog from '../StudentsData/StudentsData';
import LoadingScreen from '@/modules/SharedModules/LoadingScreen/LoadingScreen';

const STUDENTS_PER_PAGE = 5;
const groupsPerPage = 3;

export default function StudentsList() {
  const { data, isLoading } = useGetStudentsQuery();
  const [groupedStudents, setGroupedStudents] = useState<Record<string, Student[]>>({});
  const [activeGroup, setActiveGroup] = useState<string>('');
  const [groupNamesList, setGroupNamesList] = useState<string[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // For pagination
  const [currentGroupPage, setCurrentGroupPage] = useState(0);
  const [currentStudentPage, setCurrentStudentPage] = useState(0);
  // Process the data when it's loaded
  useEffect(() => {
    if (data) {
      console.log(data);
      processData(data);
    }
  }, [data]);

  const processData = useCallback(
    (studentsData: Student[]) => {
      const grouped: Record<string, Student[]> = {};
      studentsData.forEach((student) => {
        if (student.group && student.group.name) {
          const groupName = student.group.name;
          if (!grouped[groupName]) {
            grouped[groupName] = [];
          }
          grouped[groupName].push(student);
        }
      });

      const allGroupNames = Object.keys(grouped);
      setGroupNamesList(allGroupNames);
      setGroupedStudents(grouped);

      // Set the first group as active by default
      if (allGroupNames.length > 0 && !activeGroup) {
        setActiveGroup(allGroupNames[0]);
      }
    },
    [activeGroup]
  );

  // Handle student details view
  const handleViewStudentDetails = useCallback((student: Student) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);



  // Calculate total group pages
  const totalGroupPages = Math.ceil(groupNamesList.length / groupsPerPage);

  // Previous and next group pages
  const goToPreviousGroupPage = useCallback(() => {
    setCurrentGroupPage((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNextGroupPage = useCallback(() => {
    setCurrentGroupPage((prev) => Math.min(totalGroupPages - 1, prev + 1));
  }, [totalGroupPages]);

  // Handle active group change
  const handleSetActiveGroup = useCallback((group: string) => {
    setActiveGroup(group);
    setCurrentStudentPage(0); // Reset student page when changing groups
  }, []);

  // Get current students for the active group with pagination
  const studentsInActiveGroup = activeGroup ? groupedStudents[activeGroup] || [] : [];
  const totalStudentPages = Math.ceil(studentsInActiveGroup.length / STUDENTS_PER_PAGE);

  const currentStudents = studentsInActiveGroup.slice(
    currentStudentPage * STUDENTS_PER_PAGE,
    (currentStudentPage + 1) * STUDENTS_PER_PAGE
  );

  // Handle student pagination
  const handleStudentPageChange = useCallback(
    (direction: 'prev' | 'next') => {
      if (direction === 'prev') {
        setCurrentStudentPage((prev) => Math.max(0, prev - 1));
      } else {
        setCurrentStudentPage((prev) => Math.min(totalStudentPages - 1, prev + 1));
      }
    },
    [totalStudentPages]
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (groupNamesList.length === 0) {
    return <div className="text-center py-8">No student groups found</div>;
  }

  // Render students list section
  const renderStudentsList = () => (
    <>
      <div className="">
        <div className="grid sm:grid-cols-2 content-start flex-wrap gap-y-2 gap-x-4 min-h-[300px]">
          {currentStudents.length > 0 ? (
            currentStudents.map((student) => (
              <StudentCard
                key={student._id}
                student={student}
                onViewDetails={handleViewStudentDetails}
              />
            ))
          ) : (
            <div className="col-span-2 flex justify-center items-center py-8 text-gray-500 text-sm">
              No students in this group
            </div>
          )}
        </div>
      </div>

      {/* Pagination for students */}
      <div className="mt-2 flex justify-end items-center gap-2">
        <span className="text-xs text-gray-500">
          {currentStudentPage + 1} / {Math.max(1, totalStudentPages)}
        </span>

        {totalStudentPages > 1 && (
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0"
              onClick={() => handleStudentPageChange('prev')}
              disabled={currentStudentPage === 0}
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0"
              onClick={() => handleStudentPageChange('next')}
              disabled={currentStudentPage >= totalStudentPages - 1}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="p-4">
      {/* <StudentsDataDialog mode='add' /> */}
      <div className="w-full bg-white rounded-xl p-4 border-2  ">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-medium">Students list</h2>
        </div>
        <GroupSelector
          groupNamesList={groupNamesList}
          activeGroup={activeGroup}
          setActiveGroup={handleSetActiveGroup}
          currentGroupPage={currentGroupPage}
          totalGroupPages={totalGroupPages}
          goToPreviousGroupPage={goToPreviousGroupPage}
          goToNextGroupPage={goToNextGroupPage}
        />

        {renderStudentsList()}

        <StudentDetailsDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          student={selectedStudent}
        />
      </div>
    </div>
  );
}
