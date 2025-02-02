const { initializeBrowser, navigateWithRetries } = require('../utils/handle-puppetear');

async function getBasicDataRuc(dni) {
    const url = 'https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp';
    try {
        const { browser, page } = await initializeBrowser();
        await navigateWithRetries(page, url);

        await page.click('#btnPorDocumento'); 
        await page.type('#txtNumeroDocumento', dni); 
        await page.click('#btnAceptar');
 
        // Espera a que la página cargue la información
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        const information = await page.evaluate(() => {
            const h4Elements =  Array.from(document.querySelectorAll('h4')).map(el => el.innerText);
            const pElements = Array.from(document.querySelectorAll('p')).map(el => el.innerText); 
            const span =  Array.from(document.querySelectorAll('span')).map(el => el.innerText);
            const strongElements = Array.from(document.querySelectorAll('strong')).map(el => el.innerText);
            return [h4Elements,span,pElements,strongElements];
        });

        await browser.close();

        if(information[3][0].includes('RUC NO REGISTRA')){
            return { Mensaje: information[3][0]}
        }

        return {
            Dni: dni,
            Nombres:information[0][1],
            Ubicacion:information[2][0].slice(11),
            Estado:(information[1][0]==='ACTIVO'? true: false),
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error al buscar el DNI');
    }
}

module.exports={getBasicDataRuc}