import { FormEvent, useMemo, useState } from 'react'

type ReportType =
  | 'PRAD'
  | 'Relatório de Monitoramento'
  | 'Laudo de Vegetação'
  | 'TCRA'

type ReportFormData = {
  tipoRelatorio: ReportType
  cliente: string
  propriedade: string
  municipioUf: string
  dataVistoria: string
  numeroProcesso: string
  objetivo: string
  documentacaoRecebida: string
  observacoesCampo: string
  diagnosticoAmbiental: string
  recomendacoesTecnicas: string
  conclusao: string
}

type UploadedFiles = {
  fotos: File[]
  pdf: File[]
  kml: File[]
  excel: File[]
}

type ReportSections = {
  introducaoHistorico: string
  objetivos: string
  informacoesGerais: string
  metodologia: string
  caracterizacaoArea: string
  diagnosticoAmbiental: string
  recomendacoesTecnicas: string
  consideracoesFinais: string
  anexos: string
}

const initialData: ReportFormData = {
  tipoRelatorio: 'PRAD',
  cliente: '',
  propriedade: '',
  municipioUf: '',
  dataVistoria: '',
  numeroProcesso: '',
  objetivo: '',
  documentacaoRecebida: '',
  observacoesCampo: '',
  diagnosticoAmbiental: '',
  recomendacoesTecnicas: '',
  conclusao: '',
}

const exampleData: ReportFormData = {
  tipoRelatorio: 'Relatório de Monitoramento',
  cliente: 'AgroVerde Empreendimentos Ltda.',
  propriedade: 'Fazenda Boa Esperança - Gleba Norte (126 ha)',
  municipioUf: 'Sorriso/MT',
  dataVistoria: '2026-04-18',
  numeroProcesso: 'TCRA-2026-0418 / Proc. SEMA 55.321/2025',
  objetivo: 'Avaliar a evolução da recomposição vegetal e a conformidade das áreas de preservação permanente no ciclo 2026.',
  documentacaoRecebida: 'TCRA assinado, CAR, mapas georreferenciados, série fotográfica histórica e relatório de monitoramento de 2025.',
  observacoesCampo: 'Foram percorridos 14 pontos de controle com registro fotográfico. Identificou-se boa taxa de sobrevivência das mudas nativas, com falhas pontuais em trecho de encosta.',
  diagnosticoAmbiental: 'A área apresenta estabilidade geral e melhoria no índice de cobertura vegetal. Persistem processos erosivos leves em setor com compactação de solo.',
  recomendacoesTecnicas: 'Realizar replantio direcionado em 0,8 ha, implantar cordões de contenção superficial e reforçar manutenção trimestral com controle de espécies invasoras.',
  conclusao: 'O empreendimento demonstra aderência ao plano técnico, com necessidade de ajustes localizados para plena efetividade das medidas de recuperação ambiental.',
}

const fallback = (value: string, defaultText = 'Não informado.') => value.trim() || defaultText

function formatFileList(list: File[]): string {
  if (list.length === 0) return 'Nenhum arquivo anexado.'
  return list.map((file, index) => `${index + 1}. ${file.name}`).join(' | ')
}

function generateEnvironmentalReport(data: ReportFormData, files: UploadedFiles): ReportSections {
  return {
    introducaoHistorico: `Este ${data.tipoRelatorio} foi elaborado para ${fallback(data.cliente)} referente à área ${fallback(data.propriedade)} em ${fallback(data.municipioUf)}. O documento considera o histórico técnico e documental apresentado para análise ambiental.`,
    objetivos: fallback(data.objetivo),
    informacoesGerais: `Data da vistoria: ${fallback(data.dataVistoria, 'Data não registrada.')}\nProcesso/TCRA: ${fallback(data.numeroProcesso)}\nDocumentação recebida: ${fallback(data.documentacaoRecebida)}`,
    metodologia: `A avaliação foi conduzida por análise documental e vistoria de campo com registro técnico. Observações levantadas: ${fallback(data.observacoesCampo)}`,
    caracterizacaoArea: `A propriedade/área analisada é ${fallback(data.propriedade)} no município de ${fallback(data.municipioUf)}. O escopo considera aspectos de uso do solo, cobertura vegetal e sensibilidade ambiental local.`,
    diagnosticoAmbiental: fallback(data.diagnosticoAmbiental),
    recomendacoesTecnicas: fallback(data.recomendacoesTecnicas),
    consideracoesFinais: fallback(data.conclusao),
    anexos: `Fotos: ${formatFileList(files.fotos)}\nPDF: ${formatFileList(files.pdf)}\nKML: ${formatFileList(files.kml)}\nExcel: ${formatFileList(files.excel)}`,
  }
}

export default function App() {
  const [showForm, setShowForm] = useState(false)
  const [data, setData] = useState<ReportFormData>(initialData)
  const [files, setFiles] = useState<UploadedFiles>({ fotos: [], pdf: [], kml: [], excel: [] })
  const [report, setReport] = useState<ReportSections | null>(null)

  const isPreview = useMemo(() => report !== null, [report])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    setReport(generateEnvironmentalReport(data, files))
  }

  const onFileChange = (key: keyof UploadedFiles, selected: FileList | null) => {
    setFiles((prev) => ({ ...prev, [key]: selected ? Array.from(selected) : [] }))
  }

  if (!showForm) {
    return (
      <main className="container landing">
        <h1>AgroLaudo IA</h1>
        <p>Plataforma de geração de relatórios técnicos ambientais com interface premium.</p>
        <button type="button" onClick={() => setShowForm(true)}>Novo relatório</button>
      </main>
    )
  }

  return (
    <main className="container">
      <header className="topbar">
        <div>
          <h1>AgroLaudo IA</h1>
          <p>Preencha os dados técnicos para gerar o relatório estruturado.</p>
        </div>
        <button type="button" onClick={() => setData(exampleData)}>Carregar exemplo</button>
      </header>

      {!isPreview ? (
        <form className="grid" onSubmit={onSubmit}>
          <label>
            Tipo de relatório
            <select
              value={data.tipoRelatorio}
              onChange={(e) => setData((prev) => ({ ...prev, tipoRelatorio: e.target.value as ReportType }))}
            >
              <option>PRAD</option>
              <option>Relatório de Monitoramento</option>
              <option>Laudo de Vegetação</option>
              <option>TCRA</option>
            </select>
          </label>

          <label>Cliente/Empreendedor<input value={data.cliente} onChange={(e) => setData((prev) => ({ ...prev, cliente: e.target.value }))} /></label>
          <label>Propriedade/Área<input value={data.propriedade} onChange={(e) => setData((prev) => ({ ...prev, propriedade: e.target.value }))} /></label>
          <label>Município/UF<input value={data.municipioUf} onChange={(e) => setData((prev) => ({ ...prev, municipioUf: e.target.value }))} /></label>
          <label>Data da vistoria<input type="date" value={data.dataVistoria} onChange={(e) => setData((prev) => ({ ...prev, dataVistoria: e.target.value }))} /></label>
          <label>Número do processo/TCRA<input value={data.numeroProcesso} onChange={(e) => setData((prev) => ({ ...prev, numeroProcesso: e.target.value }))} /></label>

          <label className="full">Objetivo<textarea value={data.objetivo} onChange={(e) => setData((prev) => ({ ...prev, objetivo: e.target.value }))} /></label>
          <label className="full">Documentação recebida<textarea value={data.documentacaoRecebida} onChange={(e) => setData((prev) => ({ ...prev, documentacaoRecebida: e.target.value }))} /></label>
          <label className="full">Observações de campo<textarea value={data.observacoesCampo} onChange={(e) => setData((prev) => ({ ...prev, observacoesCampo: e.target.value }))} /></label>
          <label className="full">Diagnóstico ambiental<textarea value={data.diagnosticoAmbiental} onChange={(e) => setData((prev) => ({ ...prev, diagnosticoAmbiental: e.target.value }))} /></label>
          <label className="full">Recomendações técnicas<textarea value={data.recomendacoesTecnicas} onChange={(e) => setData((prev) => ({ ...prev, recomendacoesTecnicas: e.target.value }))} /></label>
          <label className="full">Conclusão<textarea value={data.conclusao} onChange={(e) => setData((prev) => ({ ...prev, conclusao: e.target.value }))} /></label>

          <section className="full uploads">
            <h2>Upload de arquivos</h2>
            <div className="upload-grid">
              <label>Fotos<input type="file" accept="image/*" multiple onChange={(e) => onFileChange('fotos', e.target.files)} /></label>
              <label>PDF<input type="file" accept=".pdf" multiple onChange={(e) => onFileChange('pdf', e.target.files)} /></label>
              <label>KML<input type="file" accept=".kml" multiple onChange={(e) => onFileChange('kml', e.target.files)} /></label>
              <label>Planilha Excel<input type="file" accept=".xlsx,.xls" multiple onChange={(e) => onFileChange('excel', e.target.files)} /></label>
            </div>
          </section>

          <button className="full" type="submit">Gerar relatório com IA</button>
        </form>
      ) : (
        <section className="preview">
          <div className="preview-head">
            <h2>Laudo Técnico Ambiental - {data.tipoRelatorio}</h2>
            <p>Cliente: {fallback(data.cliente)} | Área: {fallback(data.propriedade)} | Município/UF: {fallback(data.municipioUf)}</p>
          </div>

          {report && (
            <article className="report-card">
              <h3>1. Introdução e Histórico</h3><p>{report.introducaoHistorico}</p>
              <h3>2. Objetivos</h3><p>{report.objetivos}</p>
              <h3>3. Informações Gerais</h3><p>{report.informacoesGerais}</p>
              <h3>4. Metodologia</h3><p>{report.metodologia}</p>
              <h3>5. Caracterização da Área</h3><p>{report.caracterizacaoArea}</p>
              <h3>6. Diagnóstico Ambiental</h3><p>{report.diagnosticoAmbiental}</p>
              <h3>7. Recomendações Técnicas</h3><p>{report.recomendacoesTecnicas}</p>
              <h3>8. Considerações Finais</h3><p>{report.consideracoesFinais}</p>
              <h3>9. Anexos</h3><p>{report.anexos}</p>
              <p className="note">Documento gerado automaticamente para revisão técnica do responsável habilitado.</p>
            </article>
          )}

          <div className="actions">
            <button type="button" onClick={() => window.print()}>Imprimir / Salvar PDF</button>
            <button type="button" onClick={() => setReport(null)}>Voltar ao formulário</button>
          </div>
        </section>
      )}
    </main>
  )
}
