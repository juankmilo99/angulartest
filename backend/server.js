const express = require('express');
const cors = require('cors');
const { isMutant } = require('./mutant-detector');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint para verificar si es mutante
app.post('/mutant', (req, res) => {
    try {
        const { dna } = req.body;
        
        // Validación de entrada
        if (!dna || !Array.isArray(dna)) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'DNA debe ser un array de strings'
            });
        }

        const result = isMutant(dna);
        
        if (result) {
            res.status(200).json({
                isMutant: true,
                message: 'Es un mutante!'
            });
        } else {
            res.status(403).json({
                isMutant: false,
                message: 'No es un mutante'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error procesando la secuencia de ADN'
        });
    }
});

// Endpoint de salud
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Mutant Detector API está funcionando'
    });
});

// Endpoint para obtener información de la API
app.get('/', (req, res) => {
    res.json({
        name: 'Mutant Detector API',
        version: '1.0.0',
        description: 'API para detectar mutantes basado en secuencias de ADN',
        endpoints: {
            'POST /mutant': 'Verifica si una secuencia de ADN corresponde a un mutante',
            'GET /health': 'Estado de la API',
            'GET /': 'Información de la API'
        },
        example: {
            request: {
                method: 'POST',
                url: '/mutant',
                body: {
                    dna: [
                        "ATGCGA",
                        "CAGTGC",
                        "TTATGT",
                        "AGAAGG",
                        "CCCCTA",
                        "TCACTG"
                    ]
                }
            },
            response: {
                isMutant: true,
                message: 'Es un mutante!'
            }
        }
    });
});

app.listen(PORT, () => {
    console.log(`🧬 Mutant Detector API ejecutándose en http://localhost:${PORT}`);
    console.log(`📖 Documentación disponible en http://localhost:${PORT}`);
});