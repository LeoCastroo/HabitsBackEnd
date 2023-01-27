import WebPush from "web-push"
import { FastifyInstance } from "fastify"
import { z } from "zod";

const publicKey = 'BGLddz-FU5z793Q3T6FSiv3szltjs516w7j4eo4yKq0UVma89TPwns_cgc00RHOEgmbwaObfFbYdqCjO6X0hgMs';
const privateKey = 'NU1iFCLy2dekn_eiAkaS5eDNMaZXUFfG7oXIy9XUiUI';

WebPush.setVapidDetails('http://localhost:3333', publicKey, privateKey);

export async function notificationRoutes(app: FastifyInstance) {
    app.get('/push/public_key', () => {
        return {
            publicKey,
        }
    })

    app.post('/push/register', (request, reply) => {
        console.log(request.body);
        return reply.status(201).send();
    })

    app.post('/push/send', async (request, reply) => {
        console.log("Chegou")
        const sendPushBody = z.object({
            subscription: z.object({
                endpoint: z.string(),
                keys: z.object({
                    p256dh: z.string(),
                    auth: z.string()
                })
            })
        })
        const { subscription } = sendPushBody.parse(request.body);

        setTimeout(() => {
            WebPush.sendNotification(subscription, 'HELLO DO BACKEND')
        }, 5000);
        
        return reply.status(201).send();
    })
}

