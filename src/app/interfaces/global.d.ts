interface ClientC {
  id: number;
  corporate_reason: string;
  fantasy_name: string;
  branch_activity: string;
  cnpj: string;
  state_registration: string;

  situation: boolean;
  type_contribuition: string;
  created_at: Date;
  update_at: Date;
}

interface address {
  adress: Address;
}

interface getUnic extends ClientC {
  financinal_contact: sectorId;
  commercial_contact: sectorId;
  accounting_contact: sectorId;
  owner_partner: sectorId;
  image_company: { image: { path: string | null } }[];
  company_address: address[];
  delivery_address: address[];
}

type sectorId = { sectorId: number }[];

interface base_solid_allclient {
  owner_partner: {
    sector: {
      name: string;
      email: string;
      cell_phone: string;
    };
    created_at: Date;
    update_at: Date;
    clientId: number;
    sectorId: number;
  }[];
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
  phone?: string;
  cell_phone: string;
  rg: string;
  photo?: string | null;
  cpf: string;
}

interface allResources extends ClientC {
  owner_partner: { sectorId: number }[];
  commercial_contact: { sectorId: number }[];
  financinal_contact: { sectorId: number }[];
  accounting_contact: { sectorId: number }[];
}
interface adm {
  id?: number;
  password?: string;
  cnpj: string;
  created_at?: Date;
  update_at?: Date;
}

interface admClient extends adm {
  client?: {
    id?: number;
    name: string;
    cpf: string;
  };

  role_adm?: [
    {
      role: {
        role_name: string;
      };
    }
  ];
}

interface upload {
  secure_url: string;
  original_filename: string;
}
type imagemId = { imageId: number };
interface imageId extends GenericFields {
  accounting_contact_image: imageId;
  commercial_image: imageId;
}

interface adminPermission {
  adm?: {
    role_adm: [
      {
        role: {
          role_name: string;
        };
      }
    ];
  };
}

interface Address {
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  neighborhood: string;
  created_at: Date;
  update_at: Date;
}

type AllImagens = (string | null)[];


interface Supplier_pf {
  supplier_name: string
  supplier_code: string
  email: string
  phone: string
  rg: string
  cpf: string
  birth_date: Date
  product_supplier_pf?: Product_Supplier_pf
  address_supplier_pf?: Address

}

interface AllSupplier_pf extends Supplier_pf {
  id: number
  product: string[]
  created_at: Date
  update_at: Date
}

interface Product_Supplier_pf {
  price: string
  purchase_tax: string
  delivery_time: string
}


