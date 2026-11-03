import prisma from './prisma';

async function main() {
  const doctor1 = await prisma.doctor.upsert({
    where: { email: 'doctor1@hospital.com' },
    update: {},
    create: {
      name: 'Dr. Arun',
      specialty: 'Cardiology',
      email: 'doctor1@hospital.com',
    },
  });

  const doctor2 = await prisma.doctor.upsert({
    where: { email: 'doctor2@hospital.com' },
    update: {},
    create: {
      name: 'Dr. Priya',
      specialty: 'Neurology',
      email: 'doctor2@hospital.com',
    },
  });

  const patient1 = await prisma.patient.upsert({
    where: { email: 'patient1@hospital.com' },
    update: {},
    create: {
      name: 'Kumar',
      email: 'patient1@hospital.com',
      phone: '9876543210',
    },
  });

  const patient2 = await prisma.patient.upsert({
    where: { email: 'patient2@hospital.com' },
    update: {},
    create: {
      name: 'Meena',
      email: 'patient2@hospital.com',
      phone: '9876543211',
    },
  });

  await prisma.appointment.createMany({
    data: [
      {
        patientId: patient1.id,
        doctorId: doctor1.id,
        appointmentDate: new Date(Date.now() + 86400000),
        notes: 'Regular checkup',
      },
      {
        patientId: patient2.id,
        doctorId: doctor2.id,
        appointmentDate: new Date(Date.now() + 172800000),
        notes: 'Consultation',
      },
    ],
  });

  console.log('Seed completed successfully!');
  console.log({ doctor1, doctor2, patient1, patient2 });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });