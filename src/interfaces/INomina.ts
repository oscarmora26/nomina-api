export interface INomina {
    idEmployee?: string,
    idCompanies?: string,
    salario?: number,
    salqincenal?: number,
    ingresos?: {
        incentivo?: number,
        comision?: number,
        bonificacion?: number,
        combustible?: number,
        horasExtras?: number,
        reembolsos?: number,
        vacaciones?: number,
    },
    totalIngresos?: number,
    descuentos?: {
        isr?: number,
        afp?: number,
        ars?: number,
        ahorroCoop?: number,
        prestamoCoop?: number,
        Uniformes?: number,
        diasNoLab?: number,        
    },
    totalDescuentos?: number,
    totalNeto?: number,
    periodo?: {
        year?: number,
        month?: number,
        quincena?: number
    }
}