import { Schema, model, InferSchemaType } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'


const JobsSchema = new Schema({
  position: { type: String, required: true, enum: ['junior', 'pleno', 'senior'], default: null },//junior, pleno , senior
  salary: { type: String, required: true},//salario
  jobcontract: {type: String, required: true, enum: ['clt', 'pj'], default:null },//clt ou pj
  localtype: {type: String, required:true, enum: ['hibrido', 'remoto', 'presencial'], default: null},//hibrido , remoto, presencial
  city: { type: String, required: true}, //cidade
  // UF: { type: String, required: true}, //Estado
  technology : [{ type: String, required: true}],//tecnologia
  website: { type: String, required: true},//link da empresa
  company: { type: String, required: true }, //nome da empresa
  companysize: { type: String, required: true, enum: ['pequena', 'media', 'grande'], default: null }, //tamanho da empresa
  description: { type: String, required: true },//descrição da vaga
  link: { type: String, required: true },//nao entendi

},{timestamps: true});

// Adicionar o plugin de paginação nesse esquema
JobsSchema.plugin(mongoosePaginate)


type JobsDocument  = InferSchemaType<typeof JobsSchema>
const Jobs = model("jobs", JobsSchema);

export { Jobs, JobsDocument };
