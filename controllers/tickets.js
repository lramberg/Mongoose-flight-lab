var Ticket = require('../models/ticket');
var Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create
}

function create(req, res) {
    var ticket = new Ticket(req.body);
    ticket.save(function(err) {
        err ? 
            res.render('tickets/new') :
            Flight.findById(req.params.id, function (e, flight) {
                flight.tickets.push(ticket);
                flight.save(function (err) {
                    err ? 
                        res.render('tickets/new') : res.redirect(`/flights/${flight._id}`);
                });
            });
    });
}

function newTicket(req, res) {
    var flightId = req.params.id;
    Flight.findById(flightId, function(err, flight) {
        res.render('tickets/new', {
            flightId, flight
        });
    });
}