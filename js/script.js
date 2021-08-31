//Constants and Variables


const API_KEY = ""
const BASE_URL =  ""

//Cached Elements References


// Functions

//string uppercase
const capitalize = (string) =>{
    return string[0].toUpperCase() + string.substring(1)
}

//replace space with +
let test = "this test"
let replace = test.replace(/\s/g ,'+')

const timePSD = (epoch) => {
    let time = epoch * 1000
    let curDate = new Date(time)
    var pstDate = curDate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
    let parseTime = (pstDate.split(', ')[1] + " PST")
    return parseTime
}
// console.log(timePSD(1629939676))

