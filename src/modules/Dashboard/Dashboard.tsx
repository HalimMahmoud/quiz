import React from 'react'
import UpcommingQuizes from '../AdminModules/Quizes/UpcommingQuizes'

const Dashboard = () => {
  return (
    <div className='grid grid-cols-2 gap-4 p-4'>
      <div className='col-span-1'>
        <UpcommingQuizes/>
      </div>
    </div>
  )
}

export default Dashboard
