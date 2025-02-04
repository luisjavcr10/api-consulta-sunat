const chromium = require('chrome-aws-lambda');
const puppeteerCore = require('puppeteer-core');
const puppeteer = require('puppeteer');

// Inicializa el navegador y la página
async function initializeBrowser() {
    console.log("Chromium executable path:", await chromium.executablePath);

    let browser;
    try {
        if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
            // Si está en AWS Lambda o Vercel, usar chrome-aws-lambda
            browser = await puppeteerCore.launch({
                executablePath: await chromium.executablePath || null,
                args: [
                    ...chromium.args,
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--disable-gpu',
                ],
                defaultViewport: chromium.defaultViewport,
                headless: chromium.headless,
            });
        } else {
            // Si está en local, usar Puppeteer normal
            browser = await puppeteer.launch({
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--disable-gpu',
                ],
            });
        }

        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        return { browser, page };
    } catch (error) {
        console.error('Error al lanzar Puppeteer:', error);
        throw new Error('No se pudo iniciar el navegador Puppeteer.');
    }
}


// Navega a la URL con reintentos
async function navigateWithRetries(page, url, retries = 5, timeout = 20000) {
    while (retries > 0) {
        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout });
            break;
        } catch (error) {
            retries--;
            console.log(`Intento fallido, reintentos restantes: ${retries}`);
            if (retries === 0) throw error;
        }
    }
}

module.exports = { initializeBrowser, navigateWithRetries };
