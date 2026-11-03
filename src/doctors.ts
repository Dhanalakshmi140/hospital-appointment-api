import prisma from './prisma';

// Create a new doctor
export async function createDoctor(data: {
  name: string;
  specialty: string;
  email: string;
}) {
  return await prisma.doctor.create({
    data,
  });
}

// Get doctor by ID
export async function getDoctorById(id: number) {
  return await prisma.doctor.findUnique({
    where: { id },
  });
}

// Get doctor by email
export async function getDoctorByEmail(email: string) {
  return await prisma.doctor.findUnique({
    where: { email },
  });
}

// List all doctors
export async function getAllDoctors() {
  return await prisma.doctor.findMany();
}

// Update doctor
export async function updateDoctor(
  id: number,
  data: {
    name?: string;
    specialty?: string;
    email?: string;
  }
) {
  return await prisma.doctor.update({
    where: { id },
    data,
  });
}

// Delete doctor
export async function deleteDoctor(id: number) {
  return await prisma.doctor.delete({
    where: { id },
  });
}