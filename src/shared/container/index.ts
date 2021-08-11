import {container} from 'tsyringe';


import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/implementations/CategoriesRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/implementations/SpecificationsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';



//ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository", 
  CategoriesRepository
)

//ISpecificationsRepository
container.registerSingleton<ISpecificationRepository>(
  "SpecificationsRepository", 
  SpecificationRepository
)

//IUsersRepository
container.registerSingleton<IUsersRepository>(
  "UsersRepository", 
  UsersRepository
)


