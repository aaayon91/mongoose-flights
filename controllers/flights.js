const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newFlight,
    create,
    index,
    show
};

function newFlight(req, res) {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', {title: 'Add Flight' , departsDate });
};

function create(req, res) {
    const flight = new Flight(req.body)
    flight.save(function(err) {
        // one way to handle errors
        if(err) return res.redirect('/flights/new')
        res.redirect('/flights')
    })
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {
            title: 'All Flights',
            flights
        })
    })
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            // Now you can pass both the flight and tickets in the res.render call
            // console.log(flight.destinations.arrival)
            // const newFlight = new Flight();
            // console.log(flight)
            const dt = flight.departs;
            let arrivesDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
            arrivesDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
            // const dt = newFlight.destination.arrival;
            // let arrivalDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
            // arrivalDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
            res.render('flights/show', { title: 'Flight Detail', flight, arrivesDate});

          });
    })
    
}

// function show(req, res) {
//     Flight.findById(req.params.id, function(err, flight) {
//         // console.log(flight.destinations.arrival)
//         // const newFlight = new Flight();
//         // console.log(flight)
//         const dt = flight.departs;
//         let arrivesDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
//         arrivesDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
//         // const dt = newFlight.destination.arrival;
//         // let arrivalDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
//         // arrivalDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
//         res.render('flights/show', { title: 'Flight Detail', flight, arrivesDate});
//     })
    
// }

