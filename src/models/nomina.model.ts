import { Schema, model, Types } from 'mongoose';
import { INomina } from '../interfaces/INomina';

const nominaSchema: Schema<INomina> = new Schema({
    idEmployee: {
        type: String, 
        ref: 'Employee'
    },
    idCompanies: {
        type: Types.ObjectId,
        ref: 'Companies'
    },
    salario: { type: Number },
    salqincenal: { type: Number },
    ingresos: {
        incentivo: { type: Number },
        comision: { type: Number },
        bonificacion: { type: Number },
        combustible: { type: Number },
        horasExtras: { type: Number },
        reembolsos: { type: Number },
        vacaciones: { type: Number },
    },
    totalIngresos: { type: Number },
    descuentos: {
        isr: { type: Number },
        afp: { type: Number },
        ars: { type: Number },
        ahorroCoop: { type: Number },
        prestamoCoop: { type: Number },
        uniformes: { type: Number },
        diasNoLab: { type: Number },
    },
    totalDescuentos: { type: Number },
    totalNeto: { type: Number },
    periodo: {
        year: {type: Number},
        month: {type: Number},
        quincena: {type: Number, enum: [1,2]},
    }
}, {
    versionKey: false,
    timestamps: false
})

const Nomina = model<INomina>('Nomina', nominaSchema);
export default Nomina;