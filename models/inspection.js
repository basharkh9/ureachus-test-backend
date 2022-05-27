import Joi from "joi";
import mongoose from "mongoose";

const Inspection = mongoose.model(
  "Inspections",
  new mongoose.Schema({
    inspectionId: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    inspectionNumber: {
      type: Number,
      required: true,
    },
    certificate: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
      min: 0,
      max: 255,
    },
    industrySector: {
      type: String,
      required: true,
      min: 0,
      max: 255,
    },
    city: {
      type: String,
      required: true,
      min: 0,
      max: 255,
    },
    inspectionResult: {
      type: String,
      enum: ["No Violation Issued", "Violation Issued", "Pass", "Fail"],
      required: true,
    },
    inspectionDate: {
      type: Date,
      required: true,
    },
    enabled: {
      type: Boolean,
      default: false,
    },
  })
);

function validateInspection(inspection) {
  const schema = Joi.object({
    inspectionNumber: Joi.number().required(),
    inspectionId: Joi.string().min(3).max(255).required(),
    industrySector: Joi.string().min(3).max(255).required(),
    certificate: Joi.string().min(3).required(),
    businessName: Joi.string().min(3).max(255).required(),
    city: Joi.string().min(3).max(255).required(),
    inspectionResult: Joi.string().min(3).max(255).required(),
    inspectionDate: Joi.date().required(),
    enabled: Joi.boolean(),
  });

  return schema.validate(inspection);
}

export { Inspection, validateInspection };
