import { JwtToken } from "../utils/Jwt.js";
export const ApiPhp = async (filepath) => {
    try {
        const token = JwtToken.getTokenApi({ app: "node-api" }, "api", {
            expiresIn: "1h",
        });
        const response = fetch("https://bgtech.com.br/erp/assets/assets-handler.php", {
            method: "Post",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(filepath),
        });
        const data = (await response).json();
        return await data;
    }
    catch (error) {
        throw error;
    }
};
