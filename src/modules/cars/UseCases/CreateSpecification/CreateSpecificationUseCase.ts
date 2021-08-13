import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppErrors";
import { inject, injectable } from "tsyringe";


interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationRepository){}

  async execute({name, description}: IRequest): Promise<void> {
    const descriptionAlreadyExists = await  this.specificationRepository.findByName(name)
    
    if(descriptionAlreadyExists) {
      throw new AppError('Description Already Exists!')
    }

    this.specificationRepository.create({name, description});
  }
};

export { CreateSpecificationUseCase };