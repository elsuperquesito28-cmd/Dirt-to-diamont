import type { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance) {
  fastify.get("/miner", async () => {
    return { name: "juan", force: 3 };
  });
}

//ESM
export default routes;
