function getTotal(){
    return fetch('http://localhost:3000/reservations/totalCart')
                .then(response=>response.json()
                .then((data)=>{
                    console.log(data)
                    document.querySelector("#totalCardCart").innerHTML=`
                    <div id="totalCart">
                        Total: <span>${data.total}€</span>
                    </div>
                    <a href="./purchase.html"><button id="purchaseButtonCart">Purchase</button></a>   
                    `
                })
            )
}


fetch('http://localhost:3000/reservations/isBooked')
    .then(response=>response.json())
    .then((data)=>{
        // document.querySelector("#cardCart").innerHTML="";
        
        if (data.reservations.length===0){
            document.querySelector("#cardCart").innerHTML=`<div> No Ticket in your cart.</div>
            <div>Why not plan a trip</div>`;
        } else {
            document.querySelector('#cardCart').style.justifyContent = "space-between";
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
                    <a href="./cart.html"><button class="deleteButton" id="${schedule["_id"]}">X</button></a>
                </div>
                `
            }
            document.querySelector("#cardCart").innerHTML+=
                `<div id = "totalCardCart"></div>`;
            getTotal()
            .then(()=>{
                document.querySelector("#purchaseButtonCart").addEventListener('click', function(){
                console.log("ca va delete")
                    fetch('http://localhost:3000/reservations',{
                        method:'PUT',
                        headers: { 'Content-Type': 'application/json' },
                    })
                    .then(response=>response.json())
                    .then((data)=>{
                        console.log(data)
                    })
                })

            })
        }
    })
    
    .then(()=>{
        let deleteArray = document.querySelectorAll(".deleteButton")
        for (const button of deleteArray){
            button.addEventListener("click", function(){
                fetch(`http://localhost:3000/reservations/${button.id}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                })
                .then(response => response.json())
                .then(()=>{
                    console.log("deleted")

                    // if (data.reservations.length===0){
                    //     document.querySelector("#cardCart").innerHTML=`
                    //     <div> No Ticket in your cart.</div>
                    //     <div>Why not plan a trip</div>`;
                    // } else {
                    //     document.querySelector("#cardCart").innerHTML="";
                    //     document.querySelector("#cardCart").innerHTML+='<div id="newScheduleListCart"></div>'
                    //     for (const schedule of data.reservations){
                    //         document.querySelector("#newScheduleListCart").innerHTML+=`
                    //         <div class = "newscheduleCart">
                    //             <div class ="itineraryCart">
                    //                 <div class ="newJourneyDepartureCart">${schedule.departure}</div>
                    //                 <div>></div>
                    //                 <div id="newJourneyArrivalCart">${schedule.arrival}</div>
                    //             </div>
                    //             <div class ="newJourneyTimeCart">${schedule.date}</div>
                    //             <div class ="newJourneyPriceCart">${schedule.price}€</div>
                    //             <button class="deleteButton" id="${schedule["_id"]}">X</button>
                    //         </div>
                    //         `
                    //     }
                    //     document.querySelector("#cardCart").innerHTML+=
                    //         `<div id = "totalCardCart"></div>`
                    //     getTotal();
                    // }
                })
            })
        }
    })