const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // months are zero-indexed, so we add 1
const day = today.getDate();

console.log(`${year}/${month}/${day}`);

const d = new Date();
const y = d.getMonth() + 1;
let inputDate = d.getFullYear() + '/' + y + '/' + d.getDate()

