fetch('http://localhost:3000/reservations/isBooked')
    .then(response=>response.json())
    .then((data)=>{
        console.log(data)
    })