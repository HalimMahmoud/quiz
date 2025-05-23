import { useGetTopFiveStudentsQuery } from '@/store/auth/StudentApi';
import StudentModel from '../StudentModel/StudentModel';
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from 'react-icons/fa';

export default function TopFive() {
      const { data } = useGetTopFiveStudentsQuery();
    
  return (
    <div className="border border-gray-300 rounded-md overflow-x-auto overscroll-contain mx-8 my-4 px-4">
  <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold py-4">Top Five Students</h1>
      <div className="flex ">
            <Link to={'/dashboard/student'} className="cursor-pointer">All Students</Link >
            <span className="flex items-center"><FaLongArrowAltRight className='mx-2 text-[#C5D86D]'/> </span>
      </div>
</div>
    {data?.map((student,index) => (
      <StudentModel
        key={student._id}
        title={student.first_name + ' ' + student.last_name}
        classRank={index + 1}
        averageScore={student.avg_score}
      />
    ))}
  </div>
  )
}
