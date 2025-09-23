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
     //affichage du message "NO TRIP FOUND"   
        console.log(data.trips.length)
        if(data.trips.length===0){
            document.querySelector("#card").innerHTML+=`
            <img src="./images/notfound.png" alt="image de loupe" />
            <span id="underscore">_______________________</span>
            <p> No trip found.</p>`
            
        } else {
        //Affichage des schedules    
            for (const journey of data.trips){
                console.log(journey["_id"])

                document.querySelector("#card").innerHTML+=`<div id="newJourney">
                        <div id="newJourneyDeparture">${journey["departure"]}</div>
                        <div>></div>
                        <div id="newJourneyArrival">${journey["arrival"]}</div>
                        <div id="newJourneyTime">${journey["date"]}</div>
                        <div id="newJourneyPrice">${journey["price"]}€</div>
                        <button class="bookButton" id="${journey["_id"]}">Book</button>
                    </div>`
            }
            //Attention, revoir le bloc demain et tester quand le back sera back
            const cardRight = document.querySelector('.card-right')
            if (cardRight.scrollHeight > cardRight.clientHeight) {
                cardRight.style.overflowY = 'scroll'; 
                } else {
                    cardRight.style.overflowY = 'hidden'; 
                }


    }
    })
})