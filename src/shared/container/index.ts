import { container } from 'tsyringe';

import "@shared/container/providers"

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICarsImagesReposiory } from '@modules/cars/repositories/ICarsImagesRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRespository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';



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

//IUsersRepository
container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
)

//ICarsRepository
container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)

//ICarsImagesRepository
container.registerSingleton<ICarsImagesReposiory>(
  "CarsImagesRepository",
  CarsImagesRepository
)

//IRentalsRepository
container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
)



