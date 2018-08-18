// SETUP

require("dotenv").config();

var request = require("request");

var keys = require("./keys.js");

var moment = require("moment");

var bandsInTown = keys.bandsInTown.id;

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var action = process.argv[2];

var userInput = "";
    for (var i = 3; i < process.argv.length; i++) {
        userInput += " " + process.argv[i]
    };

// FUNCTIONS

function concertThis() {

    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=" + bandsInTown;
    
    request(queryURL, function(error, response, body) {

        if (error) {
            return console.log("Error occurred: " + error);
        } else {
            for (var i = 0; i < body.length; i++) {
                var venue = JSON.parse(body)[i].venue.name;
                var city = JSON.parse(body)[i].venue.city;
                var date = moment(JSON.parse(body)[i].datetime).format("MM/DD/YYYY");

                console.log("====================");
                console.log(userInput + " is playing at " + venue + " in " + city + " on " + date);
                // getting an error after the last item in the list for some reason?
            }
        }
    });
};

function spotifyThisSong() {

    if (!userInput) {
        spotify.search({
            type: "track",
            query: "The Sign"
        }, function(error, data){
            if (error) {
                return console.log("Error occurred: " + error);
            } else {
                var artist = data.tracks.items[5].artists[0].name;
                var song = data.tracks.items[5].name;
                var album = data.tracks.items[5].album.name;
                var preview = data.tracks.items[5].preview_url;

                console.log("====================");
                console.log("Song: " + song);
                console.log("Artist: " + artist);
                console.log("Album: " + album);
                console.log("Listen: " + preview);
                console.log("====================");
            }
        });
    } else {
        spotify.search({
            type: "track",
            query: userInput
        }, function(error, data){
            if (error) {
                return console.log("Error occurred: " + error);
            } else {
                var artist = data.tracks.items[0].artists[0].name;
                var song = data.tracks.items[0].name;
                var album = data.tracks.items[0].album.name;
                var preview = data.tracks.items[0].preview_url;

                console.log("====================");
                console.log("Song: " + song);
                console.log("Artist: " + artist);
                console.log("Album: " + album);
                console.log("Listen: " + preview);
                console.log("====================");
            }
        });
    }
};

function movieThis() {

};
function doWhatItSays() {

};

// CALLS

switch(action){
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("What?! That's not a command!");
        break;
};