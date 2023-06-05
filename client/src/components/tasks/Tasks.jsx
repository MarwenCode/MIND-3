import React from 'react'
import BackLog from './backlog/BackLog'
import Inprogress from './inprogess/Inprogress'
import "./tasks.scss"
import SideBar from './sidebar/SideBar'
import SingleTaskPage from './singletaskpage/SingleTaskPage'

const Tasks = () => {
  return (
    <div className='tasks'>
      <SideBar />
        <BackLog />
        <SingleTaskPage />
        {/* <Inprogress />
        <Inprogress /> */}
       

    </div>
  )
}

export default Tasks