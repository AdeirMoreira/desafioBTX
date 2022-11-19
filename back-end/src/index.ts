import "reflect-metadata";
import { app } from "./app";
import { ProjectRouter } from "./router/projectsrouter";

app.use("/project", ProjectRouter)