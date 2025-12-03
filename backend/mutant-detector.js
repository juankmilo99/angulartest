/**
 * Detector de mutantes basado en secuencias de ADN
 * 
 * Detecta si un humano es mutante encontrando más de una secuencia 
 * de cuatro letras iguales en forma horizontal, vertical u oblicua.
 * 
 * @param {string[]} dna - Array de strings que representa la matriz de ADN (NxN)
 * @returns {boolean} - true si es mutante, false si no
 */
function isMutant(dna) {
    // Validaciones básicas
    if (!dna || dna.length === 0) return false;
    
    const n = dna.length;
    
    // Verificar que sea una matriz NxN válida
    if (dna.some(row => row.length !== n)) return false;
    
    // Verificar que solo contenga bases nitrogenadas válidas
    const validBases = /^[ATCG]+$/;
    if (dna.some(row => !validBases.test(row))) return false;
    
    let sequencesFound = 0;
    const matrix = dna.map(row => row.split(''));
    
    // Funciones auxiliares para verificar secuencias
    const directions = [
        [0, 1],  // horizontal →
        [1, 0],  // vertical ↓
        [1, 1],  // diagonal ↘
        [1, -1]  // diagonal ↙
    ];
    
    /**
     * Verifica si hay una secuencia de 4 caracteres iguales desde una posición dada
     * @param {number} row - fila inicial
     * @param {number} col - columna inicial
     * @param {number} deltaRow - dirección fila
     * @param {number} deltaCol - dirección columna
     * @returns {boolean} - true si encuentra secuencia de 4
     */
    function hasSequence(row, col, deltaRow, deltaCol) {
        const char = matrix[row][col];
        
        for (let i = 1; i < 4; i++) {
            const newRow = row + (i * deltaRow);
            const newCol = col + (i * deltaCol);
            
            // Verificar límites
            if (newRow < 0 || newRow >= n || newCol < 0 || newCol >= n) {
                return false;
            }
            
            // Verificar si el carácter es igual
            if (matrix[newRow][newCol] !== char) {
                return false;
            }
        }
        
        return true;
    }
    
    // Recorrer la matriz buscando secuencias
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // Probar cada dirección desde la posición actual
            for (const [deltaRow, deltaCol] of directions) {
                if (hasSequence(i, j, deltaRow, deltaCol)) {
                    sequencesFound++;
                    
                    // Optimización: si ya encontramos más de una secuencia, es mutante
                    if (sequencesFound > 1) {
                        return true;
                    }
                }
            }
        }
    }
    
    return false;
}

module.exports = { isMutant };