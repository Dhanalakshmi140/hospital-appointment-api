import prisma from './prisma';

// Create a new patient
export async function createPatient(data: {
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
}) {
  return await prisma.patient.create({
    data: {
      name: data.name,
      email: data.email,
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.dateOfBirth !== undefined && {
        dateOfBirth: data.dateOfBirth,
      }),
    },
  });
}

// Find patient by ID
export async function getPatientById(id: number) {
  return await prisma.patient.findUnique({
    where: { id },
  });
}

// Find patient by email
export async function getPatientByEmail(email: string) {
  return await prisma.patient.findUnique({
    where: { email },
  });
}

// Update patient details
export async function updatePatient(
  id: number,
  data: {
    name?: string;
    email?: string;
    phone?: string;
  }
) {
  return await prisma.patient.update({
    where: { id },
    data,
  });
}

// Delete patient
export async function deletePatient(id: number) {
  return await prisma.patient.delete({
    where: { id },
  });
}