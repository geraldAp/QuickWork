import React from "react";
import { Link } from "react-router-dom";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const DevPageDetails = ({ project }) => {
  return (
    <>
      <Link to={`/projects/${project._id}`}>
        <div className=" border rounded-lg p-4 shadow-sm  ">
          <h4 className=" font-semibold text-green-500">{project.title}</h4>
          <p><span className=" font-semibold">Description : </span> {project.description}</p>
          <p> <span className=" font-semibold"> Role : </span> <span className=" text-green-500 font-medium">{project.devSpec}</span> </p>
          <p>
            <span className="text-sm text-green-600">Budget :{project.budget} $</span>
          </p>
          <p className="text-xs mt-3 font-medium text-gray-400">
           Posted {formatDistanceToNow(new Date(project.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </Link>
    </>
  );
};

export default DevPageDetails;
