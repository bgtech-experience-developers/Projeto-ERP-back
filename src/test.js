// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// const insert = await prisma.adm.create({
//     data: {
//         cnpj: "12345678911111",
//         password: "1233",
//         role_adm: {
//             create: [
//                 {role: {connect: {id: 1}}}
//             ]
//     }
// }})

// console.log(insert);

import sanitize from "sanitize-html";
const removeHtmlTags = (input )  => {
    return sanitize(input, {
      allowedTags: [],  // Não permite nenhuma tag
      allowedAttributes: {},  // Não permite nenhum atributo
    });
  };


  const rsult = removeHtmlTags("<p>alert('XSS Attack!');</p>John Doe");
  console.log(rsult);
  