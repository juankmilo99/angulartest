const { isMutant } = require('./mutant-detector');

// Ejemplo de la prueba técnica
const dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];

console.log('🧬 Detector de Mutantes - Prueba Técnica');
console.log('==========================================');
console.log('Secuencia de ADN:');
dna.forEach((row, index) => {
    console.log(`Fila ${index + 1}: ${row}`);
});

console.log('\nAnalizando...\n');

const result = isMutant(dna);

console.log(`Resultado: ${result ? '👽 ES MUTANTE' : '👤 ES HUMANO'}`);

if (result) {
    console.log('✅ Se detectaron múltiples secuencias de 4 letras iguales');
} else {
    console.log('❌ No se detectaron suficientes secuencias mutantes');
}

console.log('\nPrueba técnica completada exitosamente! 🎉');