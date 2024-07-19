// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Guest = require('../models/Guest');

// POST /events - Crear un nuevo evento
router.post('/', async (req, res) => {
    const { name, date, location, responsable, telResponsable, comment, cantInvitados, imageUrl } = req.body;
    try {
        const newEvent = new Event({ name, date, location, responsable, telResponsable, comment, cantInvitados, imageUrl });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error al crear evento:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// POST /events/:eventId/guests - Crear un nuevo invitado y asignarlo a un evento
router.post('/:eventId/guests', async (req, res) => {
const { eventId } = req.params;
const { nombre, apellido, dni, fechaNacimiento, email, ingreso } = req.body;
try {
    const event = await Event.findById(eventId);
    if (!event) {
        return res.status(404).json({ error: 'Evento no encontrado' });
    }
    const newGuest = new Guest({ nombre, apellido, dni, fechaNacimiento, email, ingreso, eventId: eventId });
    await newGuest.save();
    res.status(201).json(newGuest);
} catch (error) {
    console.error('Error al crear invitado:', error);
    res.status(500).json({ error: 'Error del servidor' });
}
});

// router.get('/:eventId/guests', async (req, res) => {
//   try {
//       const guests = await Guest.findById(eventId);
//       res.json(guests);
//   } catch (error) {
//       console.error('Error al obtener invitado:', error);
//       res.status(500).json({ error: 'Error del servidor' });
//   }
// });

// GET /events - Obtener todos los eventos
router.get('/', async (req, res) => {
try {
    const events = await Event.find();
    res.json(events);
} catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ error: 'Error del servidor' });
}
});

// GET /events/:id - Obtener un evento específico
router.get('/:id', async (req, res) => {
const { id } = req.params;
try {
    const event = await Event.findById(id);
    if (!event) {
        return res.status(404).json({ error: 'Evento no encontrado' });
    }
    res.json(event);
} catch (error) {
    console.error('Error al obtener evento:', error);
    res.status(500).json({ error: 'Error del servidor' });
}
});

// PUT /events/:id - Actualizar un evento
router.put('/:id', async (req, res) => {
const { id } = req.params;
const { name, date, location, responsable, telResponsable, comment, cantInvitados, imageUrl } = req.body;
try {
    const event = await Event.findByIdAndUpdate(id, { name, date, location, responsable, telResponsable, comment, cantInvitados, imageUrl }, { new: true });
    if (!event) {
        return res.status(404).json({ error: 'Evento no encontrado' });
    }
    res.json(event);
} catch (error) {
    console.error('Error al actualizar evento:', error);
    res.status(500).json({ error: 'Error del servidor' });
}
});

// DELETE /events/:id - Eliminar un evento
router.delete('/:id', async (req, res) => {
const { id } = req.params;
try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
        return res.status(404).json({ error: 'Evento no encontrado' });
    }
    res.json({ message: 'Evento eliminado correctamente' });
} catch (error) {
    console.error('Error al eliminar evento:', error);
    res.status(500).json({ error: 'Error del servidor' });
}
});

// Crear un nuevo invitado para un evento específico
router.post('/:eventId/guests', async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).send('Evento no encontrado');
        }

        const guest = new Guest(req.body);
        event.guests.push(guest);
        await event.save();
        await guest.save();
        res.status(201).send(guest);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
