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
let date = new Date().toISOString().slice(0, 10)
//Input information 
const $input = $('input[type="text"]')
const $inputstate = $('input[type="text"][name="state[]"]')
const $inputaddr1 = $('input[type="text"][name="address1[]"]')
const $inputaddr2 = $('input[type="text"][name="address2[]"]')
//pulldowns
let $pulldown = $("#pulldown :selected").val()
let $pulldown2 = $("#pulldown2 :selected").val()
let keeper = ""


const API_KEY1= "xwR7tnAX2l7iC88Z7ZeiVlQJW9d0jNwC"
const BASE_URL1 = "https://www.mapquestapi.com/geocoding/v1/batch?&inFormat=kvp&outFormat=json&thumbMaps=false&maxResults=1&location="
const BASE_URL1_reverse ="https://www.mapquestapi.com/geocoding/v1/reverse?"
let LAT1 = ""
let LON1 = ""
let LAT2 = ""
let LON2 = ""

const API_KEY2= "324716fa-68fa-4c4d-8ae2-d6e384294662"
const BASE_URL2 =  "https://edmtrain.com/api/events?"


//nearby events api
// const NEAR_EVENT=  `latitude=${lat}&longitude=${long}`
let STATE= ""

const urlbuild = () => {
    if ($inputstate.val() != '') {
        STATE = `state=${$inputstate.val()}`
    }
}



// for location search you need latitude longitude and state
////////////////
//Hidden elements
////////////////
$('#hiddenArtists').hide()
$('#Menu2').hide()
$('#Menu3').hide()
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
    $pulldown = $("#pulldown :selected").val(); 
    if ($("#pulldown :selected").val() == 2) {
        $('#Menu1').hide()
        $('#Menu2').show()
        $('#Menu3').hide()
    } if (($("#pulldown :selected").val() == 3)) {
        $('#Menu1').hide()
        $('#Menu2').hide()
        $('#Menu3').show()
    } if (($("#pulldown :selected").val() == 1)) {
        $('#Menu1').show()
        $('#Menu2').hide()
        $('#Menu3').hide()
    }
}
const moreartists = () => {
    $pulldown2 = $("#pulldown2 :selected").val()
    $('#artistList').children().remove()
    $('#artistList').append(keeper)
    let less100 = 100 - keeper.length
    let quickmaths =  100 - less100 - $pulldown2
    for (let i=0; i < quickmaths;i++){
        $('#artistList').children().last().remove()
    }
}

////////////////
// Functions
////////////////
//string uppercase
const capitalize = (string) =>{
    return string[0].toUpperCase() + string.substring(1)
}
//replace space with + in case needed in search

const replaceSpace = (word) => {
    return word.replace(/\s/g ,'+')
}

const timePSD = (epoch) => {
    let time = epoch * 1000
    let curDate = new Date(time)
    var pstDate = curDate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
    let parseTime = (pstDate.split(', ')[1] + " PST")
    return parseTime
}
// console.log(timePSD(1629939676))
let aveLat = ""
let aveLon = ""
const latlonMath = () =>{
    aveLat = (LAT1 + LAT2)/2
    aveLon = (0 - (Math.abs(LON1) + Math.abs(LON2))/2)
}


////////////////
// API Call
////////////////

// need to add reverse search for getting state from lat and lon
function handleGetLatLon(loc) {
    urlbuild()
    if ($("#pulldown :selected").val() == 3) {
        console.log("Location Received");
        console.log(`${BASE_URL1}${$inputaddr1.val()}&location=${$inputaddr2.val()}&key=${API_KEY1}`)
        fetch(`${BASE_URL1}${$inputaddr1.val()}&location=${$inputaddr2.val()}&key=${API_KEY1}`)
            .then((response => {
                return response.json();
            }))
            .then(function(data) {
                let results = data.results
                console.log(results)
                LAT1 = results[0].locations[0].latLng.lat
                LON1 = results[0].locations[0].latLng.lng
                LAT2 = results[1].locations[0].latLng.lat
                LON2 = results[1].locations[0].latLng.lng
                latlonMath()
                
            })
            .then(fetch(`${BASE_URL1}${$inputaddr1.val()}&location=${$inputaddr2.val()}&key=${API_KEY1}`)
                .then((response => {
                    return response.json();
                }))
                .then(function(data) {
                    let results = data.results
                    console.log(results)
                    STATE = results[0].locations[0].adminArea3
                    handleGetData();
                })
                )
            .catch(function(error) {
                console.log('bad request: ', error)
            })
    }
}

// Was attempting to use fetch, got it to work ^.^ s
function handleGetData() {
    console.log("Form Submitted");
    userInput = $input.val();
    console.log(`${BASE_URL2}latitude=${LAT1}&longitude=${LON1}&state=${STATE}startDate=${date}&client=${API_KEY2}`)
    fetch(`${BASE_URL2}latitude=${LAT1}&longitude=${LON1}&state=${STATE}startDate=${date}&client=${API_KEY2}`)
    // fetch(`https://edmtrain.com/api/events?artistIds=195&client=324716fa-68fa-4c4d-8ae2-d6e384294662`)
        .then((response => {
            return response.json();
        }))
        .then(function(data) { 
            let edm = data.data
            console.log(edm) 

// Artist list appended at bottom in ul
            edm.map(function(edm) {
                for (let art of edm.artistList){
                    let li = $('<li>')
                    let ahref = $('<a>')
                    ahref.attr('href',edm.link)
                    ahref.text(`${art.name} at ${edm.venue.name} on ${edm.date}`)
                    // ahref.append(ahref)
                    li.append(ahref)
                    // cant believe this worked! but wanted to grab all unique names from query to populate the artists column at the bottom
                    if(!($('ul').text().indexOf(art.name) !== -1) && $('ul li').length < 100) {
                        $('#artistList').append(li)}}})  
            keeper = $('#artistList').children()
            moreartists()  
        })
    .catch(function(error) {
        console.log('bad request: ', error);
    })
}

    
$("#btnArt").on('click', () => {$('#hiddenArtists').show()})


// $('form').on('submit', () => {testfun()})
// const testfun = () => {
//     if ($pulldown ==3) {
//         handleGetLatLon
//     } else {
//         handleGetData
//         console.log("tried2")
//     }
// }

//click works but sumbit did not
$('#form').on('click', (event) => {
    event.preventDefault()
    handleGetData()
})
$('#form3').on('click', (event) => {
    event.preventDefault()
    handleGetLatLon()
})
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