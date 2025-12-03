const { isMutant } = require('./mutant-detector');

describe('Mutant Detector', () => {
    describe('Valid mutant cases', () => {
        test('should detect mutant with horizontal and vertical sequences', () => {
            const dna = [
                "ATGCGA",
                "CAGTGC",
                "TTATGT",
                "AGAAGG",
                "CCCCTA",
                "TCACTG"
            ];
            expect(isMutant(dna)).toBe(true);
        });

        test('should detect mutant with diagonal sequences', () => {
            const dna = [
                "ATGCGA",
                "CAGTGC",
                "TTGTGT",
                "AGAAGG",
                "CCCCTA",
                "TCACTG"
            ];
            expect(isMutant(dna)).toBe(true);
        });

        test('should detect mutant with multiple horizontal sequences', () => {
            const dna = [
                "AAAACG",
                "CAGTGC",
                "TTTTGT",
                "AGAAGG",
                "CCCCTA",
                "TCACTG"
            ];
            expect(isMutant(dna)).toBe(true);
        });

        test('should detect mutant with anti-diagonal sequence', () => {
            const dna = [
                "ATGCAA",
                "CAGTAC",
                "TTATGT",
                "AGAAGG",
                "CCCCTA",
                "TCACTG"
            ];
            expect(isMutant(dna)).toBe(true);
        });
    });

    describe('Non-mutant cases', () => {
        test('should not detect mutant with only one sequence', () => {
            const dna = [
                "ATGCGA",
                "CAGTGC",
                "TTATTT",
                "AGACGG",
                "GCGTCA",
                "TCACTG"
            ];
            expect(isMutant(dna)).toBe(false);
        });

        test('should not detect mutant with no sequences', () => {
            const dna = [
                "ATGCGA",
                "CAGTGC",
                "TTATGT",
                "AGACGG",
                "GCGTCA",
                "TCACTG"
            ];
            expect(isMutant(dna)).toBe(false);
        });

        test('should handle 4x4 matrix correctly', () => {
            const dna = [
                "ATGC",
                "CAGT",
                "TTAT",
                "AGAC"
            ];
            expect(isMutant(dna)).toBe(false);
        });
    });

    describe('Edge cases', () => {
        test('should return false for empty array', () => {
            expect(isMutant([])).toBe(false);
        });

        test('should return false for null input', () => {
            expect(isMutant(null)).toBe(false);
        });

        test('should return false for invalid characters', () => {
            const dna = [
                "ATGCGA",
                "CAGTGC",
                "TTXTGT",
                "AGAAGG",
                "CCCCTA",
                "TCACTG"
            ];
            expect(isMutant(dna)).toBe(false);
        });

        test('should return false for non-square matrix', () => {
            const dna = [
                "ATGCGA",
                "CAGTGC",
                "TTATGT",
                "AGAAGG",
                "CCCCTA"
            ];
            expect(isMutant(dna)).toBe(false);
        });

        test('should handle minimum valid mutant case', () => {
            const dna = [
                "AAAA",
                "TTTT",
                "CCCC",
                "GGGG"
            ];
            expect(isMutant(dna)).toBe(true);
        });
    });
});