import { log } from "console";
import { InstanciaPrisma } from "./db/PrismaClient.js";
import { faker } from "@faker-js/faker"; // Biblioteca para gerar dados aleatórios

const connectionDb = InstanciaPrisma.GetConnection();

// async function main() {
//     const data = new Date()
//     data.getDate()
//     console.log(data);
    
//     const supplier_pf_01 = await connectionDb.$transaction([
//         connectionDb.supplier_pf.create({
//             data: {
//                 supplier_name: 'Fabio Construções',
//                 supplier_code: '1987',
//                 cpf: "62117987388",
//                 email: "fabiocontruções@email.com",
//                 rg: "123456789",
//                 birth_date: data,
//                 phone: "85912345678",
//                 supplier_imagem: {
//                     create: {
//                         supplier_pf_image: {
//                             create: {
//                                 path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMRDgoyxZa15Jg0bZ1OhJzcXQ0EUHZEvCakw&s"
//                             }
//                         }
//                     }
//                 },
//                 product_supplier_pf: {
//                     create: {
//                         product: {
//                             create: {
//                                 name: "Trator",
//                                 internal_code: "321",
//                                 stock: 1
//                             }
//                         },
//                         price: "1000.00",
//                         delivery_time: "2 dias",
//                         purchase_tax: "10%"

//                     }
//                 },
//                 address_supplier_pf: {
//                     create: {
//                         address: {
//                             create: {
//                                 cep: "01001000",
//                                 street: "Praça da Sé",
//                                 number: "100",
//                                 complement: "Apto 21",
//                                 city: "São Paulo",
//                                 neighborhood: "Sé",
//                             }
//                         }
//                     }
//                 }
//             }
//         })
//     ])
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

async function main() {
    const records = [];

    for (let i = 1; i <= 100; i++) {
            const birthDate = faker.date.past({years: 50}); // Gera uma data de nascimento aleatória

        records.push(
            connectionDb.supplier_pf.create({
                data: {
                    supplier_name: faker.company.name(),
                    supplier_code: faker.string.numeric(4), // Substitui faker.random.numeric
                    cpf: faker.string.numeric(11), // Substitui faker.random.numeric
                    email: faker.internet.email(),
                    rg: faker.string.numeric(9), // Substitui faker.random.numeric
                    birth_date: birthDate,
                    phone: "85912345678",
                    supplier_imagem: {
                        create: {
                            supplier_pf_image: {
                                create: {
                                    path: faker.image.url(),
                                },
                            },
                        },
                    },
                    product_supplier_pf: {
                        create: {
                            product: {
                                create: {
                                    name: faker.commerce.productName(),
                                    internal_code: faker.string.numeric(3), // Substitui faker.random.numeric
                                    stock: faker.number.int({ min: 1, max: 100 }), // Substitui faker.datatype.number
                                },
                            },
                            price: faker.commerce.price({ min: 100, max: 1000, dec: 2 }), // Substitui parâmetros manuais
                            delivery_time: `${faker.number.int({ min: 1, max: 10 })} dias`,
                            purchase_tax: `${faker.number.int({ min: 1, max: 20 })}%`,
                        },
                    },
                    address_supplier_pf: {
                        create: {
                            address: {
                                create: {
                                    cep: faker.location.zipCode("########"), // Atualizado para faker.location
                                    street: faker.location.street(),
                                    number: faker.string.numeric(3),
                                    complement: faker.location.secondaryAddress(),
                                    city: faker.location.city(),
                                    neighborhood: faker.location.county(),
                                },
                            },
                        },
                    },
                },
            })
        );
    }

    await connectionDb.$transaction(records);
    console.log("100 registros criados com sucesso!");
}

main()
.then(async () => {
    await connectionDb.$disconnect()
})
.catch(async (e) =>{
    console.error(e)
    await connectionDb.$disconnect()
    process.exit(1)
})

export default main