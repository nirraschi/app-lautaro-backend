// routes/guests.js
const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');

// POST /events/:eventId/guests - Agregar invitado a un evento
router.post('/:eventId/guests', async (req, res) => {
    const { eventId } = req.params;
    const { nombre, apellido, dni, fechaNacimiento, email } = req.body;

    try {
        const newGuest = new Guest({
            nombre,
            apellido,
            dni,
            fechaNacimiento,
            email,
            ingreso,
            eventId // Vincular al evento correspondiente
        });

        await newGuest.save();
        res.status(201).json(newGuest);
    } catch (error) {
        console.error('Error al agregar invitado:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// GET /events/:eventId/guests - Obtener invitados de un evento específico
router.get('/:eventId/guests', async (req, res) => {
    const { eventId } = req.params;
    try {

    const guests = await Guest.find({ eventId });
    res.json(guests);

    } catch (error) {

        console.error('Error al obtener invitados:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;
