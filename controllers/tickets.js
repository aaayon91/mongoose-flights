const Ticket = require('../models/ticket');
const Flight = require('../models/flight')

module.exports = {
    new: newTicket,
    create
};

function create(req, res) {
    req.body.flight = req.params.id;
    Flight.findById(req.params.id, function(err, flight) {
    Ticket.create(req.body, function (err, ticket) {
        res.redirect(`/flights/${flight._id}`);
      });
    })
}

function newTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        res.render('tickets/new', {title: "Add Ticket", flight})
    })
}