require('dotenv').config();
var express = require('express');
var querystring = require('querystring');
var https = require('https');
var path = require('path');

var app = express();

var PORT = process.env.PORT || 8080;

var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
var refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

var basic = Buffer.from(client_id + ':' + client_secret).toString('base64');
var TOP_TRACKS_ENDPOINT = '/me/top/tracks?time_range=long_term&limit=8';
var TOP_ARTISTS_ENDPOINT = '/me/top/artists?time_range=long_term&limit=8';

function getAccessToken(callback) {
    var postData = querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
    });

    var options = {
        hostname: 'accounts.spotify.com',
        path: '/api/token',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + basic,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    var req = https.request(options, function(res) {
        var data = '';
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            try {
                callback(null, JSON.parse(data));
            } catch (e) {
                callback(e);
            }
        });
    });

    req.on('error', function(e) {
        callback(e);
    });

    req.write(postData);
    req.end();
}

function getSpotifyData(endpoint, callback) {
    getAccessToken(function(err, tokenData) {
        if (err) {
            return callback(err);
        }
        var access_token = tokenData.access_token;

        var options = {
            hostname: 'api.spotify.com',
            path: '/v1' + endpoint,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        };

        var req = https.request(options, function(res) {
            var data = '';
            res.on('data', function(chunk) {
                data += chunk;
            });
            res.on('end', function() {
                try {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        callback(null, JSON.parse(data));
                    } else {
                        callback(new Error('Spotify API error: ' + res.statusCode + ' ' + res.statusMessage));
                    }
                } catch (e) {
                    callback(e);
                }
            });
        });

        req.on('error', function(e) {
            callback(e);
        });

        req.end();
    });
}

app.use(express.static(path.join(__dirname, '..')));

app.get('/top-artists', function (req, res) {
    getSpotifyData(TOP_ARTISTS_ENDPOINT, function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

        var items = data.items;
        var artists = [];
        if (items) {
            for (var i = 0; i < items.length; i++) {
                var artist = items[i];
                artists.push({
                    id: artist.id,
                    name: artist.name,
                    genres: artist.genres,
                    image: artist.images[0],
                    url: artist.external_urls.spotify
                });
            }
        }
        res.json(artists);
    });
});

app.get('/top-tracks', function (req, res) {
    getSpotifyData(TOP_TRACKS_ENDPOINT, function(err, data) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }

        var items = data.items;
        var tracks = [];
        if (items) {
            for (var i = 0; i < items.length; i++) {
                var track = items[i];
                tracks.push({
                    id: track.id,
                    name: track.name,
                    artists: track.artists,
                    albumName: track.album.name,
                    albumImage: track.album.images[0],
                    url: track.external_urls.spotify
                });
            }
        }
        res.json(tracks);
    });
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, function() {
    console.log('Server listening on port ' + PORT);
});

module.exports = app;
