import { StatusCodes } from "http-status-codes";
import userSchema, {validateIdOnly} from "../service/"

export const validateID = (req, res, next) => {
    const { id } = req.params;
    const validationSchema = validateIdOnly;
    validateID(req, res, next, { id }, validationSchema);
};