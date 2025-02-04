CONSULTA DE RUC Y DNI EN SUNAT

Este sistema provee APIs que permiten consultar datos en el sistema de consultas SUNAT(Superintendencia Nacional de Aduanas y de Administración Tributaria) con referencia
a un codigo de identificación(DNI o RUC).

Consta de 3 endspoints: 
  1. Consulta de datos basicos en referencia a un DNI(DNI, nombres completos, ubicación y estado).
  2. Consulta de datos basicos en referencia a un RUC(RUC y razon social).
  3. Consulta de datos completos en referencia a un RUC(RUC, razon social, tipo de contribuyente, tipo de documento, etc. ).

Este sistema esta desarrollado en Express.js, usando como principal libreria Puppeteer lac cual proporciona una API de alto nivel para controlar Chrome o Firefox 
a través del protocolo DevTools o WebDriver BiDi.
