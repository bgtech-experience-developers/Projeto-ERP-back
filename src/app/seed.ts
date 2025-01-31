import { error, log } from "console";
import { InstanciaPrisma } from "./db/PrismaClient.js";
import { fa, faker, fakerPL } from "@faker-js/faker"; // Biblioteca para gerar dados aleatórios
import { read } from "fs";
import { number } from "joi";

const connectionDb = InstanciaPrisma.GetConnection();

// async function main() {
//   const records = [];

//   for (let i = 1; i <= 100; i++) {
//     const birthDate = faker.date.past({ years: 50 }); // Gera uma data de nascimento aleatória

//     records.push(
//       connectionDb.supplier_pf.create({
//         data: {
//           supplier_name: faker.company.name(),
//           supplier_code: faker.string.numeric(4), // Substitui faker.random.numeric
//           cpf: faker.string.numeric(11), // Substitui faker.random.numeric
//           email: faker.internet.email(),
//           rg: faker.string.numeric(9), // Substitui faker.random.numeric
//           birth_date: birthDate,
//           phone: "85912345678",
//           supplier_imagem: {
//             create: {
//               supplier_pf_image: {
//                 create: {
//                   path: faker.image.url(),
//                 },
//               },
//             },
//           },

//           address_supplier_pf: {
//             create: {
//               address: {
//                 create: {
//                   cep: faker.location.zipCode("########"), // Atualizado para faker.location
//                   street: faker.location.street(),
//                   number: faker.string.numeric(3),
//                   complement: faker.location.secondaryAddress(),
//                   city: faker.location.city(),
//                   neighborhood: faker.location.county(),
//                 },
//               },
//             },
//           },
//         },
//       })
//     );
//   }

//   await connectionDb.$transaction(records);
//   console.log("100 registros criados com sucesso!");
// }

// main()
// .then(async () => {
//     await connectionDb.$disconnect()
// })
// .catch(async (e) =>{
//     console.error(e)
//     await connectionDb.$disconnect()
//     process.exit(1)
// })


async function product_seed() {
  const products = [];
  for (let index = 1; index <= 100; index++) {
    const name = faker.commerce.productName();
    const status = faker.datatype.boolean();
    const supplier_name = faker.company.name();
    const serie_number = faker.number.int(10);
    const barcodenumber = Number(faker.finance.accountNumber(5))
    const barcode = barcodenumber;
    
    const amount = faker.number.int({ min: 1, max: 4 });
    const cost_value = faker.number.float({ min: 2, max: 8 });
    const weight = faker.number.float({ min: 2, max: 4 });
    const width = faker.number.float({ min: 2, max: 4 });
    const height = faker.number.float({ min: 2, max: 4 });
    const length = faker.number.float({ min: 2, max: 4 });
    const description = faker.string.alpha(100);


    const product = {
      name,
      supplier_name,
      serie_number,
      barcode,
      amount,
      cost_value,
      weight,
      width,
      height,
      length,
      description
    };
    const supplierPjExists = await connectionDb.supplier_pj.findUnique({
      where: { id: index },
    });
    
    if (!supplierPjExists) {
      console.log(`Fornecedor PJ com ID ${index} não encontrado! Pulando...`);
      continue;
    }
    if(index % 2 == 0) {
      products.push(
   
        connectionDb.product.create({
          data: {
            name,
            supplier_name,
            serie_number,
            barcode,
            amount,
            cost_value: product.cost_value.toString(),
            weight: product.weight.toString(),
            width: product.width.toString(),
            height: product.height.toString(),
            length: product.length.toString(),
            description: product.description.toString(),
            image: {
              create: {
                path: faker.image.urlPicsumPhotos()
              },
            },
            supplier_pf_product: {
              create: {
                id_supplier_pf: index
              }
            }
          },
        })
      );
    }
    else {
      products.push(
   
        connectionDb.product.create({
          data: {
            name,
            supplier_name,
            serie_number,
            barcode,
            amount,
            cost_value: product.cost_value.toString(),
            weight: product.weight.toString(),
            width: product.width.toString(),
            height: product.height.toString(),
            length: product.length.toString(),
            description: product.description.toString(),
            image: {
              create: {
                path: faker.image.urlPicsumPhotos()
              },
            },
            supplier_pj_product: {
              create: {
                id_supplier_pj: index
              }
            }
          },
        })
      );
    }
console.log(index);


  }

  await connectionDb.$transaction(products);
  console.log("100 registros criados com sucesso!");
}

// // async function client() {
// //   const record = [];

// //   for (let i = 1; i <= 100; i++) {
// //     record.push(
// //       connectionDb.client.create({
// //         data: {
// //           cnpj: faker.string.numeric(14),
// //           situation: faker.datatype.boolean(),
// //           branch_activity: faker.person.jobArea(),
// //           state_registration: faker.string.numeric(9),
// //           fantasy_name: faker.company.name(),
// //           corporate_reason: faker.company.name(),
// //           type_contribuition: faker.company.name(),
// //           accounting_contact: {
// //             create: {
// //               sector: {
// //                 create: {
// //                   name: faker.person.fullName(),
// //                   phone: faker.string.numeric(10),
// //                   cell_phone: faker.string.numeric(8),
// //                   cpf: faker.string.numeric(11),
// //                   email: faker.internet.email(),
// //                   rg: faker.string.numeric(7),
// //                   accounting_contact_image: {
// //                     create: { image: { create: { path: faker.image.url() } } },
// //                   },
// //                 },
// //               },
// //             },
// //           },
// //           owner_partner: {
// //             create: {
// //               sector: {
// //                 create: {
// //                   name: faker.person.fullName(),
// //                   phone: faker.string.numeric(10),
// //                   cell_phone: faker.string.numeric(8),
// //                   cpf: faker.string.numeric(11),
// //                   email: faker.internet.email(),
// //                   rg: faker.string.numeric(7),
// //                   owner_partner_image: {
// //                     create: { image: { create: { path: faker.image.url() } } },
// //                   },
// //                 },
// //               },
// //             },
// //           },
// //           commercial_contact: {
// //             create: {
// //               sector: {
// //                 create: {
// //                   name: faker.person.fullName(),
// //                   phone: faker.string.numeric(10),
// //                   cell_phone: faker.string.numeric(8),
// //                   cpf: faker.string.numeric(11),
// //                   email: faker.internet.email(),
// //                   rg: faker.string.numeric(7),
// //                   commercial_image: {
// //                     create: { image: { create: { path: faker.image.url() } } },
// //                   },
// //                 },
// //               },
// //             },
// //           },
// //           delivery_address: {
// //             create: {
// //               adress: {
// //                 create: {
// //                   cep: faker.location.zipCode("########"),
// //                   street: faker.location.street(),
// //                   number: faker.string.numeric(3),
// //                   complement: faker.location.secondaryAddress(),
// //                   city: faker.location.city(),
// //                   neighborhood: faker.location.county(),
// //                 },
// //               },
// //             },
// //           },
// //           financinal_contact: {
// //             create: {
// //               sector: {
// //                 create: {
// //                   name: faker.person.fullName(),
// //                   phone: faker.string.numeric(10),
// //                   cell_phone: faker.string.numeric(8),
// //                   cpf: faker.string.numeric(11),
// //                   email: faker.internet.email(),
// //                   rg: faker.string.numeric(7),
// //                   financial_image: {
// //                     create: { image: { create: { path: faker.image.url() } } },
// //                   },
// //                 },
// //               },
// //             },
// //           },
// //           image_company: {
// //             create: { image: { create: { path: faker.image.url() } } },
// //           },
// //           company_address: {
// //             create: {
// //               adress: {
// //                 create: {
// //                   cep: faker.location.zipCode("########"),
// //                   street: faker.location.street(),
// //                   number: faker.string.numeric(3),
// //                   complement: faker.location.secondaryAddress(),
// //                   city: faker.location.city(),
// //                   neighborhood: faker.location.county(),
// //                 },
// //               },
// //             },
// //           },
// //         },
// //       })
// //     );
// //   }
// //   await connectionDb.$transaction(record);
// //   console.log("100 registros criados com sucesso! de clientes");
// // }

// main()
async function pj() {
  try {
    const record = [];
    for (let i = 0; i < 50; i++) {
      const { id } = await connectionDb.imagem.create({
        data: { path: faker.image.url() },
        select: { id: true },
      });
      record.push(
        connectionDb.supplier_pj.create({
          data: {
            answerable: faker.person.firstName("female"),
            cnpj: faker.string.numeric(14),
            corporate_reason: faker.commerce.productMaterial(),
            id_imagem: id,
            email: faker.internet.email(),
            fantasy_name: faker.company.name(),
            municipal_registration: faker.string.numeric(8),
            type_contribuition: faker.person.jobType(),
            phone: faker.phone.number(),
            suframa_registration: faker.book.publisher(),
            supplier_pj_address: {
              create: {
                address: {
                  create: {
                    cep: faker.string.numeric(8),
                    city: faker.location.city(),
                    complement: "house",
                    neighborhood: faker.location.street(),
                    number: faker.location.buildingNumber(),
                    state: faker.location.state(),
                  },
                },
              },
            },
          },
        })
      );
    }
    await connectionDb.$transaction(record);
  } catch (error) {
    console.error(error);
  }
}
// pj()
//   .then(async () => {
//     await connectionDb.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await connectionDb.$disconnect();
//     process.exit(1);
//   });
// client()

//   .then(async () => {
//     await connectionDb.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await connectionDb.$disconnect();
//     process.exit(1);
//   });
// client().then(async () => {
//   await connectionDb.$disconnect();
// });

// async function main() {
//   const records = [];

//   for (let i = 1; i <= 100; i++) {
//     const birthDate = faker.date.past({ years: 50 }); // Gera uma data de nascimento aleatória

//     records.push(
//       connectionDb.supplier_pf.create({
//         data: {
//           supplier_name: faker.company.name(),
//           supplier_code: faker.string.numeric(4), // Substitui faker.random.numeric
//           cpf: faker.string.numeric(11), // Substitui faker.random.numeric
//           email: faker.internet.email(),
//           rg: faker.string.numeric(9), // Substitui faker.random.numeric
//           birth_date: birthDate,
//           phone: "85912345678",
//           supplier_imagem: {
//             create: {
//               supplier_pf_image: {
//                 create: {
//                   path: faker.image.url(),
//                 },
//               },
//             },
//           },

//           address_supplier_pf: {
//             create: {
//               address: {
//                 create: {
//                   cep: faker.location.zipCode("########"), // Atualizado para faker.location
//                   street: faker.location.street(),
//                   number: faker.string.numeric(3),
//                   complement: faker.location.secondaryAddress(),
//                   city: faker.location.city(),
//                   neighborhood: faker.location.county(),
//                 },
//               },
//             },
//           },
//         },
//       })
//     );
//   }

//   await connectionDb.$transaction(records);
//   console.log("100 registros criados com sucesso!");
// }

// async function client() {
//   const record = [];

//   for (let i = 1; i <= 100; i++) {
//     record.push(
//       connectionDb.client.create({
//         data: {
//           cnpj: faker.string.numeric(14),
//           situation: faker.datatype.boolean(),
//           branch_activity: faker.person.jobArea(),
//           state_registration: faker.string.numeric(9),
//           fantasy_name: faker.company.name(),
//           corporate_reason: faker.company.name(),
//           type_contribuition: faker.company.name(),
//           accounting_contact: {
//             create: {
//               sector: {
//                 create: {
//                   name: faker.person.fullName(),
//                   phone: faker.string.numeric(10),
//                   cell_phone: faker.string.numeric(8),
//                   cpf: faker.string.numeric(11),
//                   email: faker.internet.email(),
//                   rg: faker.string.numeric(7),
//                   accounting_contact_image: {
//                     create: { image: { create: { path: faker.image.url() } } },
//                   },
//                 },
//               },
//             },
//           },
//           owner_partner: {
//             create: {
//               sector: {
//                 create: {
//                   name: faker.person.fullName(),
//                   phone: faker.string.numeric(10),
//                   cell_phone: faker.string.numeric(8),
//                   cpf: faker.string.numeric(11),
//                   email: faker.internet.email(),
//                   rg: faker.string.numeric(7),
//                   owner_partner_image: {
//                     create: { image: { create: { path: faker.image.url() } } },
//                   },
//                 },
//               },
//             },
//           },
//           commercial_contact: {
//             create: {
//               sector: {
//                 create: {
//                   name: faker.person.fullName(),
//                   phone: faker.string.numeric(10),
//                   cell_phone: faker.string.numeric(8),
//                   cpf: faker.string.numeric(11),
//                   email: faker.internet.email(),
//                   rg: faker.string.numeric(7),
//                   commercial_image: {
//                     create: { image: { create: { path: faker.image.url() } } },
//                   },
//                 },
//               },
//             },
//           },
//           delivery_address: {
//             create: {
//               adress: {
//                 create: {
//                   cep: faker.location.zipCode("########"),
//                   street: faker.location.street(),
//                   number: faker.string.numeric(3),
//                   complement: faker.location.secondaryAddress(),
//                   city: faker.location.city(),
//                   neighborhood: faker.location.county(),
//                 },
//               },
//             },
//           },
//           financinal_contact: {
//             create: {
//               sector: {
//                 create: {
//                   name: faker.person.fullName(),
//                   phone: faker.string.numeric(10),
//                   cell_phone: faker.string.numeric(8),
//                   cpf: faker.string.numeric(11),
//                   email: faker.internet.email(),
//                   rg: faker.string.numeric(7),
//                   financial_image: {
//                     create: { image: { create: { path: faker.image.url() } } },
//                   },
//                 },
//               },
//             },
//           },
//           image_company: {
//             create: { image: { create: { path: faker.image.url() } } },
//           },
//           company_address: {
//             create: {
//               adress: {
//                 create: {
//                   cep: faker.location.zipCode("########"),
//                   street: faker.location.street(),
//                   number: faker.string.numeric(3),
//                   complement: faker.location.secondaryAddress(),
//                   city: faker.location.city(),
//                   neighborhood: faker.location.county(),
//                 },
//               },
//             },
//           },
//         },
//       })
//     );
//   }
//   await connectionDb.$transaction(record);
//   console.log("100 registros criados com sucesso! de clientes");
// }
// main()
//   .then(async () => {
//     await connectionDb.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await connectionDb.$disconnect();
//     process.exit(1);
//   });
// client().then(async () => {
//   await connectionDb.$disconnect();
// });

// export default main;
 product_seed()
 .then(() => {
  console.log('Seeds de products executada com sucess');
  connectionDb.$disconnect()
  
 })
 .catch((err) => {
  console.log("Erro ao executar Seeds de product! \n" + err);
  
 })