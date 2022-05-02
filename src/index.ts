import Fastify, { FastifyRequest, FastifyReply } from "fastify";

import fjwt from "@fastify/jwt";

import userRoutes from "./modules/user/user.route";
import { productRoutes } from "./modules/product/product.route";

export const server = Fastify();

declare module "fastify" {
	export interface FastifyInstance {
		authenticate: any;
	}
}

declare module "@fastify/jwt" {
	export interface FastifyJWT {
		user: {
			email: string;
			id: number;
			name: string;
		};
	}
}

server.register(fjwt, {
	secret: "ABCDefjdskodsldsnk121212",
});

server.decorate(
	"authenticate",
	async (req: FastifyRequest, reply: FastifyReply) => {
		try {
			await req.jwtVerify();
		} catch (e) {
			console.error(e);
			return reply.send(e);
		}
	}
);

server.get(
	"/healthcheck",
	async function (req: FastifyRequest, reply: FastifyReply) {
		console.log("http://localhost:8002/healthcheck");
		return {
			status: "OK",
		};
	}
);

async function main() {
	server.register(userRoutes, { prefix: "/api/users" });
	server.register(productRoutes, { prefix: "/api/products" });

	try {
		await server.listen(8002, "0.0.0.0");
		console.log(`Server is ready at http://localhost:8002`);
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}

main();
