interface ClientC {
  id: number;
  corporate_reason: string;
  fantasy_name: ValueCLient;
  branch_activity: ValueCLient;
  cnpj: string;
  state_registration: ValueCLient;

  situation: boolean;
  type_contribuition: ValueCLient;

  created_at: Date | string;
  update_at: Date | string;
}
// type valueClient = string | null;

interface address {
  adress: Address;
}
type ValueCLient = string | null;

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
      name: ValueCLient;
      email: ValueCLient;
      cell_phone: ValueCLient;
      phone: ValueCLient;
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
  name: ValueCLient;
  email: ValueCLient;
  cell_phone: ValueCLient;
  rg: ValueCLient;
  phone: ValueCLient;
  cpf: ValueCLient;
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

interface queryWhere {
  contains: string | null;
  mode?: "insensitive";
}

interface filtragem {
  branch_activity: queryWhere;
  fantasy_name: queryWhere;
  email: queryWhere;
  phone: queryWhere;
  name: queryWhere;
}

interface Address {
  cep?: ValueCLient;

  street: ValueCLient;
  number: ValueCLient;
  complement: ValueCLient;
  neighborhood: ValueCLient;
  city: ValueCLient;
  created_at: Date | string;
  update_at: Date | string;
  state: ValueCLient;
}

type AllImagens = (string | null)[];

interface Supplier_pf {
  id?: number;
  supplier_name: string;
  supplier_code: string;
  email: string;
  phone: string;
  rg: string;
  cpf: string;

  birth_date: Date | null | string;
  status: boolean;
  created_at?: Date;
  update_at?: Date;

  // product_supplier_pf?: Product_Supplier_pf;
  // address_supplier_pf?: Address;
}

// interface SupplierSchema extends Supplier_pf{}
interface BodySupplierPf {
  json?: string;
  supplier: Supplier_pf;
  // product: Product_Supplier_pf
  address: Address;
}

// interface AllSupplier_pf extends Supplier_pf {
//   id: number;
//   product?: string[];
//   created_at?: Date;
//   update_at?: Date;
// }
interface AllSupplier_pf extends Supplier_pf {
  id: number;
  product: string[];
  created_at: Date;
  update_at: Date;
}

interface Product_Supplier_pf {
  id_product?: string;
  name?: string;
  price: string;
  purchase_tax: string;
  delivery_time: string;
}

type filterContanis = { contanis: string };

interface filterSupplierPf {
  supplier_name: filterContanis;
  cpf: filterContanis;
  email: filterContanis;
  phone: filterContanis;
}

interface Product {
  id: number;
  id_image: number;
  name: string;
  supplier_name: string;
  id_supplier_pf?: number ;
  id_supplier_pj?: number;
  serie_number: number;
  barcode: number;
  amount: number;
  cost_value: string;
  weight: string;
  width: string;
  height: string;
  length: string;
  description?: string;
  created_at?: Date;
  update_at?: Date;
}

type ProductGetAll = Pick<Product, 'barcode' | 'name' | 'supplier_name' | 'cost_value'>

type ProductGetById = Pick<Product, 'id'>

// interface supplierGetById extends Supplier_pf {

//   address_supplier_pf: addressGetById
//   supplier_imagem: supplierImageGetById
// }

// interface addressGetById extends address {
//   id_address: number
//   address: Address[]
// }

// interface supplierImageGetById {
//   id_supplier_pf: number
//   id_image: number
//   created_at?: Date;
//   update_at?: Date ;
//   supplier_pf_image:[ {path: string}]
// }
