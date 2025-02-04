const puppeteer = require('puppeteer-core');

// Configuración de Browserless
const BROWSERLESS_ENDPOINT = 'wss://chrome.browserless.io?token=RiIRSKoUJTKzUM7b3e324561b2845e1aa539058c89'; // Reemplaza TU_API_KEY con tu token

// Inicializa el navegador y la página
async function initializeBrowser() {
    let browser;
    try {
        // 1. Conectar a Browserless
        browser = await puppeteer.connect({
            browserWSEndpoint: BROWSERLESS_ENDPOINT,
        });

        // 2. Configuración avanzada de la página
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
        await page.setJavaScriptEnabled(true);
        await page.setDefaultNavigationTimeout(30000); // 30 segundos

        return { browser, page };

    } catch (error) {
        // 3. Mejor manejo de errores
        console.error("[PUPPETEER ERROR] Detalles completos:", {
            message: error.message,
            stack: error.stack,
        });

        throw new Error(`Fallo crítico al iniciar navegador: ${error.message}`);
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