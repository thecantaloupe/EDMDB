let edm ="";
////////////////
//Constants and Variables
////////////////
const $name = $('#name')
const $ages = $('#ages')
const $location = $('#location')
const $address = $('#address')
const $state = $('#state')
const $date = $('#date')
const $link = $('#link')
const $latitude = $('#latitude')
const $longitude = $('#longitude')
const $artistList = $('#artistList')
//Input information 
const $input = $('input[type="text"]')
const $inputaddr1 = $('input[type="text"][name="address1[]"]')
const $inputaddr2 = $('input[type="text"][name="address2[]"]')
const $city1 = $('input[type="text"][name="city1[]"]')
const $state1 = $('input[type="text"][name="state1[]"]')
const $startdate1 = $('input[type="date"][name="start1[]"]')
const $eventname = $('input[type="text"][name="eventname[]"]')
//checkbox
let VIRTUAL1 = "false"
let VIRTUAL3 = "false"
//pulldowns
let $pulldown = $("#pulldown :selected").val()
let $pulldown2 = $("#pulldown2 :selected").val()
let keeper = ""
//Default Data
$('#date1').val(new Date().toISOString().slice(0, 10));
//Location ID init
let LOCID = ""


const API_KEY1= ""
const BASE_URL1 = "https://www.mapquestapi.com/geocoding/v1/batch?&inFormat=kvp&outFormat=json&thumbMaps=false&maxResults=1&location="
const BASE_URL1_reverse ="https://www.mapquestapi.com/geocoding/v1/reverse?"
let LAT1 = ""
let LON1 = ""
let LAT2 = ""
let LON2 = ""



const API_KEY2= ""
const BASE_URL2 =  "https://edmtrain.com/api/events?"
const BASE_URL2LOC =  "https://edmtrain.com/api/locations?"
let FULL_URL = ``
let LOC_URL = ``
let STATE= ""

const urlbuild = () => {
    VIRTUAL1 = $("#incVirtual1").is(":checked")
    VIRTUAL3 = $("#incVirtual3").is(":checked")

    if ($("#pulldown :selected").val() == 1) {
        //get loc id
        let cityI = `city=${$city1.val()}`
        let stateI = `state=${$state1.val()}`

        let BUILDURL = ""
        let locID = `&locationIds=${LOCID}`
        let starD = `&startDate=${$startdate1.val()}`
        let eventN = `&eventName=${$eventname.val()}`
        if ($city1.val() !== '' && $state1.val() !== '') {BUILDURL += locID}
        if ($startdate1.val() != "") {BUILDURL += starD}
        if ($eventname.val() != "") {BUILDURL += eventN}
        FULL_URL = `${BASE_URL2}livestreamInd=${VIRTUAL1}${BUILDURL}&client=${API_KEY2}`
        console.log(FULL_URL)
    } if (($("#pulldown :selected").val() == 3)) {
        if ($inputaddr1.val() == 0 || $inputaddr2.val() == 0){
            alert("Please Fill in all Fields")
        }
        FULL_URL = `${BASE_URL2}livestreamInd=${VIRTUAL3}&latitude=${aveLat}&longitude=${aveLon}&state=${STATE}&client=${API_KEY2}`
        console.log(FULL_URL)
    }

}

// Locations API.
// locations?state=Nevada&city=Las%20Vegas&client=

//locations API
// state city
// need to get id via data.data[0].id and save to variable
// this variable will be fed into search for 1


//if 1 use this
// eventName   startDate  locationIds



////////////////
//Hidden elements
////////////////
$('#hiddenArtists').hide()
$('#Menu2').hide()
$('#Menu3').hide()


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

// conver epoch to psd
const timePSD = (epoch) => {
    let time = epoch * 1000
    let curDate = new Date(time)
    var pstDate = curDate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
    let parseTime = (pstDate.split(', ')[1] + " PST")
    return parseTime
}
// console.log(timePSD(1629939676))

//Get average lat and lon
let aveLat = ""
let aveLon = ""
const latlonMath = () =>{
    aveLat = (LAT1 + LAT2)/2
    aveLon = (0 - (Math.abs(LON1) + Math.abs(LON2))/2)
}


////////////////
// API Call
////////////////
const handleGetlocationID = () => {
    console.log("LocationID form Submitted")
    console.log(`${BASE_URL2LOC}state=${$state1.val()}&city=${replaceSpace($city1.val())}&client=${API_KEY2}`)
    fetch(`${BASE_URL2LOC}state=${$state1.val()}&city=${$city1.val()}&client=${API_KEY2}`)
        .then((response => {
            return response.json();
        }))
        .then(function(data) {
            LOCID = data.data[0].id
            console.log("locID="+LOCID)
            urlbuild()
        })
        .then(function(){
            handleGetData()
        })
        .catch(function(error) {
            console.log('bad request: ', error)
        })
}

// need to add reverse search for getting state from lat and lon
function handleGetLatLon(loc) {
    if ($("#pulldown :selected").val() == 3) {
        console.log("Location Received");
        ////////////////////
        // First fetch to obtain both lat and lons
        ////////////////////
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
                
                ////////////////////
                // After obtaining averaged lat and lon, obtain State to feel into edm train api
                ////////////////////
                fetch(`${BASE_URL1_reverse}key=${API_KEY1}&location=${aveLat}%2C${aveLon}&outFormat=json&thumbMaps=false`)
                .then((response => {
                    console.log(`${BASE_URL1_reverse}key=${API_KEY1}&location=${aveLat}%2C${aveLon}&outFormat=json&thumbMaps=false`)
                    return response.json();
                }))
                .then(function(data) {
                    let results = data.results
                    console.log(results)
                    shortstate = results[0].locations[0].adminArea3
                    STATE = state_obj[shortstate]
                    urlbuild()
                    handleGetData();
                })
            })
            
            .catch(function(error) {
                console.log('bad request: ', error)
            })
    }
}
var holding;
// Was attempting to use fetch, got it to work ^.^ s
function handleGetData() {
    console.log("Get Data Form Submitted");
    console.log(FULL_URL)
    fetch(`${FULL_URL}`)
        .then((response => {
            return response.json();
        }))
        .then(function(data) { 
            let edm = data.data
            console.log(edm) 
            holding = edm
            if (edm.length ==0) {
                $name.html('<h1>No Data for this location</h1>')
            }
            render(edm)
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

const labeler = (label) => {
    return '<label>'+label+':&emsp;</label>'
}

const render = (edm) => {
    //Main Details
    if (edm[0].artistList[0] == []){
        $name.html(labeler("Artist")+edm[0].artistList[0].name)
    } 
    $ages.html(labeler("Ages")+edm[0].ages)
    $location.html(labeler("Venue")+edm[0].venue.name)
    $address.html(labeler("Address")+edm[0].venue.address)
    $state.html(edm[0].venue.location)
    //Sub Details
    $date.html(labeler("Data")+edm[0].date)
    $link.html(labeler("Link to event")+edm[0].link)
    $link.attr("href",edm[0].link)
    //hide null els
    $('p').each(function() {
        if ($(this).text().split("null").length > 1)
        $(this).hide()
    })
}
    
$("#btnArt").on('click', () => {$('#hiddenArtists').show()})


const state_obj = {
        "AL": "Alabama",
        "AK": "Alaska",
        "AS": "American Samoa",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "District Of Columbia",
        "FM": "Federated States Of Micronesia",
        "FL": "Florida",
        "GA": "Georgia",
        "GU": "Guam",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MH": "Marshall Islands",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "MP": "Northern Mariana Islands",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PW": "Palau",
        "PA": "Pennsylvania",
        "PR": "Puerto Rico",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VI": "Virgin Islands",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    }

//click works but submit did not
$('#form').on('click', (event) => {
    $('#artistList').children().remove()
    event.preventDefault()
    handleGetlocationID()
})
$('#form3').on('click', (event) => {
    $('#artistList').children().remove()
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