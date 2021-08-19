import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreatecarDTO {
  name: string;
  description: string;
  daily_rent: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;

  id?: string
  specifications?: Specification[];
}

export { ICreatecarDTO }