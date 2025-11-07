import app from "./app";
import { Server } from "http"; 

const PORT = process.env.PORT || 3000;

const server: Server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

export default server;