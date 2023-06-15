import React from 'react'
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";


const DevPageDetails = ({project}) => {
  return (
    <>
       <div className=" border rounded-lg p-4 shadow-sm  relative ">
        <h4 className=" font-semibold text-green-500">{project.title}</h4>
        <p>{project.description}</p>
        <p>{project.DevSpec}</p>
        <p>{project.details}</p>
        <p>Project Budget: <span className='text-sm text-green-600'>{project.budget} $</span></p>
        <p className="text-xs font-medium text-gray-400">
          {formatDistanceToNow(new Date(project.createdAt), {
            addSuffix: true,
          })}
        </p>
      
      </div>
    </>
  )
}

export default DevPageDetails
