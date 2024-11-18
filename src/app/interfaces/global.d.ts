interface ClientC {
  corporate_reason: string;
  fantasy_name: string;
  branch_activity: string;
  cnpj: string;
  state_registration: string;
  type_contribuition: "fisica" | "juridica";
}
interface bodyCreateClient {
  financeiro: GenericFields;
  contabil: GenericFields;
  comercial: GenericFields;
  socio: GenericFields;
  endereco_empresa: Address;
  endereco_entrega: Address;
  cliente: ClientC;
}
interface integral extends GenericFields {}
interface integral extends ClientC {}
interface integral extends Address {}

interface GenericFields {
  name: string;
  email: string;
  phone: string;
  cell_phone?: string;
  rg: string;
  photo?: string;
}

interface Address {
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  neighborhood: string;
}
type AllImagens = (string | null)[];
