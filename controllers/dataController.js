/**
 * DATA CONTROLLER
 * Lógica para processar, filtrar, calcular KPIs, Quartis e ranqueamentos
 * Fiel à lógica do JavaScript original do dashboard
 */

const mockData = require('../data/mockData');

/**
 * Normaliza número de string para float
 */
function normalizeNumber(raw) {
  if (raw === null || raw === undefined) return NaN;
  if (typeof raw === 'number') return raw;
  try {
    const str = String(raw).trim();
    const normalized = str.replace(',', '.').replace(/[^0-9.\-]/g, '');
    const n = parseFloat(normalized);
    return isNaN(n) ? NaN : n;
  } catch (e) {
    return NaN;
  }
}

/**
 * Parseia tempo em formato HH:MM:SS para segundos
 */
function parseTempoParaSegundos(timeStr) {
  if (!timeStr && timeStr !== 0) return NaN;
  try {
    const s = String(timeStr).trim();
    if (/^\d+$/.test(s)) return parseInt(s, 10);
    const parts = s.split(':').map(p => parseInt(p, 10));
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
      return parts[0];
    }
    return NaN;
  } catch (e) {
    return NaN;
  }
}

/**
 * Converte segundos para HH:MM:SS
 */
function segundosParaHHMMSS(sec) {
  if (isNaN(sec) || sec === null) return 'N/D';
  const s = Math.round(sec);
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
  return hours > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
}

/**
 * Parseia data para comparação (dd/mm/aaaa -> timestamp)
 */
function parseDataParaComparacao(dataString) {
  try {
    const [dataPart] = dataString.split(' ');
    const [dia, mes, ano] = dataPart.split('/').map(Number);
    return new Date(ano, mes - 1, dia).getTime();
  } catch (e) {
    return 0;
  }
}

/**
 * Processa dados brutos de monitorias e pesquisas
 */
function processarDados(dadosMonitorias, dadosPesquisa) {
  // Processa pesquisas (NPS)
  const pesquisaProcessada = (dadosPesquisa || []).map(item => {
    const usuario = item.Nome || Object.values(item)[0];
    const resultado = item["Resultado Final"] || Object.values(item)[1];
    const data = item["Data Atualizaçao"] || Object.values(item)[2];

    if (usuario && resultado && resultado !== "#DIV/0!" && data) {
      const notaString = String(resultado).replace(',', '.');
      const nota = parseFloat(notaString);

      if (!isNaN(nota)) {
        return {
          atendente: String(usuario).trim(),
          notaPesquisa: nota,
          data: data,
          tipoLigacao: '-',
          notaTotal: null,
          criterios: [],
          transcricao: '',
          feedbackAtendente: '',
          feedbackSupervisor: '',
          apenasNPS: true,
          telefoneCliente: item["Telefone do Cliente"] || '(Não informado)',
          dataAtendimento: item["Data Atualizaçao"] || null,
          assinatura: item.Assinatura || null,
          protocolo: item.Protocolo || null
        };
      }
    }
    return null;
  }).filter(Boolean);

  // Processa monitorias
  const monitoriasProcessadas = (dadosMonitorias || []).filter(item => {
    return item.DataHora && item["Nota Total"] && !isNaN(normalizeNumber(item["Nota Total"]));
  }).map(item => {
    const criterios = [
      {
        nome: "Argumentação e Comunicação",
        nota: normalizeNumber(item["Argumentação e Comunicação (Nota)"] || 0),
        justificativa: item["Argumentação e Comunicação (Justificativa)"] || '(Não informado)',
        feedback: item["Argumentação e Comunicação (Feedback)"] || '(Não informado)'
      },
      {
        nome: "Fraseologia",
        nota: normalizeNumber(item["Fraseologia (Nota)"] || 0),
        justificativa: item["Fraseologia (Justificativa)"] || '(Não informado)',
        feedback: item["Fraseologia (Feedback)"] || '(Não informado)'
      },
      {
        nome: "Coleta e Conferência de Dados",
        nota: normalizeNumber(item["Coleta e Conferência de Dados (Nota)"] || 0),
        justificativa: item["Coleta e Conferência de Dados (Justificativa)"] || '(Não informado)',
        feedback: item["Coleta e Conferência de Dados (Feedback)"] || '(Não informado)'
      },
      {
        nome: "Pediu um momento para pausa",
        nota: normalizeNumber(item["Pediu um momento para pausa (Nota)"] || 0),
        justificativa: item["Pediu um momento para pausa (Justificativa)"] || '(Não informado)',
        feedback: item["Pediu um momento para pausa (Feedback)"] || '(Não informado)'
      },
      {
        nome: "Informações Corretas e Orientações",
        nota: normalizeNumber(item["Informações Corretas e Orientações (Nota)"] || 0),
        justificativa: item["Informações Corretas e Orientações (Justificativa)"] || '(Não informado)',
        feedback: item["Informações Corretas e Orientações (Feedback)"] || '(Não informado)'
      },
      {
        nome: "Procedimentos de Localização",
        nota: normalizeNumber(item["Procedimentos de Localização (Nota)"] || 0),
        justificativa: item["Procedimentos de Localização (Justificativa)"] || '(Não informado)',
        feedback: item["Procedimentos de Localização (Feedback)"] || '(Não informado)'
      },
      {
        nome: "Objetividade e Tempo de Atendimento",
        nota: normalizeNumber(item["Objetividade e Tempo de Atendimento (Nota)"] || 0),
        justificativa: item["Objetividade e Tempo de Atendimento (Justificativa)"] || '(Não informado)',
        feedback: item["Objetividade e Tempo de Atendimento (Feedback)"] || '(Não informado)'
      },
      {
        nome: "Cordialidade e Simpatia",
        nota: normalizeNumber(item["Cordialidade e Simpatia (Nota)"] || 0),
        justificativa: item["Cordialidade e Simpatia (Justificativa)"] || '(Não informado)',
        feedback: item["Cordialidade e Simpatia (Feedback)"] || '(Não informado)'
      },
      {
        nome: "Oferta de Protocolo",
        nota: normalizeNumber(item["Oferta de Protocolo (Nota)"] || 0),
        justificativa: item["Oferta de Protocolo (Justificativa)"] || '(Não informado)',
        feedback: item["Oferta de Protocolo (Feedback)"] || '(Não informado)'
      }
    ];

    // Detecta se é WhatsApp e adiciona critério correto
    if (item["Tipo de Ligação"] && item["Tipo de Ligação"].toLowerCase().includes('whatsapp')) {
      criterios.push({
        nome: "Uso correto da Ferramenta (WhatsApp)",
        nota: normalizeNumber(item["Uso Correto da Ferramenta (Nota)"] || 0),
        justificativa: item["Uso Correto da Ferramenta (Justificativa)"] || '(Não informado)',
        feedback: item["Uso Correto da Ferramenta (Feedback)"] || '(Não informado)'
      });
    } else {
      criterios.push({
        nome: "Convite para Pesquisa",
        nota: normalizeNumber(item["Convite para Pesquisa (Nota)"] || 0),
        justificativa: item["Convite para Pesquisa (Justificativa)"] || '(Não informado)',
        feedback: item["Convite para Pesquisa (Feedback)"] || '(Não informado)'
      });
    }

    let notaTotal = normalizeNumber(item["Nota Total"]);
    if (isNaN(notaTotal)) {
      notaTotal = criterios.reduce((sum, criterio) => sum + criterio.nota, 0);
    }

    return {
      data: item.DataHora,
      atendente: String(item.Atendente || 'Não informado').trim(),
      tipoLigacao: item["Tipo de Ligação"] || 'Não informado',
      notaTotal,
      notaPesquisa: null,
      criterios,
      transcricao: item.Transcrição || '',
      feedbackAtendente: item["Feedback Atendente"] || '',
      feedbackSupervisor: item["Feedback Supervisor"] || '',
      apenasNPS: false,
      telefoneCliente: item["Telefone do Cliente"] || '(Não informado)',
      dataAtendimento: item["Data do Atendimento"] || null,
      assinatura: item.Assinatura || null,
      protocolo: item.Protocolo || null
    };
  });

  return [...monitoriasProcessadas, ...pesquisaProcessada];
}

/**
 * Calcula descontos por protocolos errados
 */
function calcularDescontos(atendente, mes, ano, dadosProtocolos) {
  if (!dadosProtocolos || dadosProtocolos.length === 0) {
    return { totalDescontos: 0, registros: [], penalidadeTMA: 0 };
  }

  const registros = dadosProtocolos.filter(item => {
    const nome = item.Atendente || Object.values(item)[0] || '';
    const dataStr = item.Data || Object.values(item)[1] || '';

    if (!nome || !dataStr) return false;
    if (String(nome).trim() !== atendente) return false;

    const partes = String(dataStr).split(' ')[0].split('/');
    if (partes.length !== 3) return false;

    const d = parseInt(partes[0], 10);
    const m = parseInt(partes[1], 10);
    const y = parseInt(partes[2], 10);

    if (isNaN(m) || isNaN(y)) return false;
    return m === mes && y === ano;
  }).map(item => {
    const rawPontos = item.Pontos || item.Ponto || item.Desconto || Object.values(item)[2] || 0;
    let pontos = 0;

    try {
      if (typeof rawPontos === 'number') {
        pontos = rawPontos;
      } else if (typeof rawPontos === 'string') {
        const normalized = rawPontos.trim().replace(',', '.').replace(/[^0-9.\-]/g, '');
        pontos = parseFloat(normalized);
        if (isNaN(pontos)) pontos = 0;
      } else {
        pontos = Number(rawPontos) || 0;
      }
    } catch (e) {
      pontos = 0;
    }

    const motivo = item.erro || item.Erro || item.Motivo || item.Observação || Object.values(item)[3] || '';

    return {
      data: item.Data || Object.values(item)[1] || '',
      protocolo: item.Protocolo || Object.values(item)[2] || '',
      motivo: motivo,
      pontos: pontos
    };
  });

  const totalDescontos = registros.reduce((acc, r) => acc + (r.pontos || 0), 0);

  return { totalDescontos, registros, penalidadeTMA: 0 };
}

/**
 * Obtém média de TMA para um atendente em um período
 */
function obterMediaTMAPorAtendentePeriodo(atendente, mes, ano, dadosTMA) {
  if (!dadosTMA || dadosTMA.length === 0) return NaN;

  const registros = dadosTMA.filter(item => {
    const usuarioRaw = item.Usuario || Object.values(item)[1] || '';
    const dataStrRaw = item.Data || Object.values(item)[0] || '';
    const usuario = String(usuarioRaw).trim().toLowerCase();
    const atendenteNorm = String(atendente).trim().toLowerCase();

    if (!usuario || !atendenteNorm) return false;
    const matched = (usuario === atendenteNorm) || usuario.includes(atendenteNorm) || atendenteNorm.includes(usuario);
    if (!matched) return false;

    if (!dataStrRaw) return false;
    const dataPart = String(dataStrRaw).split(' ')[0].trim();
    const partes = dataPart.split('/').map(p => String(p).trim());

    let m = null, y = null;
    if (partes.length === 3) {
      m = parseInt(partes[1], 10);
      y = parseInt(partes[2], 10);
    } else if (partes.length === 2) {
      m = parseInt(partes[0], 10);
      y = parseInt(partes[1], 10);
    } else {
      return false;
    }

    if (isNaN(m) || isNaN(y)) return false;
    return m === mes && y === ano;
  });

  if (!registros || registros.length === 0) return NaN;

  const tempos = registros.map(r => {
    const raw = r["Media Tempo Atendimento"] || Object.values(r)[2] || '';
    return parseTempoParaSegundos(raw);
  }).filter(t => !isNaN(t));

  if (tempos.length === 0) return NaN;
  const soma = tempos.reduce((a, b) => a + b, 0);
  return soma / tempos.length;
}

/**
 * Calcula quartis de atendentes
 */
function calcularQuartis(dados) {
  const atendentes = [...new Set(dados.filter(d => d.notaTotal).map(d => d.atendente))];

  const estatisticas = atendentes.map(atendente => {
    const monitorias = dados.filter(d => d.atendente === atendente && d.notaTotal);
    const notas = monitorias.map(m => m.notaTotal).sort((a, b) => a - b);

    if (notas.length === 0) return null;

    const media = notas.reduce((a, b) => a + b, 0) / notas.length;
    const quantidade = notas.length;

    return {
      atendente,
      media: parseFloat(media.toFixed(2)),
      quantidade,
      notas
    };
  }).filter(Boolean).sort((a, b) => b.media - a.media);

  if (estatisticas.length === 0) return [];

  // Calcula quartis
  const n = estatisticas.length;
  const q1Index = Math.ceil(n * 0.25) - 1;
  const q2Index = Math.ceil(n * 0.5) - 1;
  const q3Index = Math.ceil(n * 0.75) - 1;

  return estatisticas.map((stat, index) => {
    let quartil = 4;
    if (index <= q1Index) quartil = 1;
    else if (index <= q2Index) quartil = 2;
    else if (index <= q3Index) quartil = 3;

    return {
      posicao: index + 1,
      atendente: stat.atendente,
      media: stat.media,
      quantidade: stat.quantidade,
      quartil
    };
  });
}

/**
 * Aplica filtros aos dados
 */
function aplicarFiltros(dados, filtros) {
  let dadosFiltrados = [...dados];

  // Filtro por ano
  if (filtros.ano && filtros.ano !== 'all') {
    dadosFiltrados = dadosFiltrados.filter(item => {
      if (!item.data) return false;
      const partes = item.data.split(' ')[0].split('/');
      return partes.length === 3 && partes[2] === String(filtros.ano);
    });
  }

  // Filtro por período
  if (filtros.periodo && filtros.periodo !== 'all') {
    const hoje = new Date();
    let anoFiltro = filtros.ano && filtros.ano !== 'all' ? parseInt(filtros.ano) : hoje.getFullYear();
    let dataInicio = new Date();
    let dataFim = new Date();

    if (filtros.periodo === 'current') {
      dataInicio = new Date(anoFiltro, hoje.getMonth(), 1);
      dataFim = new Date(anoFiltro, hoje.getMonth() + 1, 0);
    } else if (filtros.periodo === 'last') {
      let mes = hoje.getMonth() - 1;
      let ano = anoFiltro;
      if (mes < 0) {
        mes = 11;
        ano--;
      }
      dataInicio = new Date(ano, mes, 1);
      dataFim = new Date(ano, mes + 1, 0);
    } else if (filtros.periodo === 'last3') {
      let mes = hoje.getMonth() - 3;
      let ano = anoFiltro;
      while (mes < 0) {
        mes += 12;
        ano--;
      }
      dataInicio = new Date(ano, mes, 1);
      dataFim = new Date(anoFiltro, hoje.getMonth() + 1, 0);
    } else {
      const mes = parseInt(filtros.periodo) - 1;
      dataInicio = new Date(anoFiltro, mes, 1);
      dataFim = new Date(anoFiltro, mes + 1, 0);
    }

    const dataEstaNoPeriodo = (dataStr) => {
      if (!dataStr) return false;
      const [dia, mes, ano] = dataStr.split(' ')[0].split('/').map(Number);
      const data = new Date(ano, mes - 1, dia);
      return data >= dataInicio && data <= dataFim;
    };

    dadosFiltrados = dadosFiltrados.filter(item => {
      if (!item.data) return false;
      return dataEstaNoPeriodo(item.data);
    });
  }

  // Filtro por atendente
  if (filtros.atendente && filtros.atendente !== 'all') {
    dadosFiltrados = dadosFiltrados.filter(item => item.atendente === filtros.atendente);
  }

  // Filtro por turno e monitor (usa dadosNomes)
  if ((filtros.turno || filtros.monitor) && filtros.dadosNomes && filtros.dadosNomes.length > 0) {
    const mapaAtendente = {};

    filtros.dadosNomes.forEach(item => {
      if (item.Atendente) {
        mapaAtendente[item.Atendente] = {
          turno: item.Turno,
          monitor: item.Monitor
        };
      }
    });

    dadosFiltrados = dadosFiltrados.filter(item => {
      const info = mapaAtendente[item.atendente];
      if (!info) return false;
      if (filtros.turno && filtros.turno !== 'all' && info.turno !== filtros.turno) return false;
      if (filtros.monitor && filtros.monitor !== 'all' && info.monitor !== filtros.monitor) return false;
      return true;
    });
  }

  return dadosFiltrados;
}

/**
 * Calcula KPIs
 */
function calcularKPIs(dadosFiltrados, atendente = 'all') {
  const monitoriasReais = dadosFiltrados.filter(item => typeof item.notaTotal === 'number' && !isNaN(item.notaTotal));
  const dados = atendente === 'all' ? monitoriasReais : monitoriasReais.filter(item => item.atendente === atendente);

  const totalMonitorias = dados.length;
  const somaNotas = dados.reduce((acc, item) => acc + item.notaTotal, 0);
  const mediaNotas = totalMonitorias > 0 ? (somaNotas / totalMonitorias).toFixed(1) : 0;

  const notasPesquisa = dadosFiltrados
    .filter(item => (atendente === 'all' ? true : item.atendente === atendente) && item.notaPesquisa !== null && typeof item.notaPesquisa === 'number')
    .map(item => item.notaPesquisa);

  const mediaPesquisa = notasPesquisa.length > 0
    ? (notasPesquisa.reduce((acc, nota) => acc + nota, 0) / notasPesquisa.length).toFixed(2) + '%'
    : 'N/D';

  // Pior e Melhor Critério
  const criteriosMap = new Map();
  dados.forEach(monitoria => {
    if (monitoria.criterios && monitoria.criterios.length > 0) {
      monitoria.criterios.forEach(criterio => {
        if (criterio.nome && !isNaN(criterio.nota)) {
          if (!criteriosMap.has(criterio.nome)) {
            criteriosMap.set(criterio.nome, { soma: 0, count: 0 });
          }
          const atual = criteriosMap.get(criterio.nome);
          criteriosMap.set(criterio.nome, {
            soma: atual.soma + parseFloat(criterio.nota),
            count: atual.count + 1
          });
        }
      });
    }
  });

  const criterios = Array.from(criteriosMap.entries())
    .map(([nome, dados]) => ({
      nome,
      media: (dados.soma / dados.count).toFixed(2)
    }))
    .sort((a, b) => parseFloat(a.media) - parseFloat(b.media));

  const piorCriterio = criterios.length > 0 ? criterios[0] : { nome: '-', media: 0 };
  const melhorCriterio = criterios.length > 0 ? criterios[criterios.length - 1] : { nome: '-', media: 0 };

  return {
    totalMonitorias,
    mediaNotas: parseFloat(mediaNotas),
    mediaPesquisa,
    piorCriterio,
    melhorCriterio
  };
}

/**
 * Gera dados para gráficos
 */
function gerarDadosGraficos(dadosFiltrados, atendente = 'all') {
  const monitoriasReais = dadosFiltrados.filter(item => typeof item.notaTotal === 'number' && !isNaN(item.notaTotal));
  const dados = atendente === 'all' ? monitoriasReais : monitoriasReais.filter(item => item.atendente === atendente);

  // Gráfico de Desempenho por Atendente
  let desempenhoData = {};
  if (atendente === 'all') {
    const atendentes = [...new Set(monitoriasReais.map(item => item.atendente))];
    atendentes.forEach(a => {
      const monitorias = monitoriasReais.filter(m => m.atendente === a);
      const media = monitorias.length > 0 ? (monitorias.reduce((sum, m) => sum + m.notaTotal, 0) / monitorias.length).toFixed(1) : 0;
      desempenhoData[a] = parseFloat(media);
    });
  } else {
    desempenhoData[atendente] = dados.length > 0 ? (dados.reduce((sum, d) => sum + d.notaTotal, 0) / dados.length).toFixed(1) : 0;
  }

  // Gráfico de Distribuição por Nota
  const distribuicao = {
    excelente: dados.filter(d => d.notaTotal >= 90).length,
    bom: dados.filter(d => d.notaTotal >= 80 && d.notaTotal < 90).length,
    satisfatorio: dados.filter(d => d.notaTotal >= 70 && d.notaTotal < 80).length,
    insatisfatorio: dados.filter(d => d.notaTotal < 70).length
  };

  return {
    desempenho: desempenhoData,
    distribuicao
  };
}

module.exports = {
  processarDados,
  calcularDescontos,
  obterMediaTMAPorAtendentePeriodo,
  calcularQuartis,
  aplicarFiltros,
  calcularKPIs,
  gerarDadosGraficos,
  normalizeNumber,
  parseDataParaComparacao,
  parseTempoParaSegundos,
  segundosParaHHMMSS
};
