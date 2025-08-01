window.onload = function () {
    var currentlyPlayingData = getSpotifyData('currently-playing');
    if (currentlyPlayingData && currentlyPlayingData.isPlaying) {
        CurrentlyPlaying(currentlyPlayingData);
    } else {
        RecentlyPlayed(true);
    }
    TopArtists();
    TopTracks();
};

function TopArtists() {
    var spotifySection = document.getElementById('spotify-data-top-artists');
    var data = getSpotifyData('top-artists');

    if (data && Array.isArray(data) && data.length > 0) {
        var artistsTitle = document.createElement('h3');
        artistsTitle.innerHTML = 'Top Artists';
        spotifySection.appendChild(artistsTitle);

        var vinylRecordsData = [];
        for (var i = 0; i < data.length; i++) {
            var artist = data[i];
            vinylRecordsData.push({
                imageUrl: artist.image ? artist.image.url : '',
                alt: artist.name,
                isPlaying: false,
                url: artist.url
            });
        }

        var vinylContainer = VinylContainer(vinylRecordsData);
        spotifySection.appendChild(vinylContainer);
    }
};

function TopTracks() {
    var spotifySection = document.getElementById('spotify-data-top-tracks');
    var data = getSpotifyData('top-tracks');

    if (data && Array.isArray(data) && data.length > 0) {
        var tracksTitle = document.createElement('h3');
        tracksTitle.innerHTML = 'Top Tracks';
        spotifySection.appendChild(tracksTitle);

        var vinylRecordsData = [];
        for (var i = 0; i < data.length; i++) {
            var track = data[i];
            vinylRecordsData.push({
                imageUrl: track.albumImage ? track.albumImage.url : '',
                alt: track.albumName,
                isPlaying: false,
                url: track.url
            });
        }

        var vinylContainer = VinylContainer(vinylRecordsData);
        spotifySection.appendChild(vinylContainer);
    }
};

function VinylRecord(record) {
    var imageUrl = record.imageUrl;
    var alt = record.alt;
    var isPlaying = record.isPlaying || false;
    var url = record.url;
    var vinylRecordDiv = document.createElement('div');
    vinylRecordDiv.className = 'vinyl-record ' + (isPlaying ? 'animate-spin' : '');

    var vinylBackgroundDiv = document.createElement('div');
    vinylBackgroundDiv.className = 'vinyl-record-background';

    var groove = document.createElement('div');
    groove.className = 'vinyl-record-groove vinyl-record-groove';
    vinylBackgroundDiv.appendChild(groove);

    var centerHole = document.createElement('div');
    centerHole.className = 'vinyl-record-center-hole';
    vinylBackgroundDiv.appendChild(centerHole);

    vinylRecordDiv.appendChild(vinylBackgroundDiv);

    var albumCoverDiv = document.createElement('div');
    albumCoverDiv.className = 'album-cover';

    var albumImage = document.createElement('img');
    albumImage.src = imageUrl || 'images/placeholder.gif';
    albumImage.alt = alt;
    albumCoverDiv.appendChild(albumImage);

    vinylRecordDiv.appendChild(albumCoverDiv);

    var link = document.createElement('a');
    link.href = url || '#';
    link.target = '_blank';
    link.appendChild(vinylRecordDiv);

    return link;
}

function VinylContainer(records) {
    var container = document.createElement('div');
    container.className = 'vinyl-container';

    for (var i = 0; i < records.length; i++) {
        var vinyl = VinylRecord(records[i]);
        container.appendChild(vinyl);
    }

    return container;
}

function CurrentlyPlaying(data) {
    var spotifySection = document.getElementById('spotify-data-music');

    if (data && data.isPlaying) {
        var currentlyPlayingTitle = document.createElement('h3');
        currentlyPlayingTitle.innerHTML = 'Currently Playing';
        spotifySection.appendChild(currentlyPlayingTitle);

        var vinylRecordsData = [{
            imageUrl: data.albumImageUrl,
            alt: data.title,
            isPlaying: true,
            url: data.songUrl
        }];

        var vinylContainer = VinylContainer(vinylRecordsData);
        spotifySection.appendChild(vinylContainer);

        var songInfoDiv = document.createElement('div');
        songInfoDiv.innerHTML = '<p style="margin-block: 8px"><strong>' + data.title + '</strong></p><p style="margin: 0px">' + data.artist + '</p>';
        spotifySection.appendChild(songInfoDiv);
    } else {
        var notPlayingTitle = document.createElement('h3');
        notPlayingTitle.innerHTML = 'Currently Playing';
        spotifySection.appendChild(notPlayingTitle);

        var notPlayingHtml = `
            <div id="vinyl-container-main" class="vinyl-container">
                <div class="vinyl-record">
                    <div class="vinyl-record-background">
                        <div class="vinyl-record-groove"></div>
                        <div class="vinyl-record-center-hole"></div>
                    </div>
                    <div class="album-cover">
                        <!-- Empty when no music is playing -->
                    </div>
                </div>
                <p>Not currently playing anything on Spotify.</p>
            </div>
        `;
        spotifySection.innerHTML += notPlayingHtml;
    }
}

function RecentlyPlayed(isRightTd) {
    var spotifySection = isRightTd ? document.getElementById('spotify-data-music') : document.getElementById('spotify-data-main');
    var responseData = getSpotifyData('recently-played');

    if (responseData && responseData.items && responseData.items.length > 0) {
        var recentlyPlayedTitle = document.createElement('h3');
        recentlyPlayedTitle.innerHTML = 'Recently Played';
        spotifySection.appendChild(recentlyPlayedTitle);

        var vinylRecordsData = [];
        var itemsToDisplay = isRightTd ? [responseData.items[0]] : responseData.items; 

        for (var i = 0; i < itemsToDisplay.length; i++) {
            if (itemsToDisplay[i].track) {
                var track = itemsToDisplay[i].track;
                vinylRecordsData.push({
                    imageUrl: track.album.images[0].url,
                    alt: track.name + ' by ' + track.artists[0].name,
                    isPlaying: false,
                    url: track.external_urls.spotify,
                    title: track.name,
                    artist: track.artists[0].name
                });
            }
        }

        if (vinylRecordsData.length > 0) {
            var vinylContainer = VinylContainer(vinylRecordsData);
            spotifySection.appendChild(vinylContainer);

            if (isRightTd && itemsToDisplay[0] && itemsToDisplay[0].track) {
                var track = itemsToDisplay[0].track;
                var songInfoDiv = document.createElement('div');
                songInfoDiv.innerHTML = '<p style="margin-block: 8px"><strong>' + track.name + '</strong></p><p style="margin: 0px">' + track.artists[0].name + '</p>';
                spotifySection.appendChild(songInfoDiv);
            }

        } else {
            spotifySection.innerHTML += '<p>No valid track data found</p>';
        }
    } else {
        var notPlayingHtml = `
            <h3>Recently Played</h3>
            <p>No recently played tracks found.</p>
        `;
        spotifySection.innerHTML += notPlayingHtml;
    }
}

function getSpotifyData(endpoint) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', window.location.origin + '/' + endpoint, false);
    try {
        xhr.send();
        if (xhr.status >= 200 && xhr.status < 300) {
            return JSON.parse(xhr.responseText);
        } else {
            return null;
        }
    } catch (e) {
        if (spotifySection) {
            spotifySection.innerHTML = '<div class="error"><h3>Error loading Spotify data</h3><p><strong>Error:</strong> Network Error</p><p><strong>Troubleshooting steps:</strong></p><ul><li>1. Ensure your server is running on the same origin as this page (' + window.location.origin + ')</li><li>2. Check that your Spotify API credentials are configured</li><li>3. Verify CORS is enabled on your server</li><li>4. Check the browser console for more details</li></ul></div>';
        }
        return null;
    }

};

