import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProjectsContext } from "../context/ProjectContext";

import React from "react";

const PostingForm = () => {
  const {user} = useContext(AuthContext)
  const { dispatch } = useContext(ProjectsContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [devSpec, setDevSpec] = useState("");
  const [details, setDetails] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const project = { title, description, devSpec, details, budget };
    console.log(project);
    const response = await fetch("http://localhost:4000/api/projects", {
      method: "POST",
      body: JSON.stringify(project),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      console.log(json);
    }
    if (response.ok) {
      setTitle("");
      setDescription("");
      setDevSpec("");
      setDetails("");
      setBudget("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_PROJECT", payload: json });
    }
  };

  return (
    <>
      <form className="w-full p-4 border rounded-md" onSubmit={handleSubmit}>
        <h3 className="text-center">Set a project and get developers on it </h3>
        <div className="w-full grid gap-4">
          {/* title */}
          <div>
            <label className="text-gray-500 mb-1 font-medium text-base">
              Title
            </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className={`w-full outline-none border    h-9 rounded-md p-2${
                emptyFields.includes("title") ? "border-red-600" : ""
              }`}
            />
          </div>
          {/* Budget */}
          <div>
            <label className="text-gray-500 mb-1 font-medium text-base">
              Budget (in $):
            </label>
            <input
              type="number"
              onChange={(e) => setBudget(e.target.value)}
              value={budget}
              className={`w-full  outline-none border  h-9 rounded-md p-2 ${
                emptyFields.includes("budget") ? "border-red-600" : ""
              }`}
            />
          </div>
          {/* description */}
          <div>
            <label className="text-gray-500 mb-1 font-medium text-base">
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              rows={3}
              className={` w-full  outline-none border  p-2 rounded-md${
                emptyFields.includes("description") ? "border-red-600" : ""
              }`}
            />
          </div>
          {/* DevSpec */}
          <div>
            <label className="text-gray-500 mb-1 font-medium text-base">
              Developer Role
            </label>
            <input
              type="text"
              onChange={(e) => setDevSpec(e.target.value)}
              value={devSpec}
              className={`w-full outline-none border    h-9 rounded-md p-2${
                emptyFields.includes("devSpec") ? "border-red-600" : ""
              }`}
            />
          </div>
          {/* Project details */}
          <div>
            <label className="text-gray-500 mb-1 font-medium text-base">
              Project details
            </label>
            <textarea
              onChange={(e) => setDetails(e.target.value)}
              value={details}
              rows={5}
              className={` w-full  outline-none border  p-2 rounded-md${
                emptyFields.includes("details") ? "border-red-600" : ""
              }`}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-transparent hover:border-green-600 hover:text-green-600 transition duration-300 ease-in-out outline-none focus:outline-none border-2 border-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Project
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default PostingForm;
