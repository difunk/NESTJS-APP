import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

/**
 * Unit tests for UsersController.
 * This test suite ensures that the controller and its dependencies
 * are correctly instantiated in the testing context.
 */
describe("UsersController", () => {
  let controller: UsersController;

  beforeEach(async () => {
    // Create a testing module with the UsersController and a mocked UsersService dependency
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, { provide: "UserRepository", useValue: {} }], //Mock the UserRepository
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  // Smoke test to verify that the controller is defined and depenency injection works
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
