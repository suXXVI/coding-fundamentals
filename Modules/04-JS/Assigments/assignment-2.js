function calculateAge(date) {
    const [day, month, year] = date.split("/").map(Number);
    const today = new Date();
    const thisYear = today.getFullYear();
    const age = thisYear - year;

    if (today.getMonth() < month - 1 || today.getDate() < day -1 && today.getFullYear < year -1) {
        return age -1;
    } else {
        return age;
    }
}
  

console.log(calculateAge("20/7/2002"))
console.log(calculateAge("1/1/1979"))