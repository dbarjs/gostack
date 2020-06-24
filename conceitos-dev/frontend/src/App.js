import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./App.css";

import Header from "./components/Header";

/**
 * Três conceitos do React:
 * Componente
 * Propriedade
 * Estado
 */

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((response) => {
      setProjects([...response.data]);
    });
  }, []);

  async function handleAddProject() {
    // setProjects([...projects, ]);
    const response = await api.post("/projects", {
      title: `Novo projeto ${Date.now()}`,
      owner: "Eduardo Barros",
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Homepage" />
      <button type="button" onClick={handleAddProject}>
        Adicionar projeto
      </button>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
