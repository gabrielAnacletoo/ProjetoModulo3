import {Schema, model, InferSchemaType } from 'mongoose'


const TechnologySChema = new Schema({
    name: {type: String, require: true},
    count: { type: Number, default: 0}
}, { timestamps: true })

type TechnologyDocument = InferSchemaType<typeof TechnologySChema>
const Technology = model('technologys', TechnologySChema)

export { TechnologyDocument, Technology}