import prisma from './prisma';
import {
  createPatient,
  getPatientByEmail,
  updatePatient,
  deletePatient,
} from './patients';
import {
  createDoctor,
  getAllDoctors,
} from './doctors';
import {
  createAppointment,
  getAppointmentById,
  getUpcomingAppointments,
  cancelAppointment,
} from './appointments';

async function main() {
  console.log('--- PATIENT CRUD TEST ---');

  const patient = await createPatient({
    name: 'Test Patient',
    email: `test${Date.now()}@hospital.com`,
    phone: '9999999999',
  });
  console.log('Patient created:', patient);

  console.log('Patient found:', await getPatientByEmail(patient.email));

  console.log('Patient updated:', await updatePatient(patient.id, {
    name: 'Updated Patient',
  }));

  console.log('--- DOCTOR TEST ---');

  const doctor = await createDoctor({
    name: 'Dr. Test',
    specialty: 'General Medicine',
    email: `doctor${Date.now()}@hospital.com`,
  });
  console.log('Doctor created:', doctor);
  console.log('All doctors:', await getAllDoctors());

  console.log('--- APPOINTMENT TEST ---');

  const appointment = await createAppointment({
    patientId: patient.id,
    doctorId: doctor.id,
    appointmentDate: new Date(Date.now() + 86400000),
    notes: 'Test appointment',
  });
  console.log('Appointment created:', appointment);

  console.log('Appointment details:', await getAppointmentById(appointment.id));
  console.log('Upcoming appointments:', await getUpcomingAppointments());

  console.log('Cancelled appointment:', await cancelAppointment(appointment.id));

  await deletePatient(patient.id);
  console.log('Patient deleted successfully');

  await prisma.doctor.delete({ where: { id: doctor.id } });
  console.log('Doctor deleted successfully');

  console.log('--- ALL TESTS COMPLETED ---');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });