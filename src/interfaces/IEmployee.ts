import { Document } from 'mongoose'

export interface IEmployee extends Document {
    email: string, 
    password: string,
    cedula: string,
    firstName: string,
    lastName: string,
    gender: string,
    admissionDate: Date
    driversLicense: string,
    phones: {
        homePhone: string
        cellPhone: string
    },
    adress: {
        city: string,
        street: string,
        numberHome: string
    },
    informationBank: {
        Bank: string,
        bankAccountType: string,
        accountNumber: string
    },
    hasArs: boolean,
    hasAfp: boolean,
    hasIrs: boolean,
    salary: number,
    rol: string,
    idCompanies: any,
    idDepartment: any,
    idJob: any,
}