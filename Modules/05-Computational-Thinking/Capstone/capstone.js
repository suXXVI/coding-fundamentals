function getDays(startDate, endDate) {
    let start = startDate;
    let end = endDate;

    let days = endDate - startDate;
    let daysBetween = Math.floor(days / (1000 * 60 * 60 *24))

    return daysBetween
}

let result = getDays(
    new Date("June 14, 2019"),
    new Date("June 20, 2019")
)
console.log(result);