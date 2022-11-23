import { Router } from "express";
import taskController from "../tasks/controller/taskController";


export const TaskRouter = Router();

TaskRouter.post("", taskController.Register)
TaskRouter.get("", taskController.GetAll)
TaskRouter.get("/:id", taskController.GetOne)
TaskRouter.get('/project/:id', taskController.GetAllByProject)
TaskRouter.patch("/:id", taskController.Update)
TaskRouter.delete("/:id", taskController.Delete)