import { container } from "tsyringe";
import { LocalStorageProvider } from "./Implementations/LocalStorageProvider";
import { IStorageProvider } from "./IStorageProvider";


container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  LocalStorageProvider
);