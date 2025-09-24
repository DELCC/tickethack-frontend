fetch('http://localhost:3000/reservations/isPurchased')
.then(response=>response.json())
.then((data)=>{
    // console.log(data)
    if (data.purchased.length===0){
            document.querySelector("#cardPurchase").innerHTML=`<div> No booking yet.</div>
            <div>Why not plan a trip</div>`;
        } else {
            document.querySelector("#cardPurchase").innerHTML+=`
             <div id = "titlePurchase"> My bookings
                </div>
            <div id="newScheduleListPurchase">
               
            </div>`

            for (const schedule of data.purchased){
            console.log(schedule["_id"])
            document.querySelector("#newScheduleListPurchase").innerHTML+=`
                <div id = "newschedulePurchase">
                    <div class ="itineraryPurchase">
                        <div id="newJourneyDeparturePurchase">${schedule["departure"]}</div>
                        <div>></div>
                        <div id="newJourneyArrivalPurchase">${schedule["arrival"]}</div>
                    </div>
                    <div id="newJourneyTimePurchase">${schedule["date"]}</div>
                    <div id="newJourneyPricePurchase">${schedule["price"]}€</div>
                    <div id="timetogo">${schedule["fromNow"]}</div>
                </div>`
            
            }
            document.querySelector("#cardPurchase").innerHTML+=`
            <div id="enjoyMessage">
                <span id="underscore-1">_______________________</span>
                 <p style="color :  rgb(53, 196, 131) "> Enjoy your trip with Tickethack</p>
            </div>
            `
        }
})
