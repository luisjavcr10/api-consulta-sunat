const puppeteer = require('puppeteer');

// Inicializa el navegador y la página
async function initializeBrowser() {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
        ],
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    return { browser, page };
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

async function enterRucAndClick(page, ruc) {
    await page.type('#txtRuc', ruc); // Ingresar el RUC
     // Hacer clic en el botón
}

module.exports = { initializeBrowser, navigateWithRetries, enterRucAndClick};