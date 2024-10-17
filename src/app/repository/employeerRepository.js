import { instanciaPrisma } from "../database/conexao.js";

<<<<<<< Updated upstream
export class employeerRepository {
  async showAllEmployeer(include) {
    try {
      if (include === "true") {
        return await instanciaPrisma.employee.findMany({
          include: {
            employee_address: { include: { adress_relation: !!include } },
          },
        });
      }
      return await instanciaPrisma.employee.findMany({
        orderBy: {
          id: "desc",
        },
      });
    } catch (error) {
      throw new Error(error);
=======

export class employeerRepository{
    async showAllEmployeer(){
        try{
            return await instanciaPrisma.employee.findMany({
                orderBy:{
                    id: 'desc'
                },
                include:{
                    employee_address:{
                        include:{
                            employee_id: false,
                            address_id: false,
                            adress_relation: true
                        }
                    }
                }
            })
          
        }catch(error){
            throw new Error(error)
        }
>>>>>>> Stashed changes
    }
  }

<<<<<<< Updated upstream
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
=======
    async showOneEmployeer(id){
        try {
            const employeerId = await instanciaPrisma.employee.findUnique({
                where:{id}
            })
            return(employeerId)

        } catch (error) {
            throw new Error(error);
        }
    }

    async createEmployeer(employeerData){
        const {name, email, cpf, phone, cell_phone, cep, logradouro, numero, complemento, bairro, cidade, rua} = await employeerData
        try {
            const employeer = await instanciaPrisma.employee.create({
                data: {name, email, cpf, phone, cell_phone}
            })
            
            const addressEmployeer = await instanciaPrisma.address.create({
                data: {cep, logradouro, numero, complemento, bairro, cidade, rua}
            })
            console.log(addressEmployeer)
            const employee_id = employeer.id
            const address_id = addressEmployeer.id
            const employeer_address = await instanciaPrisma.employee_address.create({
                data: {employee_id, address_id}
            })
>>>>>>> Stashed changes

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
      throw new Error(error);
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
      throw new Error(error);
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
