import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { shouldBeUser } from "../middleware/authMiddleware";
import { Order } from "@repo/order-db"

export const orderRoute = async (fastify: FastifyInstance) => {
  fastify.get("/user-order", {preHandler: shouldBeUser}, async (request:FastifyRequest, reply:FastifyReply) => {
    const order = await Order
  });
};
