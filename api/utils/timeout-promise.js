async function handleRedirection(page, timeout = 1000) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('No hubo redirección'));
        }, timeout);
    });

    try {
        await Promise.race([
            Promise.all([
                page.click('#btnAceptar'),
                page.waitForNavigation({ waitUntil: 'networkidle2' }), // Esperar la redirección
            ]),
            timeoutPromise, // Temporizador
        ]);
    } catch (error) {
        throw new Error('No hubo redirección');
    }
}

module.exports = {
    handleRedirection,
};