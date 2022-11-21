import { Request, Response } from "express";
import taskBusiness, { TaskBusiness } from "../business/taskBusiness";
import { CreateTaskDto } from "../dto/createTaskDto";
import { UpdateTaskDto } from "../dto/updatedTaskDto";

export class TaskController {
	constructor(
		private taskBusiness: TaskBusiness
	){}
	
    Register = async (req: Request, res: Response): Promise<void> => {
		const createTaskDto: CreateTaskDto = new CreateTaskDto(
			req.body.name,
			req.body.description,
			req.body.deadLine,
			req.body.projectId
		);

		try {
			const response = await this.taskBusiness.Register(createTaskDto);
			res.status(201).send(response);
		} catch (error: any) {
			res.status(error.statusCode || 400).send({ message: error.message });
		}
	};

	GetAll = async (req: Request, res: Response)=> {
		try {
			const response = await this.taskBusiness.GetAll();
			res.status(200).send(response);
		} catch (error: any) {
			res.status(error.statusCode || 400).send({ message: error.message });
		}
	}

	GetOne = async (req: Request, res: Response) => {
		const id : string = req.params.id

		try {
			const response = await this.taskBusiness.GetOne(id);
			res.status(200).send(response);
		} catch (error: any) {
			res.status(error.statusCode || 400).send({ message: error.message });
		}
	}

    Update = async (req: Request, res: Response) => {
		const updateTaskDto: UpdateTaskDto = new UpdateTaskDto(
			req.body.name,
			req.body.description,
			req.body.deadLine,
			req.body.completed,
		)
		const id : string = req.params.id
		
        try {
            const response = await this.taskBusiness.Update(updateTaskDto, id);
			res.status(200).send(response);
        } catch (error:any) {
            res.status(error.statusCode || 400).send({ message: error.message });
        }
    }

	Delete = async (req: Request, res: Response): Promise<void> => {
		const id : string = req.params.id

		try {
			const response = await this.taskBusiness.Delete(id);
			res.status(200).send(response);
		} catch (error: any) {
			res.status(error.statusCode || 400).send({ message: error.message });
		}
	};
}

export default new TaskController(taskBusiness)