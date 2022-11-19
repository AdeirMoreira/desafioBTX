import { Router } from "express";
import  projectsController  from "../projects/controller/projectController";


export const ProjectRouter = Router()

ProjectRouter.post('', projectsController.Register)
ProjectRouter.get('', projectsController.GetAll)
ProjectRouter.get('/:id', projectsController.GetOne)
ProjectRouter.delete("/:id", projectsController.Delete)