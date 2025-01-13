import { TypeFilter } from "../guard/filterDynamic.js";

export const filterquery = async (value: string): Promise<filtragem> => {
  const instanciaFilter = new TypeFilter(value);
  try {
    if (instanciaFilter.filterCompany()) {
      return {
        branch_activity: { contains: `%${value}%`, mode: "insensitive" },
        name: { contains: `%${value}%`, mode: "insensitive" },
        fantasy_name: { contains: `%${value}%`, mode: "insensitive" },
        email: { contains: `%${value}%`, mode: "insensitive" },
        phone: { contains: null },
      };
    } else if (instanciaFilter.filterEmail()) {
      const filter = {
        branch_activity: { contains: null, mode: "insensitive" },
        name: { contains: null, mode: "insensitive" },
        fantasy_name: { contains: null, mode: "insensitive" },
        email: { contains: `%${value}%`, mode: "insensitive" },
        phone: { contains: null },
      };
    }
    return {
      branch_activity: { contains: null, mode: "insensitive" },
      name: { contains: null, mode: "insensitive" },
      fantasy_name: { contains: null, mode: "insensitive" },
      email: { contains: null, mode: "insensitive" },
      phone: { contains: `%${value}%` },
    };
  } catch (error) {
    throw error;
  }
};
