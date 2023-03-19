import React from 'react'
import BackLog from './backlog/BackLog'
import Inprogress from './inprogess/Inprogress'
import "./tasks.scss"

const Tasks = () => {
  return (
    <div className='tasks'>
        <BackLog />
        <Inprogress />

    </div>
  )
}

export default Tasks