////////////////
//Constants and Variables
////////////////
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

//Input information 
const $input = $('input[type="text"]')


const API_KEY1= ""
const BASE_URL1 = "https://www.mapquestapi.com/geocoding/v1/batch?&inFormat=kvp&outFormat=json&thumbMaps=false&maxResults=1&location="
const lat = ""
const long = ""

const API_KEY2= "324716fa-68fa-4c4d-8ae2-d6e384294662"
const BASE_URL2 =  "https://edmtrain.com/api/events?"
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

////////////////
// Pulldown and Search fields
////////////////
const changemenu = () => {
    const $pulldown = $("#pulldown :selected").val(); 
    console.log($pulldown)
}

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

function handleGetLatLon(loc) {
    loc.preventDefault();
    console.log($input)
    console.log($input.val())
    if ($("#pulldown :selected").val() == 3) {
        console.log("Location Received");
        fetch('https://www.mapquestapi.com/geocoding/v1/batch?&inFormat=kvp&outFormat=json&thumbMaps=false&maxResults=1&location=Camarillo CA&location=New York&location=Austin, TX&key=KEY')
    }
    handleGetData();
}

// Was attempting to use fetch, got it to work ^.^ s
function handleGetData(event) {
    console.log("Form Submitted");
    userInput = $input.val();
    fetch(`${BASE_URL2}locationIds=69&startDate=2021-09-14&client=${API_KEY2}`)
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
$('form').on('submit', handleGetLatLon)
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