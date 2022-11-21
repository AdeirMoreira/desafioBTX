import { TaskBusiness } from "../src/tasks/business/taskBusiness";
import { CreateTaskDto } from "../src/tasks/dto/createTaskDto";
import { UpdateTaskDto } from "../src/tasks/dto/updatedTaskDto";
import projectDatabaseMock from "./mocks/projectDatabaseMock";
import taskDatabaseMock from "./mocks/taskDatabaseMock";
import uuidMock from "./mocks/uuidMock";

const taskBusinessMock = new TaskBusiness(
	// @ts-ignore suprime o erro "projectDataBase contem metodos privados"
	taskDatabaseMock,
	projectDatabaseMock,
	uuidMock
);

describe("class TaskBusiness test", () => {
	describe("Register method test", () => {
		it("missing task name test", async () => {
			const badTask = new CreateTaskDto(
				null as unknown as string,
				"description",
				"0000/00/00",
				"projectId"
			);

			try {
				await taskBusinessMock.Register(badTask);
			} catch (error: any) {
				expect(error.message).toBe(
					"task name must be a string and a name for the task is required."
				);
				expect(error.statusCode).toBe(422);
			}
		});

		it("empety task name test", async () => {
			const badTask = new CreateTaskDto("", "description", "0000/00/00", "projectId");

			try {
				await taskBusinessMock.Register(badTask);
			} catch (error: any) {
				expect(error.message).toBe("a name for the task is required.");
				expect(error.statusCode).toBe(422);
			}
		});

		it("task name not string test", async () => {
			const badTask = new CreateTaskDto(
				false as unknown as string,
				"description",
				"0000/00/00",
				"projectId"
			);

			try {
				await taskBusinessMock.Register(badTask);
			} catch (error: any) {
				expect(error.message).toBe("task name must be a string.");
				expect(error.statusCode).toBe(422);
			}
		});

		it("missing task description test", async () => {
			const badTask = new CreateTaskDto(
				"name",
				null as unknown as string,
				"0000/00/00",
				"projectId"
			);

			try {
				await taskBusinessMock.Register(badTask);
			} catch (error: any) {
				expect(error.message).toBe(
					"task description must be a string and a description for the task is required."
				);
				expect(error.statusCode).toBe(422);
			}
		});

		it("empety task description test", async () => {
			const badTask = new CreateTaskDto("name", "", "0000/00/00", "projectId");

			try {
				await taskBusinessMock.Register(badTask);
			} catch (error: any) {
				expect(error.message).toBe("a description for the task is required.");
				expect(error.statusCode).toBe(422);
			}
		});

		it("task description not string test", async () => {
			const badTask = new CreateTaskDto(
				"name",
				false as unknown as string,
				"0000/00/00",
				"projectId"
			);

			try {
				await taskBusinessMock.Register(badTask);
			} catch (error: any) {
				expect(error.message).toBe("task description must be a string.");
				expect(error.statusCode).toBe(422);
			}
		});

		it("missing task deadLine test", async () => {
			const badTask = new CreateTaskDto(
				"name",
				"description",
				null as unknown as string,
				"projectId"
			);

			try {
				await taskBusinessMock.Register(badTask);
			} catch (error: any) {
				expect(error.message).toBe(
					"task deadline must be a string and a deadline for the task is required."
				);
				expect(error.statusCode).toBe(422);
			}
		});

		it("empety task deadLine test", async () => {
			const badTask = new CreateTaskDto("name", "description", "", "projectId");

			try {
				await taskBusinessMock.Register(badTask);
			} catch (error: any) {
				expect(error.message).toBe("a deadline for the task is required.");
				expect(error.statusCode).toBe(422);
			}
		});

		it("task deadLine not string test", async () => {
			const badTask = new CreateTaskDto(
				"name",
				"description",
				false as unknown as string,
				"projectId"
			);

			try {
				await taskBusinessMock.Register(badTask);
			} catch (error: any) {
				expect(error.message).toBe("task deadline must be a string.");
				expect(error.statusCode).toBe(422);
			}
		});

		it("missing task project test", async () => {
			const badTask = new CreateTaskDto(
				"name",
				"description",
				"deadline",
				null as unknown as string
			);

			try {
				await taskBusinessMock.Register(badTask);
			} catch (error: any) {
				expect(error.message).toBe(
					"the id of the project the task belongs to must be a string " +
                    "and the id of the project to which the task belongs is required."
				);
				expect(error.statusCode).toBe(422);
			}
		});

		it("empety task project test", async () => {
			const badTask = new CreateTaskDto("name", "description", "deadline", "");

			try {
				await taskBusinessMock.Register(badTask);
			} catch (error: any) {
				expect(error.message).toBe("the id of the project to which the task belongs is required.");
				expect(error.statusCode).toBe(422);
			}
		});

		it("task project not string test", async () => {
			const badTask = new CreateTaskDto(
				"name",
				"description",
				"deadline",
				false as unknown as string
			);

			try {
				await taskBusinessMock.Register(badTask);
			} catch (error: any) {
				expect(error.message).toBe("the id of the project the task belongs to must be a string.");
				expect(error.statusCode).toBe(422);
			}
		});
	});

    describe("GetAll method test", () => {
		it("return all tasks with formated date test", async () => {
			const response = await taskBusinessMock.GetAll()
			expect(response[0]?.id).toBe('id1')
			expect(response[1]?.name).toBe('name2')
			expect(response[0]?.description).toBe("description1")
            expect(response[0]?.deadline).toBe('12/12/2022')
			expect(response[1]?.createdAt).toBe('20/11/2022 23:15:15')
			expect(response[0]?.updatedAt).toBe('20/11/2022 23:13:13')
		})
	})

    describe("GetOne method test", () => {
		it("return one task test with formated date test", async () => {
			const response = await taskBusinessMock.GetOne("id2")
			expect(response?.id).toBe('id2')
			expect(response?.name).toBe('name2')
			expect(response?.description).toBe("description2")
            expect(response?.deadline).toBe('12/12/2022')
			expect(response?.createdAt).toBe('20/11/2022 23:15:15')
			expect(response?.updatedAt).toBe('20/11/2022 23:13:13')
		})

		it('task not found test', async () => {
			try {
				await taskBusinessMock.GetOne('oalkasdlksalkdfm')
			} catch (error:any) {
				expect(error.message).toBe(
					"task not found"
				);
				expect(error.statusCode).toBe(404);
			}
		})
	})

    describe('Update method test', () => {
        it('invalid name and description task test', async () => {
            const badUpdated = new UpdateTaskDto(
                false as unknown as string,
                5 as unknown as string,
                '12/12/2022',
                true,
                )
            try {
                await taskBusinessMock.Update(badUpdated, 'id2')
            } catch (error:any) {
                expect(error.message).toBe("task name must be a string and task description must be a string.");
				expect(error.statusCode).toBe(422);
            }
        })

        it('name, description and deadline is optional test', async () => {
            const goodUpdated = new UpdateTaskDto(
                null as unknown as string,
                null as unknown as string,
                null as unknown as string,
                true,
                )
                const response = await taskBusinessMock.Update(goodUpdated, 'id2')
                expect(response).toBeFalsy()
            
        })

        it('task not found test', async () => {
            const goodUpdated = new UpdateTaskDto(
                null as unknown as string,
                null as unknown as string,
                null as unknown as string,
                false,
                )
                try {
                    await taskBusinessMock.Update(goodUpdated, 'id2')
                } catch (error:any) {
                    expect(error.message).toBe(
                        "task not found"
                    );
                    expect(error.statusCode).toBe(404);
                }
        })

        it('update sucess test', async () => {
            const goodUpdated = new UpdateTaskDto(
                null as unknown as string,
                "update task description",
                null as unknown as string,
                true,
                )
                const response = await taskBusinessMock.Update(goodUpdated, 'id2')
                expect(response).toBeFalsy()
            
        })
    })

	describe("Delete method test", () => {
		it("delete sucess test", async () => {
			const response = await taskBusinessMock.Delete('id2')
			expect(response).toBeFalsy()
		})

		it("task not found test", async () => {
			try {
				await taskBusinessMock.Delete('asdkasdnasd')
			} catch (error:any) {
				expect(error.message).toBe(
					"task not found"
				);
				expect(error.statusCode).toBe(404);
			}
		})
	})
});
