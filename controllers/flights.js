const Flight = require('../models/flight');

module.exports = {
    new: newFlight,
    create,
    index
};

function newFlight(req, res) {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { departsDate });
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