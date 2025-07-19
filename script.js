window.onload = function() {
    var spotifySection = document.getElementById('spotify-data');
    if (!spotifySection) {
        alert('Spotify-data element not found!');
        return;
    }

    TopArtists();
    TopTracks();
};

function TopArtists() {
    var spotifySection = document.getElementById('spotify-data');
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
                size: 'sm',
                isPlaying: false,
                url: artist.url
            });
        }

        var vinylContainer = VinylContainer(vinylRecordsData);
        spotifySection.appendChild(vinylContainer);
    }
};

function TopTracks() {
    var spotifySection = document.getElementById('spotify-data');
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
                size: 'sm',
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
    var size = record.size || 'sm';
    var isPlaying = record.isPlaying || false;
    var url = record.url;
    var vinylRecordDiv = document.createElement('div');
    vinylRecordDiv.className = 'vinyl-record ' + size;

    var vinylBackgroundDiv = document.createElement('div');
    vinylBackgroundDiv.className = 'vinyl-record-background';

    var groove1 = document.createElement('div');
    groove1.className = 'vinyl-record-groove vinyl-record-groove-1';
    vinylBackgroundDiv.appendChild(groove1);

    var groove2 = document.createElement('div');
    groove2.className = 'vinyl-record-groove vinyl-record-groove-2';
    vinylBackgroundDiv.appendChild(groove2);

    var groove3 = document.createElement('div');
    groove3.className = 'vinyl-record-groove vinyl-record-groove-3';
    vinylBackgroundDiv.appendChild(groove3);

    var groove4 = document.createElement('div');
    groove4.className = 'vinyl-record-groove vinyl-record-groove-4';
    vinylBackgroundDiv.appendChild(groove4);

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

function getSpotifyData(endpoint) {
    var spotifySection = document.getElementById('spotify-data');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', window.location.origin + '/' + endpoint, false); 
    try {
        xhr.send();
        if (xhr.status >= 200 && xhr.status < 300) {
            return JSON.parse(xhr.responseText);
        } else {
            alert('HTTP error! status: ' + xhr.status);
            return null;
        }
    } catch (e) {
        alert('Network error fetching ' + endpoint + ': ' + e.message);
        if (spotifySection) {
            spotifySection.innerHTML = '<div class="error"><h3>Error loading Spotify data</h3><p><strong>Error:</strong> Network Error</p><p><strong>Troubleshooting steps:</strong></p><ul><li>1. Ensure your server is running on the same origin as this page (' + window.location.origin + ')</li><li>2. Check that your Spotify API credentials are configured</li><li>3. Verify CORS is enabled on your server</li><li>4. Check the browser console for more details</li></ul></div>';
        }
        return null;
    }

};

