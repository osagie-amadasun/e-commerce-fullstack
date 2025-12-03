import Fastify from "fastify";

const fastify = Fastify();

fastify.get("/health", async (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toLocaleDateString(),
  });
});

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
