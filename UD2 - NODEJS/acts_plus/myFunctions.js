/***************************************************
// myFunctions.js
// 3.6 NodeJS. Módulo net. Ejemplo 3
// transparencia 37 del tema 2. ejemplo ampliado.
// fichero auxiliar, importado por netServer3.js
***************************************************/

exports.fact = fact
exports.fibo = fibo

function fact(n) { 
    return (n < 2) ? 1 : n * fact(n - 1) 
}

function fibo(n) { 
    return (n < 2) ? 1 : fibo(n - 2) + fibo(n - 1) 
}