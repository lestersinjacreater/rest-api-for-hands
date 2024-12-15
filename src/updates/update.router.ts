import { Hono } from "hono";
import { createUpdate, deleteUpdate, getUpdates, editUpdate } from "./update.controller"
import { zValidator } from "@hono/zod-validator";
import { updateSchema } from "../validators";
import { adminOrUserRoleAuth, adminRoleAuth, superuserRoleAuth, userRoleAuth } from "../middleware/bearAuth";
// import { adminRoleAuth } from "../middleware/bearAuth";
export const updateRouter = new Hono();

//create an update (admin only)
updateRouter.post("/updates", zValidator('json', updateSchema), adminRoleAuth, createUpdate);

//delete an update (admin only)
updateRouter.delete("/updates/:id", adminRoleAuth, deleteUpdate);

//get all updates
updateRouter.get("/updates", adminOrUserRoleAuth, getUpdates);

//edit an update (admin only)
updateRouter.put("/updates/:id", adminRoleAuth, editUpdate);

