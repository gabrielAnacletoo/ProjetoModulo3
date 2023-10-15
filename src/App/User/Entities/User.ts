import { Schema, model, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdm: {type: Boolean, default: false},
  favorites: [{ type: Schema.Types.ObjectId, ref: 'jobs', default: null }],
  history: [{type: String, default: null}]
},{timestamps: true});


type UserDocument  = InferSchemaType<typeof userSchema>
const User = model("user", userSchema);

export { User, UserDocument };
