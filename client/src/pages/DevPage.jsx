import React, { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProjectsContext } from "../context/ProjectContext";
import axios from "axios";
import DevPageDetails from "../components/devPageDetails";

const DevPage = () => {
  const { projects, dispatch } = useContext(ProjectsContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    try {
      const fetchProjects = async () => {
        const response = await axios.get("http://localhost:4000/api/projects", {
          // sending the authorization headers
          headers: {
            // in here we need an authorization key
            'Authorization': `Bearer ${user.token}`,
          },
        });
        if (response.status === 200) {
          const json = response.data;
          dispatch({ type: "SET_PROJECTS", payload: json });
        }
      };

      if ((user.role === "developer")) {
        fetchProjects();
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, [dispatch,user]);

  return (
    <section className="w-full mt-20">
      <div className="w-[80%] m-auto mb-20 grid gap-6 grid-cols-4">
        <div className="col-span-3 ">
          <h1 className=" mb-6 text-gray-600 text-xl font-medium">
            latest Projects
          </h1>
          <div className="w-full grid  gap-2">
            {projects &&
              projects.map((project) => (
                <DevPageDetails key={project._id} project={project} />
              ))}
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default DevPage;
