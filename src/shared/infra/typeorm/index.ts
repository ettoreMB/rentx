import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;
  newOptions.host = 'database'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
  createConnection({
    ...options,
  });
});

// import {createConnection} from "typeorm"

// const connection =  createConnection()


export default async(): Promise<Connection> => {
  const default
  return  createConnection(

  )
}