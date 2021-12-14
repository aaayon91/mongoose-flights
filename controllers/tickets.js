const Ticket = require('../models/ticket');
const Flight = require('../models/flight')

module.exports = {
    new: newTicket,
    create
};

function create(req, res) {
    req.body.flight = req.params.id;
    // console.log(req.body.flight);
    Flight.findById(req.params.id, function(err, flight) {
    Ticket.create(req.body, function (err, ticket) {
        console.log('hi')
        res.redirect(`/flights/${flight._id}`);
      });
    })
}


function newTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        console.log('hi2')
        res.render('tickets/new', {title: "Add Ticket", flight})
    })
}