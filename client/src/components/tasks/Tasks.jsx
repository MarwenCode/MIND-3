import React from 'react'
import BackLog from './backlog/BackLog'
import Inprogress from './inprogess/Inprogress'
import "./tasks.scss"
import SideBar from './sidebar/SideBar'


const Tasks = () => {
  return (
    <div className='tasks'>
      <SideBar />
        <BackLog />
       
       
       

    </div>
  )
}

export default Tasks