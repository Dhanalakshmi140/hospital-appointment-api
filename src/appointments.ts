import prisma from './prisma';

export async function createAppointment(data: {
  patientId: number;
  doctorId: number;
  appointmentDate: Date;
  notes?: string;
}) {
  return prisma.appointment.create({
    data,
  });
}

export async function getAppointmentById(id: number) {
  return prisma.appointment.findUnique({
    where: { id },
    include: { patient: true, doctor: true },
  });
}

export async function getAllAppointments() {
  return prisma.appointment.findMany({
    include: { patient: true, doctor: true },
  });
}

export async function cancelAppointment(id: number) {
  return prisma.appointment.update({
    where: { id },
    data: { status: 'cancelled' },
  });
}

export async function getUpcomingAppointments() {
  return prisma.appointment.findMany({
    where: {
      appointmentDate: { gte: new Date() },
      status: 'scheduled',
    },
    include: { patient: true, doctor: true },
    orderBy: { appointmentDate: 'asc' },
  });
}