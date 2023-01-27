// Back-end API RESTful

import Fastify from "fastify"
import cors from "@fastify/cors"
import { appRoutes } from "./routes";
import { notificationRoutes } from "./notification-routes";

const app = Fastify();


app.register(cors)
app.register(appRoutes)
app.register(notificationRoutes)

app.listen({
    host: "192.168.0.10",
    port: 3333,
}).then(() => {
    console.log('HTTP Server running!')
})