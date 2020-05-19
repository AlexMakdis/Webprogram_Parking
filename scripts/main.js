const parkingData = "https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json";
const parkingOverview = document.getElementById('parking-overview');

function getParkingData(parkings) {
    return new Promise((resolve, reject) => {

        fetch(parkingData)
            .then((response) => {
                // omzetten naar json
                return response.json()
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

function parkingsInDOM() {
    getParkingData()
    
    .then((parkings) => {
        parkingOverview.innerHTML = ''
        parkings.forEach(parkings => {
            let parkingDiv = document.createElement('div');
            parkingDiv.className = 'parking';
            let parkingHTML = `
            <h2>${parkings.description}</h2>
                <ul>
                    <li>Capaciteit: ${parkings.parkingStatus.availableCapacity}</li>
                    <li>Beschikbaar:${parkings.parkingStatus.totalCapacity}</li>
                </ul>
            `;
           
            parkingDiv.innerHTML = parkingHTML;
            
            parkingOverview.appendChild(parkingDiv);
        })
    });
}

    parkingsInDOM();
    setInterval(parkingsInDOM, 300000);