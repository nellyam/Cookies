const today = new Date();
const nextWeek = new Date(today.getTime() +  7 * 24 * 60 * 60 * 1000);
let day = ('0' + nextWeek).slice(9, 11);
let month = ('0' +(today.getMonth() + 1)).slice(-2);
let year = today.getFullYear();

document.querySelector("input[type='date']").value = `${year}-${month}-${day}`;
console.log(day);