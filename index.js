import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Inspection, validateInspection } from "./models/inspection.js";

const app = express();
app.use(json());

mongoose
  .connect("mongodb://localhost/ureachustest")
  .then(() => console.log("Connected to MongoDB..."));

let corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
const PORT = 3000;

app.get("/api/inspections", async (req, res) => {
  let sortBy = req.query ? req.query.sortBy : "inspectionNumber";
  sortBy = req.query.isSortAscending ? "-" + sortBy : sortBy;
  const inspections = await Inspection.find().sort(`${sortBy}`);
  res.send({ totalitems: inspections.length, inspections: inspections });
});
app.post("/api/inspections", async (req, res) => {
  const { error } = validateInspection(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  const inspection = new Inspection({
    inspectionNumber: req.body.inspectionNumber,
    inspectionId: req.body.inspectionId,
    certificate: req.body.certificate,
    businessName: req.body.businessName,
    industrySector: req.body.industrySector,
    city: req.body.city,
    inspectionDate: req.body.inspectionDate,
    inspectionResult: req.body.inspectionResult,
    enabled: req.body.enabled,
  });

  await inspection.save();

  res.send(inspection);
});

app.listen(PORT, () => {
  console.log(`Backend is listening on port ${PORT}`);
});
