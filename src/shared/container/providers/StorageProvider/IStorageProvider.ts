interface IStorageProvider {
  save(file: string, folfder: string): Promise<string>;
  delete(file:string, folfder: string): Promise<void>;
}


export {IStorageProvider}