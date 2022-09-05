import React, { useState, useEffect } from "react";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";

function Algorithm (props) {

    const [totalPercentage, setTotal] = useState(0);

    var topTracks = [];
    var topArtists = [];
    var gdIndex = -1;
    var artistPercentage = 0;
    var songPercentage = 0;
    var relatedArtists = []; 
    var hasArtists = false;
    var hasTracks = false;
    const GD_SONGS_MULT = 8.51; //40/(sum of 1/x from 1 to 51)
    const REL_SONGS_MULT = 2.74; //10/(sum of 1/x from 1 to 51)
    const REL_ARTISTS_MULT = 2.213;//10/(sum of 1/x from 1 to 21)

    

    function callApi(method, url, body, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + props.accessToken);
        xhr.send(body);
        xhr.onload = callback;
    }

    //Component 1: Where the GD fall on their top artists list
    //Determines where the grateful dead fall in their top artists list
    function gdRanking(){
        topArtists.forEach((artist,index) => {
            console.log(artist);
            if (artist === "Grateful Dead") {
                console.log("in here");
                gdIndex = index;
            }
            console.log(gdIndex);
            return gdIndex;
        })
    }

    //Returns proper percentage (with a total weight of 40) of GD within top artists
    function gdRankingPercentage(ranking) {   //ranking param = gdIndex
        //if dead not w/in top 20 artists, they get no points
        if (ranking == -1) {
            return 0;
        } 
        console.log(ranking);
        var x = 0.4 - (ranking*0.02);
        console.log(x);
        artistPercentage+=x;
    }


    //Component 2: How many of their top tracks are by the GD
    function gdSongsPercentage() {
        //keep track of summated song inverses
        var fracTotal = 0;
        console.log(topTracks.length);              
        topTracks.forEach((song, index) => {
            if (song.artists[0].name == "Grateful Dead") {
                fracTotal+=(1/index);
                console.log(song.name); //to check if correct
            }
        });
        // return fracTotal;
        songPercentage+=fracTotal;
    }


    //Component 3: How many of their top artists are related to the GD
    function topRelatedArtists(){
        var fracTotal = 0;
        topArtists.forEach((artist,index) => {
            if (artist in relatedArtists) { //does this work in JS; if not, need nested
                fracTotal += (1/index);
            }

            // return fracTotal;
         });
         artistPercentage+=fracTotal;
    }

    
    //Component 4: How many of their top songs are by related artists
    function songsByRelated() {
        //keep track of summated song inverses
        var fracTotal = 0;

        topTracks.forEach((song, index) => {
            if (song.artists[0].name in relatedArtists) {
                fracTotal+=(1/index);
                console.log(song.artist[0].name); //to check if correct
            }
        });
        // return fracTotal;
        songPercentage+=fracTotal;
    }
    
    //sets top tracks and calls all necessary track functions
    function handleTopTracks(tracks) {
        console.log(tracks);
        topTracks=tracks;
        gdSongsPercentage();
        songsByRelated();
        hasTracks = true;
        if (hasTracks && hasArtists) {
            setTotal(parseInt(100*(artistPercentage+songPercentage)));
        }
    }


    //sets top artists and calls all necessary artist functions
    function handleTopArtists(artists) {
        topArtists=artists;
        gdRanking();
        gdRankingPercentage(gdIndex);
        topRelatedArtists();
        console.log(artistPercentage);
        hasArtists = true;
        if (hasTracks && hasArtists) {
            setTotal(parseInt(100*(artistPercentage+songPercentage)));
        }
    }
    
    
    return (
        <div>
            <TopTracks
            accessToken={props.accessToken}
            onTopTracks={handleTopTracks}
          />
          <hr></hr>
          <TopArtists
            accessToken={props.accessToken}
            onTopArtists={handleTopArtists}
          />
          
          
          <p>
            gdIndex: {totalPercentage}%
          </p>
        </div>
    )

}
export default Algorithm;