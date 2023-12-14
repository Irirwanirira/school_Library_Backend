import  { Router } from 'express';
import AuthRoutes from "./authRoutes";
import RolesRoutes from "./roleRoutes";


const router = Router()
    .use("/auth", AuthRoutes)
    .use("/roles", RolesRoutes)



module.exports = router;