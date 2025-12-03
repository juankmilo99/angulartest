# 🧬 Detector de Mutantes

Proyecto para detectar mutantes basándose en secuencias de ADN. Identifica si un humano es mutante mediante la detección de secuencias de cuatro letras iguales consecutivas.

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (v16+)
- npm

### Instalación Rápida
```bash
git clone https://github.com/juankmilo99/angulartest.git
cd angulartest
npm run install-all
npm run dev
```

### URLs
- **Frontend:** http://localhost:4200
- **Backend API:** http://localhost:3000

## 📋 Función Principal

```javascript
function isMutant(dna) {
    // Recibe: array de strings representando matriz NxN
    // Retorna: boolean (true si es mutante, false si no)
}
```

### Ejemplo
```javascript
const dna = [
    "ATGCGA",
    "CAGTGC", 
    "TTATGT",
    "AGAAGG",
    "CCCCTA",
    "TCACTG"
];

isMutant(dna); // true - ES MUTANTE
```

## 🔧 Scripts Disponibles

```bash
npm run install-all     # Instala dependencias
npm run dev            # Inicia backend + frontend
npm run start-backend  # Solo backend
npm run start-frontend # Solo frontend
npm run test-backend   # Ejecuta pruebas
```

## 🌐 API Endpoints

### POST /mutant
Analiza una secuencia de ADN.

**Request:**
```json
{
    "dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
}
```

**Response (Mutante - 200):**
```json
{
    "isMutant": true,
    "message": "Es un mutante!"
}
```

**Response (Humano - 403):**
```json
{
    "isMutant": false,
    "message": "No es un mutante"
}
```

## 🎨 Características

- ✅ Algoritmo eficiente O(N²) con optimización
- ✅ Interfaz Angular moderna y responsiva
- ✅ Visualización colorizada de bases nitrogenadas
- ✅ Validación en tiempo real
- ✅ 12 pruebas unitarias
- ✅ API REST completa

## 🧮 Algoritmo

Detecta secuencias de 4 letras iguales en:
- ➡️ Horizontal
- ⬇️ Vertical  
- ↘️ Diagonal
- ↙️ Anti-diagonal

**Criterio:** Más de una secuencia = mutante

## 🧪 Testing

```bash
cd backend
npm test
```

**Resultados:** 12 tests pasando ✅

---

**Desarrollado por Juan Camilo**