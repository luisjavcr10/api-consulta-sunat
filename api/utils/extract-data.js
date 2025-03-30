const { parseDate } = require('./parse-date');

function extractAllData(information) {
    const getSafeValue = (array, index, defaultValue = null) => {
        return array && array[index] ? array[index] : defaultValue;
    };

    return {
        ruc: getSafeValue(information[0], 1, '').slice(0, 11),
        razonSocial: getSafeValue(information[0], 1, '').slice(14),
        tipoContribuyente: getSafeValue(information[1], 0),
        tipoDocumento: getSafeValue(information[1], 1),
        nombreComercial: getSafeValue(information[1], 2) === '-' ? null : getSafeValue(information[1], 2),
        fechaInscripcion: parseDate(getSafeValue(information[1], 3)),
        fechaInicioActividades: parseDate(getSafeValue(information[1], 4)),
        estadoContribuyente: getSafeValue(information[1], 5),
        condicionContribuyente: getSafeValue(information[1], 6),
        domicilioFiscal: getSafeValue(information[1], 7) === '-' ? null : getSafeValue(information[1], 7),
        sistemaEmesionComprobante: getSafeValue(information[1], 8),
        actividadComercialExterior: getSafeValue(information[1], 9)==='SIN ACTIVIDAD'? false : true,
        sistemaContabilidad: getSafeValue(information[1], 10),
        actividadEconomica: getSafeValue(information[2], 0),
        comprobantesPago: getSafeValue(information[2], 1),
        sistemaEmisionElectronica: getSafeValue(information[2], 2, '').slice(0, -17),
        fechaSistemaEmisionElectronica: parseDate(getSafeValue(information[2], 2, '').slice(-10)),
        fechaEmisorElectronico: parseDate(getSafeValue(information[1], 11)),
        comprobantesElectronicos: getSafeValue(information[1], 12, '').slice(0, 20),
        fechaComprobantesElectronicos: parseDate(getSafeValue(information[1], 12, '').slice(-11, -1)),
        fechaAliacionPLE: getSafeValue(information[1], 13) === '-' ? null : getSafeValue(information[1], 13),
        padrones: getSafeValue(information[2], 3)
    };
}

function extractBasicData(information) {
    const getSafeValue = (data)=>{
        return (data ? data : null);
    }
    return{
        ruc: getSafeValue(information.slice(0,11)),
        razonSocial:getSafeValue(information.slice(14)),
    }
}

module.exports= {extractAllData, extractBasicData}