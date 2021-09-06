////////////////
//Constants and Variables
////////////////
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
const $artistList = $('#artistList')

const API_KEY = ""
const BASE_URL =  "https://edmtrain.com/api/events?"
const lat = ""
const long = ""
const NEAR_EVENT=  `latitude=${lat}&longitude=${long}`

////////////////
//Hidden elements
////////////////
$('#hiddenArtists').hide()
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


////////////////
// Functions
////////////////
//string uppercase
const capitalize = (string) =>{
    return string[0].toUpperCase() + string.substring(1)
}
//replace space with + in case needed in search
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

////////////////
// API Call
////////////////
// ${BASE_URL}location${$input.val()}&client=${API_KEY}

// Was attempting to use fetch, got it to work ^.^ s
function handleGetData(event) {
    event.preventDefault();
    console.log("Form Submitted");
    userInput = $input.val();
    fetch(``)
        .then((response => {
            return response.json();
        }))
        .then(function(data) { 
            let edm = data.data
            console.log(edm) 

// Artist list appended at bottom in ul
            return edm.map(function(edm) {
                for (let art of edm.artistList){
                    let li = $('<li>')
                    let span = $('<span>')
                    span.html(`${art.name} at ${edm.venue.name} on ${edm.date}`)
                    li.append(span)
                    // cant believe this worked! but wanted to grab all unique names from query to populate the artists column at the bottom
                    if(!($('ul').text().indexOf(art.name) !== -1)) {
                        $('#artistList').append(li)}}})       
        })
    .catch(function(error) {
        console.log('bad request: ', error);
    })
}

    
$("#btnArt").on('click', () => {$('#hiddenArtists').toggle()})
$('form').on('submit', handleGetData)
    ////////////////
    //Keeping in case fetch fails
    //Stop trying to make fetch a thing!
    ///////////////
    // function handleGetData(event){
    //     event.preventDefault();
    //     console.log("Form Submitted");
    //     userInput = $input.val();
    //     $.ajax({
    //         url: ``
    //         // url: `${BASE_URL}location${$input.val()}&client=${API_KEY}`
    //         }).then(
    //             function(data){
    //             console.log(data);
    //             },
    //             function(error){
    //             console.log('bad request: ', error);
    //             });
    // }