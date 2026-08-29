import fastifyAutoload from "@fastify/autoload";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";

//creation of fastify intance
const app = fastify({
  logger: true,
});

//config cors
await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

//config the swagger configuration
await app.register(fastifySwagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "API documentation",
      description: "documentacion of all te endpoints of the API",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://0.0.0.0:5000",
      },
    ],
  },
});

//config the swagger ui
await app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    deepLinking: true
  },
});

//config the route of autoload fastify
const routeURL = Bun.fileURLToPath(new URL("./src/routes", import.meta.url));
app.register(fastifyAutoload, {
  dir: routeURL,
});

//function start fastify server
const start = async () => {
  try {
    app.log.info("server active");
    await app.listen({ port: 5000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
