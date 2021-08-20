import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";


class RentalsRepository implements IRentalsRepository {

  private repository: Repository<Rental>;

  constructor(parameters) {
    this.repository = getRepository(Rental)
  }
}

export {RentalsRepository}