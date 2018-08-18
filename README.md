# LIRI Node App
Homework #8

### About The Project
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data. This project uses Node-Spotify-API, Request npm, Moment npm, DotEnv npm, OMDB API, and Bands In Town API.

### How To Play
Go to the command line and enter these parameters:

```
node liri.js concert-this <enter-band-name>
```
This will return:
* Name of venue
* Venue location
* Date of event (MM/DD/YYYY)

```
node liri.js spotify-this-song <enter-song-name>
```
This will return:
* Song name
* Artist name
* Album
* Preview link

Note: If no song name is entered, this function will automatically return the results for "The Sign" by Ace of Base.

```
node liri.js movie-this <enter-movie-name>
```
This will return:
* Movie title
* Release year
* IMDB Rating
* Rotten Tomatoes Rating
* Country
* Language
* Plot
* Actors

Note: If no movie name is entered, this function will automatically return the results for "Mr. Nobody."

```
node liri.js do-what-it-says
```
This will read a file called random.txt, grab the parameters from it, and complete one of the three functions above. By default, random.txt includes parameters to run the spotify-this-song function with "I Want It That Way."

Enjoy!