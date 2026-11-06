const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory mock database
const doctors = [
  { id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Marcus Webb', specialty: 'Neurology' },
  { id: 3, name: 'Dr. Emily Chen', specialty: 'Pediatrics' }
];

let appointments = [];

// API Route: Get available doctors
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

// API Route: Get all scheduled appointments
app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

// API Route: Submit a new appointment request
app.post('/api/appointments', (req, res) => {
  const { doctorId, patientName, date } = req.body;
  
  if (!doctorId || !patientName || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newAppointment = {
    id: appointments.length + 1,
    doctorId: parseInt(doctorId),
    doctorName: doctors.find(d => d.id === parseInt(doctorId))?.name,
    patientName,
    date
  };
  
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend service running on port ${PORT}`);
});