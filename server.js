/**
 * SERVER.JS - Servidor Express Principal
 * Backend para Dashboard de Monitoria de Call Center
 * 
 * DOCUMENTAÇÃO DAS APIs:
 * 
 * 1. GET /api/data/load
 *    - Propósito: Carrega todos os dados brutos (cache inicial)
 *    - Retorna: { monitorias, nomes, protocolosErrados, tma, tabulacao }
 *    - Uso: Chamado uma vez no início para popular o cache do frontend
 * 
 * 2. POST /api/data/filtered-metrics
 *    - Propósito: Filtra dados e retorna métricas processadas
 *    - Filtros: { periodo, ano, atendente, turno, monitor }
 *    - Retorna: { kpis, chartsData, quartilData, monitoriasList }
 *    - Uso: Atualiza dashboard quando filtros mudam
 * 
 * 3. POST /api/data/detailed-monitoring
 *    - Propósito: Retorna detalhes completos de uma monitoria
 *    - Params: { monitoriaId } ou { atendente }
 *    - Retorna: { monitoria }
 *    - Uso: Modal com detalhes da monitoria
 * 
 * 4. GET /api/data/performance-ranking
 *    - Propósito: Ranking de desempenho dos atendentes
 *    - Retorna: Array de { atendente, mediaMonitoria, mediaPesquisa, ... }
 *    - Uso: Gráfico e tabela de ranking
 * 
 * 5. GET /api/data/filters
 *    - Propósito: Opções para os filtros disponíveis
 *    - Retorna: { atendentes, turnos, monitores, anos, periodos }
 *    - Uso: Popular selects e dropdowns
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Importar rotas
const dataRoutes = require('./routes/dataRoutes');

// Usar rotas
app.use('/api/data', dataRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend está funcionando' });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Dashboard Backend - Call Center',
    version: '1.0.0',
    endpoints: [
      {
        method: 'GET',
        path: '/api/data/load',
        description: 'Carrega todos os dados brutos para cache inicial'
      },
      {
        method: 'POST',
        path: '/api/data/filtered-metrics',
        description: 'Retorna métricas filtradas (KPIs, gráficos, quartis)',
        bodyExample: {
          periodo: 'all|current|last|last3|1-12',
          ano: 'all|YYYY',
          atendente: 'all|nome',
          turno: 'all|Turno',
          monitor: 'all|Monitor'
        }
      },
      {
        method: 'POST',
        path: '/api/data/detailed-monitoring',
        description: 'Retorna detalhes de uma monitoria específica',
        bodyExample: {
          monitoriaId: 0,
          atendente: 'Nome Atendente'
        }
      },
      {
        method: 'GET',
        path: '/api/data/performance-ranking',
        description: 'Ranking de desempenho dos atendentes'
      },
      {
        method: 'GET',
        path: '/api/data/filters',
        description: 'Retorna opções para os filtros disponíveis'
      }
    ]
  });
});

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
    path: req.path
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 Dashboard Backend - Call Center Monitoring`);
  console.log(`🔗 Documentação da API: http://localhost:${PORT}`);
});

module.exports = app;
