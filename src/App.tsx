import { FormEvent, useState } from 'react'

type ReportType = 'PRAD' | 'Relatório de Monitoramento' | 'Laudo de Vegetação' | 'TCRA'

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
  titulo: string
  identificacao: string
  objetivo: string
  documentacao: string
  observacoes: string
  diagnostico: string
  recomendacoes: string
  conclusao: string
  anexos: string
}

const initialData: ReportFormData = {
  tipoRelatorio: 'PRAD', cliente: '', propriedade: '', municipioUf: '', dataVistoria: '', numeroProcesso: '',
  objetivo: '', documentacaoRecebida: '', observacoesCampo: '', diagnosticoAmbiental: '', recomendacoesTecnicas: '', conclusao: '',
}

const exampleData: ReportFormData = {
  tipoRelatorio: 'Relatório de Monitoramento',
  cliente: 'AgroVerde Empreendimentos Ltda.',
  propriedade: 'Fazenda Boa Esperança - Gleba Norte (126 ha)',
  municipioUf: 'Sorriso/MT',
  dataVistoria: '2026-04-18',
  numeroProcesso: 'TCRA-2026-0418 / Proc. SEMA 55.321/2025',
  objetivo: 'Avaliar a evolução da recomposição vegetal e conformidade ambiental da área monitorada.',
  documentacaoRecebida: 'TCRA assinado, CAR, mapas georreferenciados e relatório anterior.',
  observacoesCampo: 'Vistoria em 14 pontos com registro fotográfico. Boa regeneração, com falhas pontuais.',
  diagnosticoAmbiental: 'Cobertura vegetal em recuperação com necessidade de ajustes localizados em áreas de encosta.',
  recomendacoesTecnicas: 'Replantio pontual, controle de invasoras e monitoramento trimestral.',
  conclusao: 'A área está em evolução positiva, recomendando continuidade das medidas de recuperação.',
}

const fallback = (value: string, text = 'Não informado.') => value.trim() || text
const listFiles = (files: File[]) => (files.length ? files.map((f) => f.name).join(', ') : 'Nenhum arquivo anexado.')

function generateEnvironmentalReport(data: ReportFormData, files: UploadedFiles): ReportSections {
  return {
    titulo: `${data.tipoRelatorio} - AgroLaudo IA`,
    identificacao: `Cliente: ${fallback(data.cliente)}\nPropriedade: ${fallback(data.propriedade)}\nMunicípio/UF: ${fallback(data.municipioUf)}\nData da vistoria: ${fallback(data.dataVistoria)}\nProcesso/TCRA: ${fallback(data.numeroProcesso)}`,
    objetivo: fallback(data.objetivo),
    documentacao: fallback(data.documentacaoRecebida),
    observacoes: fallback(data.observacoesCampo),
    diagnostico: fallback(data.diagnosticoAmbiental),
    recomendacoes: fallback(data.recomendacoesTecnicas),
    conclusao: fallback(data.conclusao),
    anexos: `Fotos: ${listFiles(files.fotos)}\nPDF: ${listFiles(files.pdf)}\nKML: ${listFiles(files.kml)}\nExcel: ${listFiles(files.excel)}`,
  }
}

export default function App() {
  const [showForm, setShowForm] = useState(false)
  const [data, setData] = useState<ReportFormData>(initialData)
  const [files, setFiles] = useState<UploadedFiles>({ fotos: [], pdf: [], kml: [], excel: [] })
  const [report, setReport] = useState<ReportSections | null>(null)

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
        <img className="logo" src="/logo.svg" alt="AgroLaudo IA" />
        <h1>AgroLaudo IA</h1>
        <p>MVP simples para gerar relatórios ambientais de forma rápida.</p>
        <button type="button" onClick={() => setShowForm(true)}>Novo relatório</button>
      </main>
    )
  }

  return (
    <main className="container">
      <header className="topbar">
        <img className="logo" src="/logo.svg" alt="AgroLaudo IA" />
        <button type="button" onClick={() => setData(exampleData)}>Carregar exemplo</button>
      </header>

      {!report ? (
        <form className="grid" onSubmit={onSubmit}>
          <label>Tipo de relatório
            <select value={data.tipoRelatorio} onChange={(e) => setData((prev) => ({ ...prev, tipoRelatorio: e.target.value as ReportType }))}>
              <option>PRAD</option><option>Relatório de Monitoramento</option><option>Laudo de Vegetação</option><option>TCRA</option>
            </select>
          </label>
          <label>Cliente/Empreendedor<input value={data.cliente} onChange={(e) => setData((p) => ({ ...p, cliente: e.target.value }))} /></label>
          <label>Propriedade/Área<input value={data.propriedade} onChange={(e) => setData((p) => ({ ...p, propriedade: e.target.value }))} /></label>
          <label>Município/UF<input value={data.municipioUf} onChange={(e) => setData((p) => ({ ...p, municipioUf: e.target.value }))} /></label>
          <label>Data da vistoria<input type="date" value={data.dataVistoria} onChange={(e) => setData((p) => ({ ...p, dataVistoria: e.target.value }))} /></label>
          <label>Número do processo/TCRA<input value={data.numeroProcesso} onChange={(e) => setData((p) => ({ ...p, numeroProcesso: e.target.value }))} /></label>

          <label className="full">Objetivo<textarea value={data.objetivo} onChange={(e) => setData((p) => ({ ...p, objetivo: e.target.value }))} /></label>
          <label className="full">Documentação recebida<textarea value={data.documentacaoRecebida} onChange={(e) => setData((p) => ({ ...p, documentacaoRecebida: e.target.value }))} /></label>
          <label className="full">Observações de campo<textarea value={data.observacoesCampo} onChange={(e) => setData((p) => ({ ...p, observacoesCampo: e.target.value }))} /></label>
          <label className="full">Diagnóstico ambiental<textarea value={data.diagnosticoAmbiental} onChange={(e) => setData((p) => ({ ...p, diagnosticoAmbiental: e.target.value }))} /></label>
          <label className="full">Recomendações técnicas<textarea value={data.recomendacoesTecnicas} onChange={(e) => setData((p) => ({ ...p, recomendacoesTecnicas: e.target.value }))} /></label>
          <label className="full">Conclusão<textarea value={data.conclusao} onChange={(e) => setData((p) => ({ ...p, conclusao: e.target.value }))} /></label>

          <section className="full uploads">
            <h2>Upload visual de arquivos</h2>
            <div className="upload-grid">
              <label>Fotos<input type="file" accept="image/*" multiple onChange={(e) => onFileChange('fotos', e.target.files)} /></label>
              <label>PDF<input type="file" accept=".pdf" multiple onChange={(e) => onFileChange('pdf', e.target.files)} /></label>
              <label>KML<input type="file" accept=".kml" multiple onChange={(e) => onFileChange('kml', e.target.files)} /></label>
              <label>Planilha Excel<input type="file" accept=".xlsx,.xls" multiple onChange={(e) => onFileChange('excel', e.target.files)} /></label>
            </div>
          </section>

          <button className="full" type="submit">Gerar relatório</button>
        </form>
      ) : (
        <section className="preview">
          <h2>Preview do relatório</h2>
          <article className="report-card">
            <h3>{report.titulo}</h3>
            <p><strong>Identificação</strong>{`\n${report.identificacao}`}</p>
            <p><strong>Objetivo</strong>{`\n${report.objetivo}`}</p>
            <p><strong>Documentação recebida</strong>{`\n${report.documentacao}`}</p>
            <p><strong>Observações de campo</strong>{`\n${report.observacoes}`}</p>
            <p><strong>Diagnóstico ambiental</strong>{`\n${report.diagnostico}`}</p>
            <p><strong>Recomendações técnicas</strong>{`\n${report.recomendacoes}`}</p>
            <p><strong>Conclusão</strong>{`\n${report.conclusao}`}</p>
            <p><strong>Anexos</strong>{`\n${report.anexos}`}</p>
          </article>

          <div className="actions">
            <button type="button" onClick={() => window.print()}>Imprimir / Salvar PDF</button>
            <button type="button" onClick={() => setReport(null)}>Voltar ao formulário</button>
          </div>
        </section>
      )}
    </main>
  )
}
