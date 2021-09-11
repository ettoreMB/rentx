  
import { container } from "tsyringe";

import { IDateProvider } from "./IDateProvider";
import { DayJSDateProvider } from "./Implementations/DayJSDateProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayJSDateProvider
);