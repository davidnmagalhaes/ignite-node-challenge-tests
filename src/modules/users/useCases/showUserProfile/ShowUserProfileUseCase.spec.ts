import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Show User Profile", () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(
      inMemoryUsersRepository
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });
  it("should be able to show user profile ", async () => {
    const user = await createUserUseCase.execute({
      name: "David",
      email: "david_nbxnb@hotmail.com",
      password: "123123",
    });

    if (user.id) {
      const response = await showUserProfileUseCase.execute(user.id);

      expect(response).toHaveProperty("id");
    }
  });
});
