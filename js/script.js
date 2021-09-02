//Constants and Variables

const $input = $('input[type="text"]')
const $name = $('#name')
const $ages = $('#ages')
const $location = $('#location')
const $address = $('#address')
const $state = $('#state')
const $date = $('#date')
const $startTime = $('#startTime')
const $endTime = $('#endTime')
const $latitude = $('#latitude')
const $longitude = $('#longitude')
const $artistlist = $('#artistlist')

const API_KEY = ""
const BASE_URL =  "https://edmtrain.com/api/events?"
const lat = ""
const long = ""
const NEAR_EVENT=  `latitude=${lat}&longitude=${long}`

//Example API CAll - Event Search API.
// https://edmtrain.com/api/events?locationIds=36,94&client=324716fa-68fa-4c4d-8ae2-d6e384294662

// Nearby Events API. (will use with a button for find events near me)
// events?latitude=33.962&longitude=-118.358&state=California&client=

// Locations API.
// locations?state=Nevada&city=Las%20Vegas&client=

// API Errors.
// {
//     "data": [],
//     "message": "Location not found",
//     "success": false
//  }

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

// API Call
// ${BASE_URL}location${$input.val()}&client=${API_KEY}
// Was attempting to use fetch
function handleGetData(event) {
    event.preventDefault();
    console.log("Form Submitted");
    userInput = $input.val();
    fetch(`https://edmtrain.com/api/events?artistIds=195&client=324716fa-68fa-4c4d-8ae2-d6e384294662`)
        .then((response => {
            return response.json();
        }))
        .then(function(data) { 
            console.log(data);
            let edm = data.data
            console.log(edm)        
        })
    .catch(function(error) {
        console.log('bad request: ', error);
    })
    }

// function handleGetData(event){
//     event.preventDefault();
//     console.log("Form Submitted");
//     userInput = $input.val();
//     $.ajax({
//         url: `https://edmtrain.com/api/events?artistIds=195&client=324716fa-68fa-4c4d-8ae2-d6e384294662`
//         // url: `${BASE_URL}location${$input.val()}&client=${API_KEY}`
//         }).then(
//             function(data){
//             console.log(data);
//             },
//             function(error){
//             console.log('bad request: ', error);
//             });
// }





$('form').on('submit', handleGetData)