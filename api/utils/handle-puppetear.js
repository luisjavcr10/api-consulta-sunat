const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
//const puppeteer = require('puppeteer');

// Inicializa el navegador y la página
async function initializeBrowser() {
    let browser;
    try {
        // 1. Configuración específica para Vercel
        const executablePath = await chromium.executablePath;
        
        // 2. Argumentos críticos para serverless
        const args = [
            ...chromium.args,
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--single-process",        // Reduce consumo de memoria
            "--no-zygote",             // Necesario para entornos efímeros
            "--disable-dev-shm-usage", // Evita usar /dev/shm
            "--disable-gpu",           // Mejor compatibilidad
            "--hide-scrollbars",       // Optimización visual
            "--enable-logging",        // Debugging
            "--v=1"                    // Nivel de verbosidad
        ];

        // 3. Lanzar el navegador con configuración optimizada
        browser = await puppeteer.launch({
            executablePath,
            args,
            headless: true, // Forzar headless (mejor rendimiento)
            ignoreHTTPSErrors: true,
            defaultViewport: {
                width: 1920,
                height: 1080,
                deviceScaleFactor: 1
            }
        });

        // 4. Configuración avanzada de la página
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
        await page.setJavaScriptEnabled(true);
        await page.setDefaultNavigationTimeout(30000); // 30 segundos

        return { browser, page };

    } catch (error) {
        // 5. Mejor manejo de errores
        console.error("[PUPPETEER ERROR] Detalles completos:", {
            message: error.message,
            stack: error.stack,
            chromiumPath: await chromium.executablePath
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
