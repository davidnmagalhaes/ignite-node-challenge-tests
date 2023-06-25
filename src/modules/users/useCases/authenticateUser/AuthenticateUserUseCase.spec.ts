import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { User } from "../../entities/User";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AppError } from "../../../../shared/errors/AppError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let user: User;

describe("Authenticate User", () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to authenticate a user", async () => {
    const user = {
      name: "David",
      email: "david_nbxnb@hotmail.com",
      password: "123123",
    };

    await createUserUseCase.execute(user);

    const authentication = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authentication).toHaveProperty("token");
  });

  it("should not be able to authenticate an user that not exists", async () => {
    const userLoginData = {
      email: "david_nbxnb@hotmail.com",
      password: "123123",
    };

    expect(async () => {
      await authenticateUserUseCase.execute(userLoginData);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate a user with wrong password", async () => {
    const user = {
      name: "David",
      email: "david_nbxnb@hotmail.com",
      password: "123123",
    };

    await createUserUseCase.execute(user);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "454545",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
