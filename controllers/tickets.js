const Ticket = require('../models/ticket');
const Flight = require('../models/flight')

module.exports = {
    new: newTicket,
    create
};

function create(req, res) {
    console.log('hi')
    console.log(req.body);
    // console.log(`${flight._id}`)
    // Ticket.create(req.body, function (err, ticket) {
    //     console.log('hi')
        res.redirect(`/flights/${flight._id}`);
    //   });
}

// function create(req, res) {
//     Ticket.create(req.body, function (err, ticket) {
//         console.log('hi')
//         res.redirect('/tickets/new');
//       });
// }

function newTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        console.log('hi2')
        res.render('tickets/new', {title: "Add Ticket", flight})
    })
}