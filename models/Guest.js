const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    email: { type: String, required: true },
    ingreso: { type: Boolean, required: true, default: false },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }
});

module.exports = mongoose.model('Guest', guestSchema);
