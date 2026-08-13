import prisma from "./lib/prisma";

import {
  createPatient,
  getPatient,
  searchPatients,
  updatePatientPhone,
  deletePatient,
} from "./patients";

import {
  createDoctor,
  getDoctor,
  listDoctorsBySpecialty,
  deleteDoctor,
} from "./doctors";

import {
  bookAppointment,
  getAppointmentFull,
  getDoctorUpcomingAppointments,
  setAppointmentStatus,
  cancelAllPatientAppointments,
  deleteAppointment,
} from "./appointments";

async function main() {
  console.log("── Patients ──────────────────────────");

  const patient = await createPatient({
    name: "Test Patient",
    email: "test.patient@example.com",
    phone: "9999999999",
  });

  console.log("Created:", patient.name, patient.id);

  const found = await getPatient(patient.id);
  console.log("Found:", found.name);

  const updated = await updatePatientPhone(
    patient.id,
    "8888888888"
  );

  console.log("Updated phone:", updated.phone);

  const results = await searchPatients("Test");
  console.log("Search results:", results.length);

  console.log("── Doctors ───────────────────────────");

  const doctor = await createDoctor({
    name: "Dr. Test",
    specialty: "General Medicine",
    email: "dr.test@hospital.io",
  });

  console.log("Created:", doctor.name, doctor.id);

  const foundDoctor = await getDoctor(doctor.id);
  console.log("Found doctor:", foundDoctor.name);

  const specialists = await listDoctorsBySpecialty("General");

  console.log(
    "General Medicine doctors:",
    specialists.length
  );

  console.log("── Appointments ──────────────────────");

  const appt = await bookAppointment(
    patient.id,
    doctor.id,
    new Date("2026-09-20T09:00:00"),
    "Initial consultation"
  );

  console.log(
    "Booked:",
    appt.id,
    "for",
    appt.patient.name
  );

  const full = await getAppointmentFull(appt.id);

  console.log(
    "Full fetch:",
    full.patient.name,
    "with",
    full.doctor.name
  );

  const schedule =
    await getDoctorUpcomingAppointments(doctor.id);

  console.log(
    "Doctor schedule:",
    schedule.length,
    "appointment(s)"
  );

  const cancelled =
    await setAppointmentStatus(
      appt.id,
      "cancelled"
    );

  console.log(
    "Status updated to:",
    cancelled.status
  );

  const cancelledCount =
    await cancelAllPatientAppointments(patient.id);

  console.log(
    "Cancelled patient appointments:",
    cancelledCount
  );

  console.log("── Cleanup ───────────────────────────");

  await deleteAppointment(appt.id);
  await deletePatient(patient.id);
  await deleteDoctor(doctor.id);

  console.log("Test data cleaned up.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());