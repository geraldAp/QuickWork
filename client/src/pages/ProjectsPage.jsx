import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Url } from "../components/minidb/Url";
import { useParams } from "react-router-dom";

const Projects = () => {
  const [project, setProject] = useState();
  const { user } = useContext(AuthContext);
  const { projectId } = useParams();

  useEffect(() => {
    try {
      if (!projectId) {
        return; // Return early if projectId is not available
      }
      const handleProjectList = async () => {
        const options = {
          method: "GET",
          url: `${Url}/api/projects/${projectId}`,
          // params: { id: projectId },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await axios.request(options);
        setProject(response.data);
        console.log(response.data);
      };

      if (user.role === "developer") {
        handleProjectList();
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, [projectId, user]);

  return (
    <>
      <div className="mt-24">
        <div className="mb-24"></div>
        <div>
          <div className="grid grid-cols-4 gap-5 px-[5%]">
            {/* project info */}
            <div className=" col-span-3 md:col-span-2">
              {project ? (
                <>
                  <div className="border rounded-lg grid gap-1 p-4 shadow-sm">
                    <h4 className=" font-semibold text-green-500 text-2xl">
                      {project.title}
                    </h4>
                    <p>{project.description}</p>
                    <p>Project Budget: <span className="text-sm text-green-600">{project.budget} $</span> </p>
                    <h3 className=" font-medium text-green-500 text-xl">
                      Details
                    </h3>
                    <p className=" text-sm">{project.details}</p>
                  </div>
                </>
              ) : (
                <p>Loading project...</p>
              )}
            </div>
            {/* contact form */}
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
