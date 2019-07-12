
require("dotenv").config();
var request = require("request");
var moment = require('moment');
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var omdb = (omdb);
var bandsintown = (bandsintown);

var userInput = process.argv[2];
var userSearch = process.argv.slice(3).join(" ");



function userCommand(userInput, userSearch) {
    
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            getSpotify();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doThis(userSearch);
            break;
        
    }
}



    

userCommand(userInput, userSearch);

function concertThis() {
   
    
    request("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=" + bandsintown, function (error, response, body) {
       
        if (!error && response.statusCode === 200) {
          
            let userBand = JSON.parse(body);
           
            if (userBand.length > 0) {
                for (i = 0; i < 1; i++) {

                    
                    console.log(`\nSire, we have found the bands venue for you. Our spies did a good job:`);
                    console.log(`\nArtist: ${userBand[i].lineup[0]}`);
                    console.log(`\nVenue: ${userBand[i].venue.name}`);
                    console.log(`\nVenue City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`)

                   
                     var concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
                    console.log(`Date and Time: ${concertDate}\n\n`);
                };
            } else {
                console.log("Our spies could not find the bands venue");
            };
        };
    });
};


function getSpotify() {
    

     
    if (!userSearch) {
        userSearch = "Paint it Black";
    };

    
    spotify.search({
        type: 'track',
        query: userSearch,
        limit: 1
    }, function (error, data) {
        if (error) {
            return console.log('Our spies had encountered some trouble: ' + error);
        }
       
        let spotifyArray = data.tracks.items;

        for (i = 0; i < spotifyArray.length; i++) {
            console.log(`\nSire... This is the details for your spotify search from which our spies have uncovered:`);
            console.log(`\nArtist: ${data.tracks.items[i].album.artists[0].name} `);
            console.log(`\nSong: ${data.tracks.items[i].name}`);
            console.log(`\nAlbum: ${data.tracks.items[i].album.name}`);
            console.log(`\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n`);
        };
    });
}

function movieThis() {
    
    if (!userSearch) {
        userSearch = "Mr Nobody";
    };
    
    request("http://www.omdbapi.com/?t=" + userSearch + "&apikey=86fe999c", function (error, response, body) {
        let userMovie = JSON.parse(body);

       
        let ratingsArray = userMovie.Ratings;
        if (ratingsArray.length > 2) {}

        if (!error && response.statusCode === 200) {
            console.log(`\nSire, our spies were able to find the movie you wanted to search for:    `);
            console.log(`\n\nTitle: ${userMovie.Title}`);
            console.log(`\nCast: ${userMovie.Actors}`);
            console.log(`\nReleased: ${userMovie.Year}`);
            console.log(`\nIMDb Rating: ${userMovie.imdbRating}`);
            console.log(`\nRotten Tomatoes Rating: ${userMovie.Ratings[1].Value}`);
            console.log(`\nCountry: ${userMovie.Country}`);
            console.log(`\nLanguage: ${userMovie.Language}`);
            console.log(`\nPlot: ${userMovie.Plot}\n`);
        } else {
            return console.log("Our Spies could not find the movie that you have requested...." + error)
        };
    })
};
            
        

function doThis() {
   
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) 
        {
            return console.log(error);
        }
       
        let dataArray = data.split(",");

       
        userInput = dataArray[0];
        userSearch = dataArray[1];
        
        userCommand(userInput, userSearch);
    });
};