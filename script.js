console.log("hello")

document.querySelector("#addCity").addEventListener('click', function(){
    console.log("well cliqued")
    document.querySelector("#card").innerHTML="";
    
    const departure = document.querySelector("#departureInput").value;
    const arrival = document.querySelector("#arrivalInput").value;
    const date = document.querySelector("#date").value;
    
    fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)
    .then(response=>response.json())
    .then((data)=>{
        console.log(data.trips.length)
        if(data.trips.length===0){
            document.querySelector("#card").innerHTML+=`
            <img src="./images/notfound.png" alt="image de loupe" />
            <span id="underscore">_______________________</span>
            <p> No trip found.</p>`
            
        } else {
        for (const journey of data.trips){
            // console.log(journey["_id"])
            let heure = journey["date"].substr(11, 5)
            console.log(heure)
            document.querySelector("#card").innerHTML+=`<div id="newJourney">
                    <div id="newJourneyDeparture">${journey["departure"]}</div>
                    <div>></div>
                    <div id="newJourneyArrival">${journey["arrival"]}</div>
                    <div id="newJourneyTime">${heure}</div>
                    <div id="newJourneyPrice">${journey["price"]}€</div>
                    <button class="bookButton" id="${journey["_id"]}">BOOK</button>
                </div>`
        }}
    })
})