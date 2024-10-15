let data = "2005-02-19";

const date = new Date(`${data}T00:00:00Z`);
const data1 = "10-10-2005";
const regex = /[./-/]/gi;
const dataorgi = data1.replace(regex, "-").split("-").reverse().join("-");
console.log(dataorgi);
