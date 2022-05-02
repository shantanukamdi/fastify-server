import { FastifyInstance } from "fastify";
import { createProductHandler, getProductsHandler } from "./product.controller";
import { $ref } from "./product.schema";

export async function productRoutes(server: FastifyInstance) {
	server.post(
		"/",
		{
			preHandler: [server.authenticate],
			schema: {
				body: {
					type: "object",
					properties: {
						title: { type: "string" },
						price: { type: "number" },
						content: { type: "string" },
					},
				},
				response: {
					201: {
						type: "object",
						properties: {
							title: { type: "string" },
							price: { type: "number" },
							content: { type: "string" },
						},
					},
				},
			},
		},
		createProductHandler
	);

	server.get(
		"/",
		{
			preHandler: [server.authenticate],
		},
		getProductsHandler
	);
}
