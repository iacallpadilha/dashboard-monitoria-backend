/**
 * ROUTES - Rotas da API REST
 */

const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const mockData = require('../data/mockData');

/**
 * GET /api/data/load
 * Retorna todos os dados brutos (para cache inicial do frontend)
 */
router.get('/load', (req, res) => {
  try {
    // Processa os dados
    const dadosProcessados = dataController.processarDados(
      mockData.monitorias,
      mockData.pesquisas
    );

    res.json({
      success: true,
      data: {
        monitorias: dadosProcessados,
        nomes: mockData.nomes,
        protocolosErrados: mockData.protocolosErrados,
        tma: mockData.tma,
        tabulacao: mockData.tabulacaoAtendente
      }
    });
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/data/filtered-metrics
 * Recebe filtros e retorna métricas processadas
 * 
 * Body esperado:
 * {
 *   periodo: 'all|current|last|last3|1-12',
 *   ano: 'all|YYYY',
 *   atendente: 'all|nome',
 *   turno: 'all|Turno',
 *   monitor: 'all|Monitor'
 * }
 */
router.post('/filtered-metrics', (req, res) => {
  try {
    const filtros = {
      periodo: req.body.periodo || 'all',
      ano: req.body.ano || 'all',
      atendente: req.body.atendente || 'all',
      turno: req.body.turno || 'all',
      monitor: req.body.monitor || 'all',
      dadosNomes: mockData.nomes
    };

    // Processa dados brutos
    const dadosProcessados = dataController.processarDados(
      mockData.monitorias,
      mockData.pesquisas
    );

    // Aplica filtros
    const dadosFiltrados = dataController.aplicarFiltros(dadosProcessados, filtros);

    // Calcula KPIs
    const kpis = dataController.calcularKPIs(dadosFiltrados, filtros.atendente);

    // Gera dados para gráficos
    const chartsData = dataController.gerarDadosGraficos(dadosFiltrados, filtros.atendente);

    // Calcula quartis
    const quartilData = dataController.calcularQuartis(dadosFiltrados);

    // Prepara lista de monitorias (últimas, paginadas)
    const monitoriasReais = dadosFiltrados.filter(d => d.notaTotal);
    const monitoriasOrdenadas = monitoriasReais.sort((a, b) =>
      dataController.parseDataParaComparacao(b.data) - dataController.parseDataParaComparacao(a.data)
    );

    const monitoriasList = monitoriasOrdenadas.slice(0, 50).map(m => ({
      data: m.data,
      atendente: m.atendente,
      notaTotal: m.notaTotal,
      tipoLigacao: m.tipoLigacao,
      telefoneCliente: m.telefoneCliente,
      protocolo: m.protocolo,
      feedback: m.feedbackSupervisor
    }));

    res.json({
      success: true,
      kpis,
      chartsData,
      quartilData,
      monitoriasList,
      totalMonitorias: monitoriasOrdenadas.length,
      filtrosAplicados: filtros
    });
  } catch (error) {
    console.error('Erro ao calcular métricas:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/data/detailed-monitoring
 * Retorna detalhes completos de uma monitoria específica
 * 
 * Body esperado:
 * {
 *   monitoriaId: índice ou data
 * }
 */
router.post('/detailed-monitoring', (req, res) => {
  try {
    const { monitoriaId, atendente } = req.body;

    const dadosProcessados = dataController.processarDados(
      mockData.monitorias,
      mockData.pesquisas
    );

    let monitoria = null;

    if (monitoriaId !== undefined) {
      monitoria = dadosProcessados[monitoriaId];
    } else if (atendente) {
      // Retorna a última monitoria do atendente
      const monitorias = dadosProcessados
        .filter(m => m.atendente === atendente && m.notaTotal)
        .sort((a, b) => dataController.parseDataParaComparacao(b.data) - dataController.parseDataParaComparacao(a.data));
      monitoria = monitorias[0] || null;
    }

    if (!monitoria) {
      return res.status(404).json({ success: false, error: 'Monitoria não encontrada' });
    }

    res.json({
      success: true,
      monitoria
    });
  } catch (error) {
    console.error('Erro ao buscar detalhes:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/data/performance-ranking
 * Retorna ranking de desempenho de atendentes
 */
router.get('/performance-ranking', (req, res) => {
  try {
    const dadosProcessados = dataController.processarDados(
      mockData.monitorias,
      mockData.pesquisas
    );

    const monitoriasReais = dadosProcessados.filter(d => d.notaTotal);
    const atendentes = [...new Set(monitoriasReais.map(d => d.atendente))];

    const ranking = atendentes
      .map(atendente => {
        const monitorias = monitoriasReais.filter(m => m.atendente === atendente);
        const media = monitorias.length > 0
          ? (monitorias.reduce((sum, m) => sum + m.notaTotal, 0) / monitorias.length).toFixed(2)
          : 0;

        const pesquisas = dadosProcessados.filter(d => d.atendente === atendente && d.notaPesquisa);
        const mediaPesquisa = pesquisas.length > 0
          ? (pesquisas.reduce((sum, p) => sum + p.notaPesquisa, 0) / pesquisas.length).toFixed(2)
          : 0;

        return {
          atendente,
          mediaMonitoria: parseFloat(media),
          mediaPesquisa: parseFloat(mediaPesquisa),
          quantidadeMonitorias: monitorias.length,
          quantidadePesquisas: pesquisas.length
        };
      })
      .sort((a, b) => b.mediaMonitoria - a.mediaMonitoria);

    res.json({
      success: true,
      ranking
    });
  } catch (error) {
    console.error('Erro ao gerar ranking:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/data/filters
 * Retorna opções de filtros (atendentes, turnos, monitores, anos, períodos)
 */
router.get('/filters', (req, res) => {
  try {
    const dadosProcessados = dataController.processarDados(
      mockData.monitorias,
      mockData.pesquisas
    );

    // Atendentes únicos
    const atendentes = [...new Set(dadosProcessados.map(d => d.atendente))].sort();

    // Turnos e monitores
    const turnos = [...new Set(mockData.nomes.map(n => n.Turno))].sort();
    const monitores = [...new Set(mockData.nomes.map(n => n.Monitor))].sort();

    // Anos únicos
    const anos = new Set();
    dadosProcessados.forEach(item => {
      if (item.data) {
        const partes = item.data.split(' ')[0].split('/');
        if (partes.length === 3 && partes[2].length === 4) {
          anos.add(partes[2]);
        }
      }
    });

    res.json({
      success: true,
      filters: {
        atendentes,
        turnos,
        monitores,
        anos: Array.from(anos).sort((a, b) => b - a),
        periodos: [
          { value: 'all', label: 'Todos' },
          { value: 'current', label: 'Mês Atual' },
          { value: 'last', label: 'Mês Anterior' },
          { value: 'last3', label: 'Últimos 3 Meses' },
          { value: '1', label: 'Janeiro' },
          { value: '2', label: 'Fevereiro' },
          { value: '3', label: 'Março' },
          { value: '4', label: 'Abril' },
          { value: '5', label: 'Maio' },
          { value: '6', label: 'Junho' },
          { value: '7', label: 'Julho' },
          { value: '8', label: 'Agosto' },
          { value: '9', label: 'Setembro' },
          { value: '10', label: 'Outubro' },
          { value: '11', label: 'Novembro' },
          { value: '12', label: 'Dezembro' }
        ]
      }
    });
  } catch (error) {
    console.error('Erro ao buscar filtros:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
