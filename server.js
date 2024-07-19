// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

// Importar y usar las rutas de eventos y de invitados
const eventRoutes = require('./routes/events');
const guestRoutes = require('./routes/guests');



// Middleware para manejar las rutas
app.use('/events', eventRoutes);
app.use('/events', guestRoutes); //esta bien que sea events en vez de guests


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
