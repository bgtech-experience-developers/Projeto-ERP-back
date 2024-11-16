interface Client {
  corporate_reason: string;
  fantasy_name: string;
  branch_activity: string;
  cnpj: string;
  state_registration: string;
  type_contribuition: "fisica" | "juridica";
}

interface Adm {
  cnpj: string,
  password: string,
  id?: number
}
