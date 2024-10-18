import { instanciaPrisma } from "../database/conexao.js";

export class employeerRepository {
  async showAllEmployeer() {
    try {
      
        return await instanciaPrisma.employee.findMany({
            orderBy: {
            id: "desc",
            },
            include: {
                employee_address:{
                    include:{
                        adress_relation: true,
                        employee_id: false,
                        address_id: false
                    }
                },
            },
        });
    } catch (error) {
      throw error;
    }
  }

  async createEmployeer(employeerData) {
    const {
      name,
      email,
      cpf,
      phone,
      cell_phone,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      rua,
    } = employeerData;

    try {
      const employeer = await instanciaPrisma.employee.create({
        data: { email, cpf, phone, cell_phone, name },
      });

      const addressEmployeer = await instanciaPrisma.address.create({
        data: { cep, logradouro, numero, complemento, bairro, cidade, rua },
      });

      const employee_id = employeer.id;
      const address_id = addressEmployeer.id;
      const employeer_address = await instanciaPrisma.employee_address.create({
        data: { employee_id, address_id },
      });

      const message = "fornecedor cadastrado com sucesso";
      return {
        employeer,
        adresses: addressEmployeer,
        message,
      };
    } catch (error) {
      throw error;
    }
  }
  
  async getUniqueEmployer(cpf) {
    try {
      const employyer = await instanciaPrisma.employee.findUnique({
        where: { cpf },
        select: {
          id: true,
          cell_phone: true,
          phone: true,
          email: true,
          cpf: true,
          name: true,
        },
      });
      console.log(employyer);
      if (!employyer) {
        throw new Error("funcionário não encontrado");
      }
      return employyer;
    } catch (error) {
      throw error;
    }
  }

  async EditEmployeer(cpf, takeAddress) {
    console.log(takeAddress);
    const {
      email,
      phone,
      cell_phone,
      name,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
    } = takeAddress;
    try {
      const findEmployeer = await instanciaPrisma.employee.update({
        where: {
          cpf,
        },
        data: {
          name,
          cell_phone,
          phone,
          email,
          cpf,
        },
      });

      const addressEmployeer = await instanciaPrisma.employee_address.findMany({
        where: {
          employee_id: findEmployeer.id,
        },
        select: {
          address_id: true,
        },
      });
      
      console.log(addressEmployeer, "lerolero");
      const [numeroEnd] = addressEmployeer;

      const updateAddressEmployer = await instanciaPrisma.address.update({
        where: {
          id: numeroEnd.address_id,
        },
        data: {
          cep,
          bairro,
          cidade,
          complemento,
          logradouro,
          numero,
        },
      });

      return {
        employer: findEmployeer,
        address: updateAddressEmployer,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteEmployeer(cpf) {
    try {
      const deleteCpf = await instanciaPrisma.employee.delete({
        where: {
          cpf,
        },
      });
      return deleteCpf;
      } catch (error) {
      throw error;
    }
  }
}
