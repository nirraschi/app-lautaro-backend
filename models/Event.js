// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    responsable: { type: String, required: true },
    telResponsable: { type: String, required: true },
    comment: { type: String },
    cantInvitados: { type: String, required: true },
    imageUrl: { type: String }
});

module.exports = mongoose.model('Event', eventSchema);
