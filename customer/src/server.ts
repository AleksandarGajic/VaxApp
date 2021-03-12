import * as http from "http";
import { AddressInfo } from "net";
import app from "./startup/app";

const server = http.createServer(app);
server.listen(app.get("port"), () => {
    const address = <AddressInfo>server.address();
    const bind = address.port ? `port ${address.port}` : `pipe ${address}`;
    console.log(`Listening on ${bind}`);
});
