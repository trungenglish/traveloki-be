import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'airport';
const COLLECTION_NAME = 'airports';

const AirportSchema = new Schema(
  {
    AirportCode: { type: String, required: true },
    AirportName: { type: String, required: true, maxlength: 100 },
    City: { type: String, required: true, maxlength: 100 }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

export const Airport = model(DOCUMENT_NAME, AirportSchema);
