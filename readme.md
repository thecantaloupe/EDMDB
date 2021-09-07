# Project 1 - EDMDB 
A simple web application that uses two databases to search for EDM and related event

*Created by Zachary Gomez*

----

## Technologies Explored

CSS | HTML5 | JavaScript | Jquery | EDM Train API | Mapquest API | Fetch 

----

## Highlights

- EDM API has three APIs
    - Event Search
    - Nearby events
    - Locations
- Since the event search API parses via unique IDs, the Location API must first be used if those parameters are to be used.
- Mapquest API is used to obtain latitude and longitude of searched addressed and the averaged latlon returns the state or those coordinates. The state is passed as a parameter to the EDM API.
- Finally, as the API can return hundreds of entries, a toggleable list was added to view all unique artists up to 100.

## Main Features

----

- Two ways to search through the database
    1. Search events through a combination of Event name, start date, City ,and State
    2. Enter two Addresses and obtain the events closest to the latlon mean of both locations. A meet me halfway. The same address can be passes to return events closes to that address.
- Hidden related artists with a dropdown that filters how many related artists are shown.

## Wireframe

---
![Wireframe](/images/wireframe.png)