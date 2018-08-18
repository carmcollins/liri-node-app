// SETUP

require("dotenv").config();

var request = require("request");

var keys = require("./keys.js");

var moment = require("moment");

var bandsInTownKey = keys.bandsInTown.id;

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var omdbKey = keys.omdb.id;

var fs = require("fs");

var action = process.argv[2];

var userInput = "";
    for (var i = 3; i < process.argv.length; i++) {
        userInput += " " + process.argv[i]
    };

// FUNCTIONS

function concertThis() {

    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=" + bandsInTownKey;
    
    request(queryURL, function(error, response, body) {

        if (error) {
            return console.log("Error occurred: " + error);
        } else {
            for (var i = 0; i < body.length; i++) {
                var venue = JSON.parse(body)[i].venue.name;
                var city = JSON.parse(body)[i].venue.city;
                var date = moment(JSON.parse(body)[i].datetime).format("MM/DD/YYYY");

                console.log("====================");
                console.log("Venue: " + venue);
                console.log("City: " + city);
                console.log("Date: " + date);
                // getting an error after the last item in the list for some reason?
                // this was working but now it's not???
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

// works with one word movies, but not movies with multiple words
function movieThis() {

    if (!userInput) {
        var queryURL = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=" + omdbKey;
    } else {
        var queryURL = "https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=" + omdbKey;
        console.log(queryURL);
    }

    request(queryURL, function(error, response, body) {
        if (error) {
            return console.log("Error occurred: " + error);
        } else {
            var title = JSON.parse(body).Title;
            var year = JSON.parse(body).Year;
            var imdbRating = JSON.parse(body).imdbRating;
            var rottenTomatoesRating = JSON.parse(body).Ratings[1].Value;
            var country = JSON.parse(body).Country;
            var language = JSON.parse(body).Language;
            var plot = JSON.parse(body).Plot;
            var actors = JSON.parse(body).Actors;
            
            console.log("====================");
            console.log("Movie Title: " + title);
            console.log("Year Released: " + year);
            console.log("IMDB Rating: " + imdbRating);
            console.log("Rotten Tomatoes Rating: " + rottenTomatoesRating);
            console.log("Country: " + country);
            console.log("Language: " + language);
            console.log("Plot: " + plot);
            console.log("Actors: " + actors);
            console.log("====================");
        }
    });
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            return console.log("Error occurred: " + error);
        } else {
            var items = data.split(",");

            var itemsArr = [];
    
            for (i = 0; i < items.length; i++) {
                itemsArr.push(items[i].trim());
            };

            action = itemsArr[0];

            userInput = itemsArr[1];

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
                default:
                    console.log("What?! That's not a command!");
                    break;
            };
        }
    });
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