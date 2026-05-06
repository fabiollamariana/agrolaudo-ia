# AgroLaudo IA

AgroLaudo IA é um MVP frontend para criação de relatórios técnicos ambientais.
O objetivo é permitir o preenchimento de dados de vistoria, organização de anexos e geração de um preview estruturado do laudo para revisão técnica e impressão/PDF.

## Funcionalidades

- Tela inicial com acesso rápido para novo relatório.
- Formulário completo para dados ambientais e técnicos.
- Upload visual de anexos (fotos, PDF, KML e planilhas Excel).
- Geração local de relatório com função mockada (`generateEnvironmentalReport`).
- Preview técnico do laudo com seções estruturadas.
- Botão para imprimir/salvar em PDF via navegador.
- Botão para carregar dados de exemplo (demonstração comercial).

## Stack utilizada

- React
- Vite
- TypeScript
- CSS puro
- Sem backend
- Sem banco de dados
- Sem API externa (OpenAI ainda não integrada)

## Pré-requisitos

- Node.js 18+ (recomendado Node.js 20+)
- npm 9+

## Instalação

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

Após iniciar, o Vite normalmente abre em:

- `http://localhost:5173/`

> Se a porta 5173 estiver ocupada, o Vite pode subir automaticamente na próxima porta disponível.

## Gerar build de produção

```bash
npm run build
```

## Visualizar build localmente

```bash
npm run preview
```

## Variáveis de ambiente

Há um arquivo `.env.example` preparado para futura integração com OpenAI.
Atualmente o projeto não utiliza variáveis em runtime.
