import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppErrors";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

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