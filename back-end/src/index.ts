import "reflect-metadata";
import { app } from "./app";
import { ProjectRouter } from "./router/projectRouter";
import { TaskRouter } from "./router/taskRouter";

app.use("/project", ProjectRouter)
app.use("/task", TaskRouter)