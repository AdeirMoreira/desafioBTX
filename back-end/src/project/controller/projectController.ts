import { Request, Response } from "express";
import projectsBusiness, { ProjectsBusiness } from "../business/projectsBusiness";
import { CreateProjectDto } from "../dto/createProjectDto";

export class ProjectsController {
	constructor(private projectsBusiness: ProjectsBusiness) {}

	Register = async (req: Request, res: Response): Promise<void> => {
		const createProjectDto: CreateProjectDto = new CreateProjectDto(
			req.body.id,
			req.body.name,
			req.body.description
		);

		try {
			const response = await this.projectsBusiness.Register(createProjectDto);

			res.statusMessage = "project created successfully";
			res.status(201).send(response);
		} catch (error: any) {
			res.status(error.statusCode || 400).send({ message: error.message });
		}
	};

	GetAll = async (req: Request, res: Response) => {
		try {
			const response = await this.projectsBusiness.GetAll();
			res.status(200).send(response);
		} catch (error: any) {
			res.status(error.statusCode || 400).send({ message: error.message });
		}
	};

	GetOne = async (req: Request, res: Response) => {
		const id: string = req.params.id;

		try {
			const response = await this.projectsBusiness.GetOne(id);
			res.status(200).send(response);
		} catch (error: any) {
			res.status(error.statusCode || 400).send({ message: error.message });
		}
	};

	Delete = async (req: Request, res: Response): Promise<void> => {
		const id: string = req.params.id;

		try {
			const response = await this.projectsBusiness.Delete(id);

			res.statusMessage = "successfully deleted task";
			res.status(200).send(response);
		} catch (error: any) {
			res.status(error.statusCode || 400).send({ message: error.message });
		}
	};
}
export default new ProjectsController(projectsBusiness);
