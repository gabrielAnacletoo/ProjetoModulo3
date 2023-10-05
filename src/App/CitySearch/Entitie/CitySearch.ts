import { Schema, model, InferSchemaType } from 'mongoose';

const CitySearchSchema = new Schema({
  city: { type: String, required: true},
  technology : {  type: String, required: true},
  count: { type: Number, default: 0}
},{timestamps: true});


type CitySearchDocument  = InferSchemaType<typeof CitySearchSchema>
const CitySearch = model("citysearch", CitySearchSchema);

export { CitySearch, CitySearchDocument };


