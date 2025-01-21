import { Hono } from "hono";
import { createService, getServices, deleteService } from "./services.controller";
import { zValidator } from "@hono/zod-validator";
import { serviceSchema } from "../validators";
import { adminRoleAuth } from "../middleware/bearAuth";

export const serviceRouter = new Hono();

//createservice
serviceRouter.post("/services", 
    zValidator('json', serviceSchema),
    createService
);

//get all services
serviceRouter.get("/services", getServices);

//delete service
serviceRouter.delete("/services/:id", adminRoleAuth, deleteService);

