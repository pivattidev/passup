
export interface PerguntaFrequente {
id: string
pergunta: string
resposta: string
}

export const perguntasFrequentes: PerguntaFrequente[] = [
{
    id: 'como-funciona',
    pergunta: 'Como funciona o Pass Up?',
    resposta:
    'O Pass Up transforma ações realizadas na plataforma em pontos que podem ser utilizados em benefícios para a mobilidade urbana.',
},
    {
    id: 'como-acumular',
    pergunta: 'Como posso acumular pontos?',
    resposta:
    'Os pontos são acumulados ao participar das ações disponibilizadas pelo Pass Up. Cada ação informa a quantidade de pontos oferecida.',
},
{
    id: 'consultar-saldo',
    pergunta: 'Como posso consultar meu saldo?',
    resposta:
    'Acesse a página Saldo para consultar seus pontos, o valor aproximado em reais e o histórico de movimentações.',
},
{
    id: 'valor-dos-pontos',
    pergunta: 'Quanto valem os pontos?',
    resposta:
    'A cada 100 pontos acumulados, o usuário possui o equivalente aproximado a R$ 1,00 em benefícios.',
},
{
    id: 'como-resgatar',
    pergunta: 'Como funciona o resgate?',
    resposta:
    'Informe a quantidade de pontos e o cartão de transporte na página Resgate. Após a confirmação, o Pass Up gera um token temporário.',
},
{
    id: 'validade-token',
    pergunta: 'Por quanto tempo o token fica disponível?',
    resposta:
    'O token gerado após um resgate permanece válido por 24 horas e pode ser consultado nos detalhes do resgate.',
},
]