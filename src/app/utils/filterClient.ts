import { TypeFilter } from "../guard/filterDynamic.js";

export const filterquery = async (value: string): Promise<filtragem> => {
  const instanciaFilter = new TypeFilter(value);
  try {
    if (instanciaFilter.filterCompany()) {
      return {
        branch_activity: { contains: value, mode: "insensitive" },
        name: { contains: value, mode: "insensitive" },
        fantasy_name: { contains: value, mode: "insensitive" },
        email: { contains: value, mode: "insensitive" },
        phone: { contains: "" },
      };
    } else if (instanciaFilter.filterEmail()) {
      const filter = {
        branch_activity: { contains: "", mode: "insensitive" },
        name: { contains: "", mode: "insensitive" },
        fantasy_name: { contains: "", mode: "insensitive" },
        email: { contains: value, mode: "insensitive" },
        phone: { contains: "" },
      };
    }
    return {
      branch_activity: { contains: "", mode: "insensitive" },
      name: { contains: "", mode: "insensitive" },
      fantasy_name: { contains: "", mode: "insensitive" },
      email: { contains: "", mode: "insensitive" },
      phone: { contains: value },
    };
  } catch (error) {
    throw error;
  }
};
