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
var node_env = process.env.NODE_ENV;

var basic = Buffer.from(client_id + ':' + client_secret).toString('base64');
var TOP_TRACKS_ENDPOINT = '/me/top/tracks?time_range=long_term&limit=6';
var TOP_ARTISTS_ENDPOINT = '/me/top/artists?time_range=long_term&limit=6';
var CURRENTLY_PLAYING_ENDPOINT = '/me/player/currently-playing';
var RECENTLY_PLAYED_ENDPOINT = '/me/player/recently-played?limit=3';

var mockCurrentlyPlayingData = {
  "item": {
    "album": {
      "external_urls": {
        "spotify": "https://open.spotify.com/album/4cTjPXaFkUyaHr29G1PiT9"
      },
      "href": "https://api.spotify.com/v1/albums/4cTjPXaFkUyaHr29G1PiT9",
      "id": "4cTjPXaFkUyaHr29G1PiT9",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d0000b273da187d0211e422b8ef662dc2",
          "height": 640,
          "width": 640
        },
        {
          "url": "https://i.scdn.co/image/ab67616d00001e02da187d0211e422b8ef662dc2",
          "height": 300,
          "width": 300
        },
        {
          "url": "https://i.scdn.co/image/ab67616d00004851da187d0211e422b8ef662dc2",
          "height": 64,
          "width": 64
        }
      ],
      "name": "Macro",
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/7o6cOczXTB8ioTAAJTbESf"
          },
          "href": "https://api.spotify.com/v1/artists/7o6cOczXTB8ioTAAJTbESf",
          "id": "7o6cOczXTB8ioTAAJTbESf",
          "name": "Jinjer",
          "type": "artist",
          "uri": "spotify:artist:7o6cOczXTB8ioTAAJTbESf"
        }
      ]
    },
    "artists": [
      {
        "external_urls": {
          "spotify": "https://open.spotify.com/artist/7o6cOczXTB8ioTAAJTbESf"
        },
        "href": "https://api.spotify.com/v1/artists/7o6cOczXTB8ioTAAJTbESf",
        "id": "7o6cOczXTB8ioTAAJTbESf",
        "name": "Jinjer"
      }
    ],
    "external_urls": {
      "spotify": "https://open.spotify.com/track/0MAOtWNk7VClsYs8CuLYTr"
    },
    "href": "https://api.spotify.com/v1/tracks/0MAOtWNk7VClsYs8CuLYTr",
    "id": "0MAOtWNk7VClsYs8CuLYTr",
    "name": "Pit of Consciousness"
  }
};

var mockArtistsData = [
  {
    id: '2KaW48xlLnXC2v8tvyhWsa',
    name: 'Amaranthe',
    genres: ['symphonic metal', 'power metal', 'metal'],
    image: {
      height: 640,
      url: 'https://i.scdn.co/image/ab6761610000e5eb293f7f4aebb31292f607bf3b',
      width: 640
    },
    url: 'https://open.spotify.com/artist/2KaW48xlLnXC2v8tvyhWsa'
  },
  {
    id: '7o6cOczXTB8ioTAAJTbESf',
    name: 'Jinjer',
    genres: [
      'metal',
      'djent',
      'groove metal',
      'progressive metal',
      'metalcore'
    ],
    image: {
      height: 640,
      url: 'https://i.scdn.co/image/ab6761610000e5ebed492174d89956bf1f6af3ff',
      width: 640
    },
    url: 'https://open.spotify.com/artist/7o6cOczXTB8ioTAAJTbESf'
  },
  {
    id: '6pIRdCtSE5hLFfIfcTAicI',
    name: 'Delain',
    genres: [
      'symphonic metal',
      'gothic metal',
      'power metal',
      'metal',
      'gothic rock'
    ],
    image: {
      height: 640,
      url: 'https://i.scdn.co/image/ab6761610000e5eb018cf8aa649ae040cabf9e9c',
      width: 640
    },
    url: 'https://open.spotify.com/artist/6pIRdCtSE5hLFfIfcTAicI'
  },
  {
    id: '4OAddazJM576euUnFSvXSL',
    name: 'Lacuna Coil',
    genres: ['gothic metal', 'symphonic metal', 'gothic rock', 'metal'],
    image: {
      height: 640,
      url: 'https://i.scdn.co/image/ab6761610000e5eb8f989674720776c95065a68d',
      width: 640
    },
    url: 'https://open.spotify.com/artist/4OAddazJM576euUnFSvXSL'
  },
  {
    id: '5t28BP42x2axFnqOOMg3CM',
    name: 'Five Finger Death Punch',
    genres: ['metal', 'groove metal', 'heavy metal', 'hard rock', 'rock'],
    image: {
      height: 640,
      url: 'https://i.scdn.co/image/ab6761610000e5eb1e7f796a17c2dc3c28bdeeb9',
      width: 640
    },
    url: 'https://open.spotify.com/artist/5t28BP42x2axFnqOOMg3CM'
  },
  {
    id: '2tz0dkPlnWB4NcHNIqWPgh',
    name: 'Mc Maha',
    genres: ['anime rap', 'funk', 'brazilian funk'],
    image: {
      height: 640,
      url: 'https://i.scdn.co/image/ab6761610000e5eb74378b3dd3f36d89f99dfe64',
      width: 640
    },
    url: 'https://open.spotify.com/artist/2tz0dkPlnWB4NcHNIqWPgh'
  },
];

var mockTracksData = [
  {
    id: '11Ojp7JniVvwd0gmgvyKkd',
    name: 'Wrong Side of Heaven',
    artists: [{ name: 'Five Finger Death Punch' }],
    albumName: 'The Wrong Side Of Heaven And The Righteous Side Of Hell, Volume 1',
    albumImage: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b27376df46a3fd82c419a2dc0a43',
      width: 640
    },
    url: 'https://open.spotify.com/track/11Ojp7JniVvwd0gmgvyKkd'
  },
  {
    id: '1UWGkn34CD31VQfdi4D8Zp',
    name: 'Bad Company',
    artists: [{ name: 'Five Finger Death Punch' }],
    albumName: 'War is the Answer',
    albumImage: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b273021dd6fc31a42ac4e4ab778c',
      width: 640
    },
    url: 'https://open.spotify.com/track/1UWGkn34CD31VQfdi4D8Zp'
  },
  {
    id: '7B3z0ySL9Rr0XvZEAjWZzM',
    name: 'Sofia',
    artists: [{ name: 'Amaranthe' }],
    albumName: 'Immunity',
    albumImage: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b27333ccb60f9b2785ef691b2fbc',
      width: 640
    },
    url: 'https://open.spotify.com/track/7B3z0ySL9Rr0XvZEAjWZzM'
  },
  {
    id: '14WYmNQWvR2TTWoRp8t9Ml',
    name: 'RATATATA',
    artists: [{ name: 'Jinjer' }, { name: 'Tatiana Shmayluk' }],
    albumName: 'RATATATA',
    albumImage: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b2733900e6899672f9dfdc028611',
      width: 640
    },
    url: 'https://open.spotify.com/track/14WYmNQWvR2TTWoRp8t9Ml'
  },
  {
    id: '51m9kUkrbufdmMl4ZBHcgR',
    name: 'Strange Machines',
    artists: [{ name: 'The Gathering' }],
    albumName: 'Mandylion',
    albumImage: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b273bf83720ca7a5539a8b0be737',
      width: 640
    },
    url: 'https://open.spotify.com/track/51m9kUkrbufdmMl4ZBHcgR'
  },
  {
    id: '1LHZMWefF9502NPfArRfvP',
    name: 'Lift Me Up (feat. Rob Halford of Judas Priest)',
    artists: [{ name: 'Five Finger Death Punch' }],
    albumName: 'The Wrong Side Of Heaven And The Righteous Side Of Hell, Volume 1',
    albumImage: {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b27376df46a3fd82c419a2dc0a43',
      width: 640
    },
    url: 'https://open.spotify.com/track/1LHZMWefF9502NPfArRfvP'
  },
];

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

  var req = https.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      try {
        callback(null, JSON.parse(data));
      } catch (e) {
        callback(e);
      }
    });
  });

  req.on('error', function (e) {
    callback(e);
  });

  req.write(postData);
  req.end();
}

function getSpotifyData(endpoint, callback) {
  getAccessToken(function (err, tokenData) {
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

    var req = https.request(options, function (res) {
      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
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

    req.on('error', function (e) {
      callback(e);
    });

    req.end();
  });
}

app.use(express.static(path.join(__dirname, '..')));

app.get('/top-artists', function (req, res) {
  if (node_env === 'development') {
    console.log('Serving mock artists data');
    return res.json(mockArtistsData);
  }

  getSpotifyData(TOP_ARTISTS_ENDPOINT, function (err, data) {
    if (err) {
      console.error(err);
      return res.status(500).json({ isPlaying: false, message: 'Error fetching currently playing song.' });
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
  if (node_env === 'development') {
    console.log('Serving mock tracks data');
    return res.json(mockTracksData);
  }

  getSpotifyData(TOP_TRACKS_ENDPOINT, function (err, data) {
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

app.get('/recently-played', function (req, res) {
  if (node_env === 'development') {
    console.log('Serving mock recently played data');
    var mockRecentlyPlayedData = {
      "items": [
        {
          "track": {
            "album": {
              "external_urls": {
                "spotify": "https://open.spotify.com/album/4cTjPXaFkUyaHr29G1PiT9"
              },
              "href": "https://api.spotify.com/v1/albums/4cTjPXaFkUyaHr29G1PiT9",
              "id": "4cTjPXaFkUyaHr29G1PiT9",
              "images": [
                {
                  "url": "https://i.scdn.co/image/ab67616d0000b273da187d0211e422b8ef662dc2",
                  "height": 640,
                  "width": 640
                },
                {
                  "url": "https://i.scdn.co/image/ab67616d00001e02da187d0211e422b8ef662dc2",
                  "height": 300,
                  "width": 300
                },
                {
                  "url": "https://i.scdn.co/image/ab67616d00004851da187d0211e422b8ef662dc2",
                  "height": 64,
                  "width": 64
                }
              ],
              "name": "Macro",
              "artists": [
                {
                  "external_urls": {
                    "spotify": "https://open.spotify.com/artist/7o6cOczXTB8ioTAAJTbESf"
                  },
                  "href": "https://api.spotify.com/v1/artists/7o6cOczXTB8ioTAAJTbESf",
                  "id": "7o6cOczXTB8ioTAAJTbESf",
                  "name": "Jinjer",
                  "type": "artist",
                  "uri": "spotify:artist:7o6cOczXTB8ioTAAJTbESf"
                }
              ]
            },
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/7o6cOczXTB8ioTAAJTbESf"
                },
                "href": "https://api.spotify.com/v1/artists/7o6cOczXTB8ioTAAJTbESf",
                "id": "7o6cOczXTB8ioTAAJTbESf",
                "name": "Jinjer"
              }
            ],
            "external_urls": {
              "spotify": "https://open.spotify.com/track/0MAOtWNk7VClsYs8CuLYTr"
            },
            "href": "https://api.spotify.com/v1/tracks/0MAOtWNk7VClsYs8CuLYTr",
            "id": "0MAOtWNk7VClsYs8CuLYTr",
            "name": "Pit of Consciousness"
          }
        }
      ]
    };
    return res.json(mockRecentlyPlayedData);
  }

  getSpotifyData(RECENTLY_PLAYED_ENDPOINT, function (err, data) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    res.json(data);
  });
});

app.get('/currently-playing', function (req, res) {
  if (node_env === 'development') {
    console.log('Serving mock currently playing data');
    if (mockCurrentlyPlayingData && mockCurrentlyPlayingData.item) {
      var track = mockCurrentlyPlayingData.item;
      return res.json({
        isPlaying: true,
        title: track.name,
        artist: track.artists.map(function (artist) { return artist.name; }).join(', '),
        albumImageUrl: track.album.images[0].url,
        songUrl: track.external_urls.spotify
      });
    } else {
      return res.json({ isPlaying: false, message: 'No music currently playing via mock data.' });
    }
  }

  getSpotifyData(CURRENTLY_PLAYING_ENDPOINT, function (err, data) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    if (data && data.item) {
      var track = data.item;
      res.json({
        isPlaying: true,
        title: track.name,
        artist: track.artists.map(function (artist) { return artist.name; }).join(', '),
        albumImageUrl: track.album.images[0].url,
        songUrl: track.external_urls.spotify
      });
    } else {
      res.json({ isPlaying: false });
    }
  });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, function () {
  console.log('Server listening on port ' + PORT);
});

module.exports = app;