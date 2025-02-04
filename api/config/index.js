const env = process.env.NODE_ENV || 'development';

console.log(`🛠 Cargando configuración para: ${env}`); // <-- Debug

const config = require(`./${env}.js`);

console.log(`🔍 Config actual:`, config); // <-- Debug

module.exports = config;
