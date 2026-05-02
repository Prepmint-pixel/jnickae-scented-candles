import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import disputesRouter from "./disputes";
import tradelinesRouter from "./tradelines";
import creditReportsRouter from "./credit-reports";
import notificationsRouter from "./notifications";
import documentsRouter from "./documents";
import aiRouter from "./ai";
import educationRouter from "./education";
import dashboardRouter from "./dashboard";
import usersRouter from "./users";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(disputesRouter);
router.use(tradelinesRouter);
router.use(creditReportsRouter);
router.use(notificationsRouter);
router.use(documentsRouter);
router.use(aiRouter);
router.use(educationRouter);
router.use(dashboardRouter);
router.use(usersRouter);
router.use(adminRouter);

export default router;
