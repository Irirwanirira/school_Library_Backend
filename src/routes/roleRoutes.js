import { Router } from "express";
import auth from "../middleware/authenticate.user";
import permit from "../middleware/permission";
import ROLES from "../utils/constant";

import {
    getRole, getRoles, createNewRole, updateExistingRole, deleteExistingRole
} from "../controllers/role_controller";
import { patch } from "./authRoutes";


const router = Router()
    .get(
        "/",  
        auth,
        permit(ROLES.LIBRARIAN, ROLES.STUDENT, ROLES.GUEST),
        getRoles
    )
    .get(
        "/:id",
        auth,
        permit(ROLES.LIBRARIAN, ROLES.STUDENT, ROLES.GUEST),
        getRole
    )
    .post("/", auth, permit(ROLES.LIBRARIAN), createNewRole)
    .patch("/id", 
    auth,
    permit(ROLES.LIBRARIAN),
    updateExistingRole
    )
    .delete("/:id",
    auth,
    permit(ROLES.LIBRARIAN),
    // validateID,
    deleteExistingRole
    )

export default router;