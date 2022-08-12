import { Router } from "express";

import { userRoutes, authRoutes, repositoriesRoutes } from "./routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/repositories", repositoriesRoutes);

export default router;
