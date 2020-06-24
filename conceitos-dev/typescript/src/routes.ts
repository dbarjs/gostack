import { Request, Response } from "express";
import createUser from "./services/CreateUser";

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: "dbarjs@jsbx.dev",
    password: "123456",
    techs: [
      "Node.js",
      "ReactJS",
      "Vue.js",
      { title: "JavaScript", experience: 100 },
    ],
  });

  return response.json({ message: "Hello World" });
}
