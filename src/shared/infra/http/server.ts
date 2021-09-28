import { app } from "./app";
import '../typeorm'

app.listen(3333, () => {
  console.log('server is Running on Port 3333');
})