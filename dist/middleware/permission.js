import { AllError } from "../error/AllError.js";
export const hasPermission = (hasPermission) => {
    return async (request, response, next) => {
        try {
            const permissions = request.body.user.permission;
            const permission = permissions.includes(hasPermission);
            if (permission) {
                next();
                return;
            }
            throw new AllError("usuário não tem permissão para essa ação");
        }
        catch (error) {
            next(error);
        }
    };
};
