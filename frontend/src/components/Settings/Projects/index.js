import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getProjects } from "../../../actions/projects";
import Project from "./Project";

export default function ProjectsSettings() {
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <div>
      <NavLink to={`/settings/projects/new`}>Create new project</NavLink>
      {projects.loading ? (
        "Loading"
      ) : (
        <ul className="projects-container">
          {projects.payload.map((project) => (
            <li key={project.id} className="project">
              <Project project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
