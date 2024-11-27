import { ApiPhp } from "../middleware/ApiPhp.js";
export const ApiPhpUtils = async (imagems: (string | null)[]) => {
  try {
    const filesPath = imagems.filter((path) => {
      return path ? path : false;
    });
    if (filesPath.length != 0) {
      let controle = 0;
      const allPaths = await ApiPhp({
        filepath: [...filesPath],
        typeFile: "Profile",
      });
      imagems.forEach((value, index) => {
        value ? ((imagems[index] = allPaths[controle]), controle++) : "";
      });
    }
    return imagems;
  } catch (error) {
    throw error;
  }
};
