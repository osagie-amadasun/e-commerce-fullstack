import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const orderRoute = async (fastify: FastifyInstance) => {
  fastify.get("/user-order", async (request:FastifyRequest, reply:FastifyReply) => {

  });
};
