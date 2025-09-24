fetch('http://localhost:3000/reservations/isBooked')
    .then(response=>response.json())
    .then((data)=>{
        // document.querySelector("#cardCart").innerHTML="";
        
        if (data.reservations.length===0){
            document.querySelector("#cardCart").innerHTML=`<div> No Ticket in your cart.</div>
            <div>Why not plan a trip</div>`;
        } else {
            document.querySelector("#cardCart").innerHTML+='<div id="newScheduleListCart"></div>'
            
            for (const schedule of data.reservations){
                document.querySelector("#newScheduleListCart").innerHTML+=`
                <div class = "newscheduleCart">
                    <div class ="itineraryCart">
                        <div class ="newJourneyDepartureCart">${schedule.departure}</div>
                        <div>></div>
                        <div id="newJourneyArrivalCart">${schedule.arrival}</div>
                    </div>
                    <div class ="newJourneyTimeCart">${schedule.date}</div>
                    <div class ="newJourneyPriceCart">${schedule.price}€</div>
                    <button class="deleteButton" id="${schedule["_id"]}">X</button>
                </div>
                `
            }
            fetch('http://localhost:3000/reservations/totalCart')
                .then(response=>response.json()
                .then((data)=>{
                    console.log(data)
                    document.querySelector("#cardCart").innerHTML+=
                `<div id = "totalCardCart">
                    <div id="totalCart">Total: <span>${data.total}€</span></div>
                    <button class="purchaseButtonCart">Purchase</button>   
                    </div>
                </div>`
                })
            )
        }
    })