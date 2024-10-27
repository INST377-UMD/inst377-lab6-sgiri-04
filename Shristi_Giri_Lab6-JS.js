function createMap() {
    /** set-up guide mapping creation */
    const map = L.map('map').setView([38, -96], 4); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    /** for loop for generating 3 markers and iterating for random coordinates */
    for (let i = 1; i <= 3; i++) {
        const latitude = getRandomInRange(30, 35, 3);
        const longitude = getRandomInRange(-100, -90, 3);

        L.marker([latitude, longitude]).addTo(map);

        getLocality(latitude, longitude).then(locality => {
            document.getElementById('markers-coordinate').innerHTML += `
                <p>
                    <b><h3>Marker ${i}</b>: Latitude: ${latitude}, Longitude: ${longitude}<h3>
                    <h4>Locality: ${locality}<h4>
                </p>`;
        }).catch(error => {
            console.error('Error fetching locality:', error);
            document.getElementById('markers-coordinate').innerHTML += `
                <p>
                    <b><h3>Marker ${i}</b>: Latitude: ${latitude}, Longitude: ${longitude}<h3>
                    <h4>Locality: Unknown<h4>
                </p>`;
        });
    }
}

/** given function for random generated coordinates */
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

/** function to fetch locality data from API */
function getLocality(latitude, longitude) {
    return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => data.locality || 'Unknown');
}

createMap();