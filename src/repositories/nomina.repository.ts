import mongoose from "mongoose";
import Employee from "../models/employee.model";
import Nomina from "../models/nomina.model";
import { INomina } from '../interfaces/INomina';

export class NominaRepository {

    constructor() {
    }

    getAll = async () => {
        const nominaList = await Nomina.find();
        return nominaList;
    }

    getOne = async (id: string) => {
        const nominaList = await Nomina.findById(id);
        return nominaList;
    }

    getByCompanies = async (idCompanies: string) => {
        const nominaList = await Nomina.find({ idCompanies })
        return nominaList;
    }

    generateNomina = async (idCompanies: string) => {
        const date: Date = new Date();

        if (date.getDay() >= 1 && date.getDate() < 15) {
            const nomina = await Nomina.findOne({ periodo: { year: date.getFullYear(), month: date.getMonth(), quincena: 1 } })

            if (!nomina)
                return this.generateFirstQuincena(idCompanies);
            else
                return false
        }
        else if (date.getDay() >= 15 && date.getDate() < 31) {
            
            const nomina = await Nomina.findOne({ periodo: { year: date.getFullYear(), month: date.getMonth(), quincena: 1 } })

            if (!nomina)
                return this.generateSecondQuincena(idCompanies);
            else
                return false

        }
    }

    generateFirstQuincena = async (idCompanies: string) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        const nominaList: INomina[] = [];
        const employeeList = (await Employee.find({ idCompanies }))
            .forEach(employee => {
                let nomina: INomina = {
                    idEmployee: employee._id,
                    idCompanies,
                    descuentos: {
                        ars: employee.hasArs ? (employee.salary * 3.04 / 100) : 0,
                        afp: employee.hasAfp ? (employee.salary * 2.87 / 100) : 0
                    },
                    salario: employee.salary,
                    salqincenal: employee.salary / 2,
                    periodo: {
                        year: new Date().getFullYear(),
                        month: new Date().getMonth(),
                        quincena: 1
                    }
                }
                nomina = {
                    ...nomina,
                    totalDescuentos: ((nomina.descuentos?.afp || 0) + (nomina.descuentos?.ars || 0))
                }
                nomina = {
                    ...nomina,
                    totalNeto: ((nomina.salario || 0) - (nomina.totalDescuentos || 0))
                }
                nominaList.push(nomina)
            })
        await Nomina.insertMany(nominaList);
        await session.commitTransaction();

        return true;
    }

    generateSecondQuincena = async (idCompanies: string) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        const nominaList: INomina[] = [];
        const employeeList = (await Employee.find({ idCompanies }))
            .forEach(employee => {
                let nomina: INomina = {
                    idEmployee: employee._id,
                    idCompanies,
                    descuentos: {
                        isr: employee.hasIrs ? (employee.salary * 5.04 / 100) : 0,
                    },
                    salario: employee.salary,
                    salqincenal: employee.salary / 2,
                    periodo: {
                        year: new Date().getFullYear(),
                        month: new Date().getMonth(),
                        quincena: 2
                    }
                }
                nomina = {
                    ...nomina,
                    totalDescuentos: nomina.descuentos?.afp || 0
                }
                nomina = {
                    ...nomina,
                    totalNeto: ((nomina.salario || 0) - (nomina.totalDescuentos || 0))
                }
                nominaList.push(nomina)
            })
        await Nomina.insertMany(nominaList);
        await session.commitTransaction();

        return true;
    }

    update = async (idNomina: string, doc: {}) => {
        let nomina = await Nomina.updateOne({ _id: idNomina }, { $set: doc });

        for (const key in doc) {
            if (key.includes('ingresos') || key.includes('descuentos'))
                return this.updateIfIngresoOrDescuentoChange(idNomina);
        }

        return nomina;
    }

    updateIfIngresoOrDescuentoChange = async (idNomina: string) => {
        console.log("tiene un descuento o un ingreso")
        const nomina = await Nomina.findById(idNomina);
        let des = { ...nomina?.descuentos }
        const ingre = { ...nomina?.ingresos }
        let data = {
            totalIngresos: (ingre.incentivo || 0) + (ingre.comision || 0) + (ingre.bonificacion || 0) + (ingre.combustible || 0) + (ingre.horasExtras || 0) + (ingre.reembolsos || 0) + (ingre.vacaciones || 0),
            totalDescuentos: (des.isr || 0) + (des.afp || 0) + (des.ars || 0) + (des.ahorroCoop || 0) + (des.prestamoCoop || 0) + (des.Uniformes || 0) + (des.diasNoLab || 0),
            totalNeto: 0
        }
        data = {
            ...data,
            totalNeto: (nomina?.salario || 0) + data.totalIngresos - data.totalDescuentos
        }

        const updateNomina = await Nomina.updateOne({ _id: idNomina }, { $set: data });
        return updateNomina;
    }

}





