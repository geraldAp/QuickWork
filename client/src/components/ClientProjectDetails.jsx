import React,{useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { ProjectsContext } from "../context/ProjectContext";
import { Url } from "./minidb/Url";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ClientProjectDetails = ({ project }) => {
    const {dispatch} = useContext(ProjectsContext)
    const { user } = useContext(AuthContext);

   
    const handleClick = async () => {
    

        // 'http://localhost:4000/api/workouts/' + workout._id
        const response = await fetch(`${Url}/api/projects/${project._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
    
        if (response.ok) {
          dispatch({type: 'DELETE_PROJECT', payload: json})
        }
      }
 
 
    return (
    <>
      <div className=" border rounded-lg p-4 shadow-sm  relative ">
        <h4 className=" font-semibold text-green-500">{project.title}</h4>
        <p>{project.description}</p>
        <p className="text-xs font-medium text-gray-400">
          {formatDistanceToNow(new Date(project.createdAt), {
            addSuffix: true,
          })}
        </p>
        <span onClick={handleClick} className=" cursor-pointer duration-100 hover:text-red-700 ease-in-out  text-gray-400 absolute top-2 right-2  material-symbols-outlined" >delete</span>
      </div>
    </>
  );
};

export default ClientProjectDetails;
