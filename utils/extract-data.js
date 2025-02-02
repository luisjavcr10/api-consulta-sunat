const { parseDate } = require('./parse-date');

function extractAllData(information) {
    const getSafeValue = (array, index, defaultValue = null) => {
        return array && array[index] ? array[index] : defaultValue;
    };

    return {
        Ruc: getSafeValue(information[0], 1, '').slice(0, 11),
        Nombres: getSafeValue(information[0], 1, '').slice(14),
        TipoContribuyente: getSafeValue(information[1], 0),
        TipoDocumento: getSafeValue(information[1], 1),
        NombreComercial: getSafeValue(information[1], 2) === '-' ? null : getSafeValue(information[1], 2),
        FechaInscripcion: parseDate(getSafeValue(information[1], 3)),
        FechaInicioActividades: parseDate(getSafeValue(information[1], 4)),
        EstadoContribuyente: getSafeValue(information[1], 5),
        CondicionContribuyente: getSafeValue(information[1], 6),
        DomicilioFiscal: getSafeValue(information[1], 7) === '-' ? null : getSafeValue(information[1], 7),
        SistemaEmesionComprobante: getSafeValue(information[1], 8),
        ActividadComercialExterior: getSafeValue(information[1], 9)==='SIN ACTIVIDAD'? false : true,
        SistemaContabilidad: getSafeValue(information[1], 10),
        ActividadEconomica: getSafeValue(information[2], 0),
        ComprobantesPago: getSafeValue(information[2], 1),
        SistemaEmisionElectronica: getSafeValue(information[2], 2, '').slice(0, -17),
        FechaSistemaEmisionElectronica: parseDate(getSafeValue(information[2], 2, '').slice(-10)),
        FechaEmisorElectronico: parseDate(getSafeValue(information[1], 11)),
        ComprobantesElectronicos: getSafeValue(information[1], 12, '').slice(0, 20),
        FechaComprobantesElectronicos: parseDate(getSafeValue(information[1], 12, '').slice(-11, -1)),
        FechaAliacionPLE: getSafeValue(information[1], 13) === '-' ? null : getSafeValue(information[1], 13),
        Padrones: getSafeValue(information[2], 3)
    };
}

function extractBasicData(information) {
    const getSafeValue = (data)=>{
        return (data ? data : null);
    }
    return{
        Ruc: getSafeValue(information.slice(0,11)),
        Nombres:getSafeValue(information.slice(14)),
    }
}

module.exports= {extractAllData, extractBasicData}