const { initializeBrowser, navigateWithRetries} = require('../utils/handle-puppetear');
const {extractAllData, extractBasicData} = require('../utils/extract-data');
const {handleRedirection} = require('../utils/timeout-promise');

async function getAllDataRuc(ruc) {
    const url = 'https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp';

    try {
        const { browser, page } = await initializeBrowser();
        await navigateWithRetries(page, url);

        // Ingresar el RUC y hacer clic en el botón
        await page.type('#txtRuc', ruc);
        await page.click('#btnAceptar');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        // Competir entre la redirección y el temporizador
        //try {
        //    await handleRedirection(page, 1000);
        //} catch (error) {
        //    await browser.close();
        //    return { Error: 'Número de RUC inválido' };
        //}

        // Si hay redirección, extraer la información necesaria
        const information = await page.evaluate(() => {
            const h4Elements = Array.from(document.querySelectorAll('h4')).map(el => el.innerText);
            const pElements = Array.from(document.querySelectorAll('p')).map(el => el.innerText);
            const tdElements = Array.from(document.querySelectorAll('td')).map(el => el.innerText);

            return [h4Elements, pElements, tdElements];
        });

        const data = extractAllData(information);

        await browser.close();
        return data; // Retornar los datos extraídos
    } catch (error) {
        console.error(error);
        throw new Error('Error al buscar el RUC: ' + error.message);
    }
}

async function getBasicDataRuc(ruc) {
    const url = 'https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp';

    try {
        const { browser, page } = await initializeBrowser();
        await navigateWithRetries(page, url);

        await page.type('#txtRuc', ruc); // Ingresar el RUC
        await page.click('#btnAceptar');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        //try {
        //    await handleRedirection(page, 1000);
        //} catch (error) {
        //    await browser.close();
        //    return { Error: 'Número de RUC inválido' };
        //}

        // Si hay redirección, extraer la información necesaria
        const information = await page.evaluate(() => {
            const elementos = document.querySelectorAll('.list-group-item-heading');
            return elementos[1].innerText; // Selecciona el segundo elemento
        });

        const data = extractBasicData(information);

        await browser.close();
        return data; // Retornar los datos extraídos
    } catch (error) {
        console.error(error);
        throw new Error('Error al buscar el RUC: ' + error.message);
    }
}


module.exports= {getAllDataRuc, getBasicDataRuc};