import React, { useState, useEffect } from "react";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";

function Algorithm (props) {

    var totalPercentage = 0;
    var topTracks = [];
    var topArtists = [];
    var gdIndex = -1;
    var relatedArtists = [];

    function handleTopArtists(artists) {
        topArtists=artists;
    }

    function handleTopTracks(tracks) {
        console.log(tracks);
        topTracks=tracks;
    }

    function callApi(method, url, body, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + props.accessToken);
        xhr.send(body);
        xhr.onload = callback;
    }

    //Determines where the grateful dead fall in their top artists list
    function gdRanking(){
        topArtists.forEach((artist,index) => {
            if (artist === "Grateful Dead") {
                console.log("in here");
                gdIndex = index;
            }
            console.log(gdIndex);
        })
    }


    //Returns proper percentage (with a total weight of 40) of GD within top artists
    function gdRankingPercentage(ranking) {
        //if dead not w/in top 20 artists, they get no points
        if (ranking == -1) {
            return 0;
        } 

        return (0.4-(ranking*2));
    }

    function gdSongsPercentage() {
        //keep track of summated song inverses
        var fracTotal = 0;

        topTracks.forEach((song, index) => {
            console.log(song.name);
        });
    }

    //console.log(gdRankingPercentage(gdRanking()));
    gdSongsPercentage();
    gdRanking();

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
              gdIndex: {gdIndex}
          </p>
        </div>
    )

}
export default Algorithm;