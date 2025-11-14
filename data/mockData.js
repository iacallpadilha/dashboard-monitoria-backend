/**
 * DADOS MOCK - Simula 6 fontes de dados do Google Sheets
 * Estrutura: Arrays de objetos simples representando as colunas do dashboard original
 */

// 1. MONITORIAS - Dados de avaliação de qualidade
const monitorias = [
  {
    DataHora: "15/11/2025 10:30:00",
    "Data do Atendimento": "15/11/2025",
    Atendente: "Ana Silva",
    "Tipo de Ligação": "Telefone",
    Protocolo: "PROT-2025-001",
    "Telefone do Cliente": "(11) 98765-4321",
    Transcrição: "Cliente solicita informações sobre produtos. Atendente forneceu respostas corretas e educadas.",
    "Argumentação e Comunicação (Nota)": 9,
    "Argumentação e Comunicação (Justificativa)": "Comunicação clara e objetiva",
    "Argumentação e Comunicação (Feedback)": "Continuar assim, excelente desempenho",
    "Fraseologia (Nota)": 8,
    "Fraseologia (Justificativa)": "Utilizou fraseologia adequada",
    "Fraseologia (Feedback)": "Melhorar na entonação",
    "Coleta e Conferência de Dados (Nota)": 9,
    "Coleta e Conferência de Dados (Justificativa)": "Dados coletados corretamente",
    "Coleta e Conferência de Dados (Feedback)": "Perfeito, continuem assim",
    "Pediu um momento para pausa (Nota)": 7,
    "Pediu um momento para pausa (Justificativa)": "Solicitou pausa adequadamente",
    "Pediu um momento para pausa (Feedback)": "Bom desempenho",
    "Informações Corretas e Orientações (Nota)": 9,
    "Informações Corretas e Orientações (Justificativa)": "Orientações precisas",
    "Informações Corretas e Orientações (Feedback)": "Excelente",
    "Procedimentos de Localização (Nota)": 8,
    "Procedimentos de Localização (Justificativa)": "Localizou cliente corretamente",
    "Procedimentos de Localização (Feedback)": "Bom",
    "Objetividade e Tempo de Atendimento (Nota)": 8,
    "Objetividade e Tempo de Atendimento (Justificativa)": "Atendimento rápido e eficaz",
    "Objetividade e Tempo de Atendimento (Feedback)": "Bom tempo de atendimento",
    "Cordialidade e Simpatia (Nota)": 9,
    "Cordialidade e Simpatia (Justificativa)": "Atendente muito educado",
    "Cordialidade e Simpatia (Feedback)": "Manter cordialidade",
    "Oferta de Protocolo (Nota)": 8,
    "Oferta de Protocolo (Justificativa)": "Ofereceu protocolo ao final",
    "Oferta de Protocolo (Feedback)": "Sempre oferecer protocolo",
    "Convite para Pesquisa (Nota)": 8,
    "Convite para Pesquisa (Justificativa)": "Convidou para pesquisa",
    "Convite para Pesquisa (Feedback)": "Bom convite",
    "Nota Total": 84.4,
    "Feedback Atendente": "Obrigada pela oportunidade de melhoria.",
    "Feedback Supervisor": "Desempenho satisfatório, continue assim.",
    Assinatura: "Supervisor João"
  },
  {
    DataHora: "14/11/2025 14:15:00",
    "Data do Atendimento": "14/11/2025",
    Atendente: "Carlos Santos",
    "Tipo de Ligação": "WhatsApp",
    Protocolo: "PROT-2025-002",
    "Telefone do Cliente": "(21) 99876-5432",
    Transcrição: "Cliente questiona sobre cobrança. Atendente esclareceu a dúvida com paciência.",
    "Argumentação e Comunicação (Nota)": 7,
    "Argumentação e Comunicação (Justificativa)": "Comunicação adequada",
    "Argumentação e Comunicação (Feedback)": "Melhorar argumentação em casos de reclamação",
    "Fraseologia (Nota)": 6,
    "Fraseologia (Justificativa)": "Fraseologia padrão",
    "Fraseologia (Feedback)": "Usar fraseologias mais empáticas",
    "Coleta e Conferência de Dados (Nota)": 8,
    "Coleta e Conferência de Dados (Justificativa)": "Dados coletados com cuidado",
    "Coleta e Conferência de Dados (Feedback)": "Bom",
    "Pediu um momento para pausa (Nota)": 6,
    "Pediu um momento para pausa (Justificativa)": "Pausa não mencionada",
    "Pediu um momento para pausa (Feedback)": "Informar cliente sobre pausa",
    "Informações Corretas e Orientações (Nota)": 7,
    "Informações Corretas e Orientações (Justificativa)": "Orientações corretas",
    "Informações Corretas e Orientações (Feedback)": "Bom",
    "Procedimentos de Localização (Nota)": 7,
    "Procedimentos de Localização (Justificativa)": "Localizou cliente",
    "Procedimentos de Localização (Feedback)": "Bom",
    "Objetividade e Tempo de Atendimento (Nota)": 7,
    "Objetividade e Tempo de Atendimento (Justificativa)": "Atendimento adequado",
    "Objetividade e Tempo de Atendimento (Feedback)": "Bom",
    "Cordialidade e Simpatia (Nota)": 8,
    "Cordialidade e Simpatia (Justificativa)": "Atendente cortês",
    "Cordialidade e Simpatia (Feedback)": "Manter cordialidade",
    "Oferta de Protocolo (Nota)": 7,
    "Oferta de Protocolo (Justificativa)": "Ofereceu protocolo",
    "Oferta de Protocolo (Feedback)": "Sempre oferecer",
    "Uso Correto da Ferramenta (Nota)": 8,
    "Uso Correto da Ferramenta (Justificativa)": "Usou WhatsApp corretamente",
    "Uso Correto da Ferramenta (Feedback)": "Bom",
    "Nota Total": 72.6,
    "Feedback Atendente": "Vou melhorar na argumentação.",
    "Feedback Supervisor": "Necessário melhoria em fraseologia.",
    Assinatura: "Supervisor Maria"
  },
  {
    DataHora: "13/11/2025 09:45:00",
    "Data do Atendimento": "13/11/2025",
    Atendente: "Beatriz Costa",
    "Tipo de Ligação": "Telefone",
    Protocolo: "PROT-2025-003",
    "Telefone do Cliente": "(85) 98888-7777",
    Transcrição: "Cliente solicita documentação. Atendente forneceu corretamente.",
    "Argumentação e Comunicação (Nota)": 9,
    "Argumentação e Comunicação (Justificativa)": "Excelente comunicação",
    "Argumentação e Comunicação (Feedback)": "Parabéns",
    "Fraseologia (Nota)": 9,
    "Fraseologia (Justificativa)": "Fraseologia impecável",
    "Fraseologia (Feedback)": "Excelente",
    "Coleta e Conferência de Dados (Nota)": 10,
    "Coleta e Conferência de Dados (Justificativa)": "Dados perfeitos",
    "Coleta e Conferência de Dados (Feedback)": "Perfeito",
    "Pediu um momento para pausa (Nota)": 8,
    "Pediu um momento para pausa (Justificativa)": "Pausa bem comunicada",
    "Pediu um momento para pausa (Feedback)": "Bom",
    "Informações Corretas e Orientações (Nota)": 10,
    "Informações Corretas e Orientações (Justificativa)": "Informações precisas",
    "Informações Corretas e Orientações (Feedback)": "Excelente",
    "Procedimentos de Localização (Nota)": 9,
    "Procedimentos de Localização (Justificativa)": "Excelente localização",
    "Procedimentos de Localização (Feedback)": "Parabéns",
    "Objetividade e Tempo de Atendimento (Nota)": 9,
    "Objetividade e Tempo de Atendimento (Justificativa)": "Tempo ótimo",
    "Objetividade e Tempo de Atendimento (Feedback)": "Excelente",
    "Cordialidade e Simpatia (Nota)": 10,
    "Cordialidade e Simpatia (Justificativa)": "Atendente muito simpática",
    "Cordialidade e Simpatia (Feedback)": "Manter assim",
    "Oferta de Protocolo (Nota)": 9,
    "Oferta de Protocolo (Justificativa)": "Protocolo oferecido",
    "Oferta de Protocolo (Feedback)": "Bom",
    "Convite para Pesquisa (Nota)": 9,
    "Convite para Pesquisa (Justificativa)": "Convidou adequadamente",
    "Convite para Pesquisa (Feedback)": "Excelente",
    "Nota Total": 91.2,
    "Feedback Atendente": "Muito obrigada!",
    "Feedback Supervisor": "Excelente desempenho, mantém a qualidade.",
    Assinatura: "Supervisor João"
  },
  {
    DataHora: "12/11/2025 16:20:00",
    "Data do Atendimento": "12/11/2025",
    Atendente: "Daniel Lima",
    "Tipo de Ligação": "Telefone",
    Protocolo: "PROT-2025-004",
    "Telefone do Cliente": "(47) 98999-6666",
    Transcrição: "Cliente solicita cancelamento de serviço. Atendente tentou reter mas aceitou.",
    "Argumentação e Comunicação (Nota)": 6,
    "Argumentação e Comunicação (Justificativa)": "Comunicação fraca",
    "Argumentação e Comunicação (Feedback)": "Melhorar argumentação para retenção",
    "Fraseologia (Nota)": 5,
    "Fraseologia (Justificativa)": "Fraseologia inadequada",
    "Fraseologia (Feedback)": "Estudar fraseologia",
    "Coleta e Conferência de Dados (Nota)": 6,
    "Coleta e Conferência de Dados (Justificativa)": "Dados coletados parcialmente",
    "Coleta e Conferência de Dados (Feedback)": "Coletar todos os dados",
    "Pediu um momento para pausa (Nota)": 5,
    "Pediu um momento para pausa (Justificativa)": "Não pediu pausa",
    "Pediu um momento para pausa (Feedback)": "Sempre pedir pausa quando necessário",
    "Informações Corretas e Orientações (Nota)": 5,
    "Informações Corretas e Orientações (Justificativa)": "Informações incorretas",
    "Informações Corretas e Orientações (Feedback)": "Revisar informações",
    "Procedimentos de Localização (Nota)": 6,
    "Procedimentos de Localização (Justificativa)": "Localizou parcialmente",
    "Procedimentos de Localização (Feedback)": "Melhorar localização",
    "Objetividade e Tempo de Atendimento (Nota)": 5,
    "Objetividade e Tempo de Atendimento (Justificativa)": "Atendimento longo",
    "Objetividade e Tempo de Atendimento (Feedback)": "Reduzir tempo de atendimento",
    "Cordialidade e Simpatia (Nota)": 6,
    "Cordialidade e Simpatia (Justificativa)": "Pouco cordial",
    "Cordialidade e Simpatia (Feedback)": "Melhorar cordialidade",
    "Oferta de Protocolo (Nota)": 5,
    "Oferta de Protocolo (Justificativa)": "Não ofereceu protocolo",
    "Oferta de Protocolo (Feedback)": "Sempre oferecer protocolo",
    "Convite para Pesquisa (Nota)": 5,
    "Convite para Pesquisa (Justificativa)": "Não convidou para pesquisa",
    "Convite para Pesquisa (Feedback)": "Convidar para pesquisa",
    "Nota Total": 55.8,
    "Feedback Atendente": "Vou melhorar.",
    "Feedback Supervisor": "Necessário treinamento urgente.",
    Assinatura: "Supervisor Maria"
  }
];

// 2. PESQUISAS DE SATISFAÇÃO (NPS)
const pesquisas = [
  {
    Nome: "Ana Silva",
    "Resultado Final": 95,
    "Data Atualizaçao": "15/11/2025",
    "Telefone do Cliente": "(11) 98765-4321",
    Protocolo: "PROT-2025-001",
    Assinatura: "Cliente João"
  },
  {
    Nome: "Beatriz Costa",
    "Resultado Final": 98,
    "Data Atualizaçao": "13/11/2025",
    "Telefone do Cliente": "(85) 98888-7777",
    Protocolo: "PROT-2025-003",
    Assinatura: "Cliente Maria"
  },
  {
    Nome: "Carlos Santos",
    "Resultado Final": 72,
    "Data Atualizaçao": "14/11/2025",
    "Telefone do Cliente": "(21) 99876-5432",
    Protocolo: "PROT-2025-002",
    Assinatura: "Cliente Pedro"
  },
  {
    Nome: "Ana Silva",
    "Resultado Final": 88,
    "Data Atualizaçao": "10/11/2025",
    "Telefone do Cliente": "(11) 98765-1111",
    Protocolo: "PROT-2025-005",
    Assinatura: "Cliente Ana"
  }
];

// 3. DADOS DE ATENDENTES (Nome, Turno, Monitor)
const nomes = [
  {
    Atendente: "Ana Silva",
    Turno: "Manhã",
    Monitor: "João Silva"
  },
  {
    Atendente: "Beatriz Costa",
    Turno: "Tarde",
    Monitor: "Maria Santos"
  },
  {
    Atendente: "Carlos Santos",
    Turno: "Noite",
    Monitor: "Pedro Costa"
  },
  {
    Atendente: "Daniel Lima",
    Turno: "Manhã",
    Monitor: "João Silva"
  }
];

// 4. PROTOCOLOS ERRADOS (Descontos)
const protocolosErrados = [
  {
    Atendente: "Daniel Lima",
    Data: "12/11/2025",
    Protocolo: "PROT-2025-004",
    erro: "Protocolo não oferecido ao cliente",
    Pontos: 1.0
  },
  {
    Atendente: "Carlos Santos",
    Data: "14/11/2025",
    Protocolo: "PROT-2025-002",
    erro: "Erro na coleta de dados",
    Pontos: 0.5
  },
  {
    Atendente: "Daniel Lima",
    Data: "05/11/2025",
    Protocolo: "PROT-2025-010",
    erro: "Informação incorreta fornecida",
    Pontos: 1.5
  }
];

// 5. DADOS DE TMA (Tempo Médio de Atendimento)
const tma = [
  {
    Data: "11/2025",
    Usuario: "Ana Silva",
    "Media Tempo Atendimento": "00:04:30"
  },
  {
    Data: "11/2025",
    Usuario: "Beatriz Costa",
    "Media Tempo Atendimento": "00:04:15"
  },
  {
    Data: "11/2025",
    Usuario: "Carlos Santos",
    "Media Tempo Atendimento": "00:05:30"
  },
  {
    Data: "11/2025",
    Usuario: "Daniel Lima",
    "Media Tempo Atendimento": "00:06:00"
  },
  {
    Data: "10/2025",
    Usuario: "Daniel Lima",
    "Media Tempo Atendimento": "00:05:45"
  },
  {
    Data: "10/2025",
    Usuario: "Carlos Santos",
    "Media Tempo Atendimento": "00:05:15"
  }
];

// 6. TABULAÇÃO DO ATENDENTE (Resultado de vendas, etc)
const tabulacaoAtendente = [
  {
    Data: "15/11/2025",
    Atendente: "Ana Silva",
    Vendas: 5,
    Contatos: 45,
    TaxaConversao: "11.1%",
    ValorVendas: 2500.00
  },
  {
    Data: "14/11/2025",
    Atendente: "Carlos Santos",
    Vendas: 2,
    Contatos: 38,
    TaxaConversao: "5.3%",
    ValorVendas: 1200.00
  },
  {
    Data: "13/11/2025",
    Atendente: "Beatriz Costa",
    Vendas: 8,
    Contatos: 52,
    TaxaConversao: "15.4%",
    ValorVendas: 4100.00
  },
  {
    Data: "12/11/2025",
    Atendente: "Daniel Lima",
    Vendas: 1,
    Contatos: 35,
    TaxaConversao: "2.9%",
    ValorVendas: 600.00
  }
];

module.exports = {
  monitorias,
  pesquisas,
  nomes,
  protocolosErrados,
  tma,
  tabulacaoAtendente
};
