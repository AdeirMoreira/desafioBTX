import { ProjectsBusiness } from "../src/project/business/projectsBusiness";
import { CreateProjectDto } from "../src/project/dto/createProjectDto";
import projectDatabaseMock from "./mocks/projectDatabaseMock";
import uuidMock from "./mocks/uuidMock";

const projectBusinessBusinessMock = new ProjectsBusiness(
	// @ts-ignore suprime o erro "projectDataBase contem metodos privados"
	projectDatabaseMock,
	uuidMock
);

describe("class ProjectBusiness test", () => {
	describe("Register method test", () => {
		it("missing project name test", async () => {
			const badProject = new CreateProjectDto(null as unknown as string, "description");
			try {
				await projectBusinessBusinessMock.Register(badProject);
			} catch (error: any) {
				expect(error.message).toBe(
					"project name must be a string and a name for the project is required."
				);
				expect(error.statusCode).toBe(422);
			}
		});

		it("empety project name test", async () => {
			const badProject = new CreateProjectDto("", "description");
			try {
				await projectBusinessBusinessMock.Register(badProject);
			} catch (error: any) {
				expect(error.message).toBe(
					"a name for the project is required."
				);
				expect(error.statusCode).toBe(422);
			}
		});

		it("project name not string test", async () => {
			const badProject = new CreateProjectDto(5 as unknown as string, "description");
			try {
				await projectBusinessBusinessMock.Register(badProject);
			} catch (error: any) {
				expect(error.message).toBe(
					"project name must be a string."
				);
				expect(error.statusCode).toBe(422);
			}
		});

		it("missing project description test", async () => {
			const badProject = new CreateProjectDto("test", null as unknown as string);
			try {
				await projectBusinessBusinessMock.Register(badProject);
			} catch (error: any) {
				expect(error.message).toBe(
					"project description must be a string and a description for the project is required."
				);
				expect(error.statusCode).toBe(422);
			}
		});

		it("empety project description test", async () => {
			const badProject = new CreateProjectDto("test", "");
			try {
				await projectBusinessBusinessMock.Register(badProject);
			} catch (error: any) {
				expect(error.message).toBe(
					"a description for the project is required."
				);
				expect(error.statusCode).toBe(422);
			}
		});

		it("project description not string test", async () => {
			const badProject = new CreateProjectDto("test", 5 as unknown as string);
			try {
				await projectBusinessBusinessMock.Register(badProject);
			} catch (error: any) {
				expect(error.message).toBe(
					"project description must be a string."
				);
				expect(error.statusCode).toBe(422);
			}
		});

		it("successful creation test", async () => {
			const goodProject = new CreateProjectDto("test", "test")
			const response = await projectBusinessBusinessMock.Register(goodProject)
			expect(response?.id).toBe('uuid')
			expect(response?.name).toBe('test')
			expect(response?.description).toBe("test")
			expect(response?.createdAt).toBe(new Date(response?.createdAt as string).toISOString())
			expect(response?.updatedAt).toBe(new Date(response?.updatedAt as string).toISOString())
			
		})
	});

	describe("GetAll method test", () => {
		it("return all projects with formated date test", async () => {
			const response = await projectBusinessBusinessMock.GetAll()
			expect(response[0]?.id).toBe('id1')
			expect(response[1]?.name).toBe('name2')
			expect(response[0]?.description).toBe("description1")
			expect(response[1]?.createdAt).toBe('20/11/2022 22:07:12')
			expect(response[0]?.updatedAt).toBe('20/11/2022 22:07:12')
		})
	})

	describe("GetOne method test", () => {
		it("return onde project test with formated date test", async () => {
			const response = await projectBusinessBusinessMock.GetOne("id1")
			expect(response?.id).toBe('id1')
			expect(response?.name).toBe('name1')
			expect(response?.description).toBe("description1")
			expect(response?.createdAt).toBe('20/11/2022 22:07:12')
			expect(response?.updatedAt).toBe('20/11/2022 22:07:12')
		})

		it('project not found test', async () => {
			try {
				await projectBusinessBusinessMock.GetOne('oalkasdlksalkdfm')
			} catch (error:any) {
				expect(error.message).toBe(
					"Project not found"
				);
				expect(error.statusCode).toBe(404);
			}
		})
	})

	describe("Delete method test", () => {
		it("delete sucess test", async () => {
			const response = await projectBusinessBusinessMock.Delete('id1')
			expect(response).toBeFalsy()
		})

		it("project not found test", async () => {
			try {
				await projectBusinessBusinessMock.Delete('asdkasdnasd')
			} catch (error:any) {
				expect(error.message).toBe(
					"Project not found"
				);
				expect(error.statusCode).toBe(404);
			}
		})
	})
});
