import React, { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProjectsContext } from "../context/ProjectContext";
import ClientProjectDetails from "../components/ClientProjectDetails";
import PostingForm from "../components/PostingForm";
import { Url } from "../components/minidb/Url";

const ClientPage = () => {
  const { projects, dispatch } = useContext(ProjectsContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchClientProjects = async () => {
      const response = await fetch(`${Url}/api/projects/admin`, {
        //  sending the authorization headers
        headers: {
          // in here we need an authorization key
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PROJECTS", payload: json });
      }
    };

    fetchClientProjects();
  }, [dispatch]);

  return (
    <section className="w-full mt-20">
      <div className="w-[90%] m-auto mb-20 grid gap-6 grid-cols-4">
        <div className="col-span-2">
          <h1 className=" mb-6 text-gray-600 text-xl font-medium">
            Your Projects
          </h1>
          <div className="w-full grid  gap-2">
            {projects &&
              projects.map((project) => (
                <ClientProjectDetails key={project._id} project={project} />
              ))}
          </div>
        </div>
        <div className="col-span-2">
          <h1 className=" mb-6 text-gray-600 text-xl font-medium">
            Add New Projects
          </h1>
          <PostingForm />
        </div>
      </div>
    </section>
  );
};

export default ClientPage;
