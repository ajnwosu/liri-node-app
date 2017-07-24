//store dependencies as variables.

var key = require( "./key.js" );

var Twitter = require( 'twitter' );

var Spotify = require( 'node-spotify-api' );

var omdb = require( 'omdb' );

var request = require( 'request' );

var fs = require( "fs" );

var argOne = process.argv[ 2 ];

console.log( argOne )

var argTwo = process.argv[ 3 ];

console.log( argTwo )




//--------------------Function for runnning Twitter-----------------------------------------------//

var client = new Twitter( {
  consumer_key: key.twitterKeys.consumer_key,
  consumer_secret: key.twitterKeys.consumer_secret,
  access_token_key: key.twitterKeys.access_token_key,
  access_token_secret: key.twitterKeys.access_token_secret
} );

var showTweets = function() {

  var params = {
    screen_name: 'AJBootcamp'
  };
  client.get( 'statuses/user_timeline', params, function( error, tweets, response ) {
    if ( !error ) {
      for ( i = 0; i < tweets.length; i++ ) {
        var returnedData = ( 'Number: ' + ( i + 1 ) + '\n' + tweets[ i ].created_at + '\n' + tweets[ i ].text + '\n' );
        console.log( returnedData );
        console.log( "-------------------------" );
      }
    };

  } );

}

// ------------    Function for runnning spotify search ------------------------------------------------------




var spotify = new Spotify( {
  id: "ed21cb8c36fa4c9ea1448f1b14cac15f",
  secret: "8ec41f8cb8944b0b9fa2226a96bdbab4"
} );

var spotifyInfo = function() {

  var songName = argTwo;

  if ( argTwo === undefined ) {
    songName = "What's My Age Again?";
  } else {
    songName = argTwo;
  }

  spotify.search( {
    type: 'track',
    query: songName
  }, function( err, data ) {
    if ( err ) {
      console.log( 'Error occurred: ' + err );
      return
    } else {
      // Logging the results to the console
      console.log( " " )
      console.log( "===== Spotify Search Results =====" )
      console.log( " " )
      console.log( "Song: " + data.tracks.items[ 0 ].name )
      console.log( "Album: " + data.tracks.items[ 0 ].album.name )

    }

  } );

}


// ------------------- Function for running a Movie Search --------------------------
var getMeMovie = function( movieName ) {
  if ( movieName === undefined ) {
    movieName = "Mr Nobody";
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=40e9cece"

  request( urlHit, function( error, response, body ) {
    if ( !error && response.statusCode === 200 ) {
      var jsonData = JSON.parse( body );

      console.log( "Title: " + jsonData.Title );
      console.log( "Year:" + jsonData.Year );
      console.log( "Rated: " + jsonData.Rated );
      console.log( "IMDB Rating: " + jsonData.imdbRating );
      console.log( "Country: " + jsonData.Country );
      console.log( "Language: " + jsonData.Language );
      console.log( "Plot: " + jsonData.Plot );
      console.log( "Actors: " + jsonData.Actors );
      console.log( "Rotton Tomatoes URL: " + jsonData.tomatoURL );
    }
  } );
};

// /////// Movie Variable

// omdb.search('saw', function(err, movies) {
//     if(err) {
//         return console.error(err);
//     }

//     if(movies.length < 1) {
//         return console.log('No movies were found!');
//     }

//     movies.forEach(function(movie) {
//         console.log('%s (%d)', movie.title, movie.year, );

//     });

//     // Saw (2004) 
//     // Saw II (2005) 
//     // Saw III (2006) 
//     // Saw IV (2007) 
//     // ... 
// });

// omdb.get({ title: 'Saw', year: 2004 }, true, function(err, movie) {
//     if(err) {
//         return console.error(err);
//     }

//     if(!movie) {
//         return console.log('Movie not found!');
//     }

//     console.log('%s (%d) %d/10', movie.title, movie.year, );
//     console.log('MOVIE RATING:' + movie.imdb.rating);
//     console.log("MOVIE PLOT" + movie.plot);

//     // Saw (2004) 7.6/10 
//     // Two men wake up at opposite sides of a dirty, disused bathroom, chained 
//     // by their ankles to pipes. Between them lies... 
// });




// This switch statement takes in the command the user inputs and runs the appropriate function
switch ( process.argv[ 2 ] ) {
  case 'tweets':
    showTweets();
    break;
  case 'spotify-this-song':
    spotifyInfo();
    break;
  case 'movie':
    getMeMovie( process.argv[ 3 ] );
    break;

  default:
    invalidCommand();
}