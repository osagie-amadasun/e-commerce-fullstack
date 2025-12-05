import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { clerkPlugin, getAuth } from "@clerk/fastify";
import { shouldBeUser } from "./middleware/authMiddleware.js";

const fastify = Fastify();
fastify.register(clerkPlugin);

fastify.get("/health", (request: FastifyRequest, reply: FastifyReply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toLocaleDateString(),
  });
});
fastify.get(
  "/test",
  { preHandler: shouldBeUser },
  (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({
      message: "Order service is authenticated!",
      userId: request.userId
    });
  }
);

const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    console.log(
      "Order service is running on port 8001 from a fastify framework"
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
