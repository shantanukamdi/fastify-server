import { FastifyInstance } from "fastify";
import {registerUserHandler, loginHandler, getUserHandler} from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
    server.post('/', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    email: {type: 'string'},
                    name: {type: 'string'},
                    password: {type: 'string'}
                }
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        id: {type: 'number'},
                        email: {type: 'string'},
                        name: {type: 'string'},
                    }
                }
            }
        }
    } ,registerUserHandler);

    server.post('/login', loginHandler);

    server.get('/', {
        preHandler: [server.authenticate]
    } ,getUserHandler);
}

export default userRoutes;