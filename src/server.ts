import express from "express";
import { prisma } from "./lib/prisma";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Hospital Appointment API is running",
  });
});

app.get("/db-test", async (_req, res) => {
  try {
    const patients = await prisma.patient.findMany();

    res.json({
      success: true,
      patients,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});