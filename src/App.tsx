import { FormEvent, useState } from 'react'

type ReportType = 'PRAD' | 'Relatório de Monitoramento' | 'Laudo de Vegetação' | 'TCRA'

type ReportFormData = {
  tipoRelatorio: ReportType
  cliente: string
  propriedade: string
  municipioUf: string
  dataVistoria: string
  processo: string
  objetivo: string
  documentacaoRecebida: string
  descricaoArea: string
  vegetacaoObservada: string
  appIntervencao: string
  compensacaoAmbiental: string
  observacoesCampo: string
  recomendacoes: string
  conclusao: string
}

type UploadedFiles = {
  pdf: File[]
  fotos: File[]
  kml: File[]
  planilha: File[]
}

type ReportDraft = {
  apresentacao: string
  objetivo: string
  documentacaoAnalisada: string
  caracterizacaoArea: string
  descricaoVegetacao: string
  diagnosticoAmbiental: string
  legislacaoCompensacao: string
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
  processo: '',
  objetivo: '',
  documentacaoRecebida: '',
  descricaoArea: '',
  vegetacaoObservada: '',
  appIntervencao: '',
  compensacaoAmbiental: '',
  observacoesCampo: '',
  recomendacoes: '',
  conclusao: '',
}

const exampleData: ReportFormData = {
  tipoRelatorio: 'Laudo de Vegetação',
  cliente: 'Gustavo Ferreira',
  propriedade: 'Sítio Santa Clara - Gleba 02',
  municipioUf: 'Campinas/SP',
  dataVistoria: '2026-05-18',
  processo: 'Proc. CETESB 2026/11892 | MP 15.004.2026 | TCRA 88/2026',
  objetivo: 'Avaliar vegetação existente e intervenções propostas para adequação ambiental da área.',
  documentacaoRecebida: 'Matrícula do imóvel, mapa georreferenciado, CAR, histórico fotográfico e requerimento CETESB.',
  descricaoArea: 'Área rural com uso misto, presença de curso d’água sazonal e talhões com pastagem e regeneração natural.',
  vegetacaoObservada: 'Vegetação secundária em estágio inicial e médio, capoeira, espécies nativas isoladas e indivíduos exóticos esparsos.',
  appIntervencao: 'APP com trechos parcialmente antropizados; intervenção pontual solicitada para acesso e contenção.',
  compensacaoAmbiental: 'Proposta de compensação com recomposição em área equivalente e enriquecimento florístico.',
  observacoesCampo: 'Foram vistoriados 12 pontos com registro fotográfico e conferência de limites em arquivo KML.',
  recomendacoes: 'Priorizar isolamento de APP, controle de invasoras e cronograma trimestral de monitoramento.',
  conclusao: 'A intervenção é tecnicamente viável com condicionantes e execução das medidas compensatórias indicadas.',
}

const safe = (text: string, fallback = 'Não informado.') => text.trim() || fallback
const fileNames = (list: File[]) => (list.length ? list.map((file) => file.name).join(', ') : 'Nenhum arquivo anexado.')

function generateEnvironmentalReport(data: ReportFormData, files: UploadedFiles): ReportDraft {
  return {
    apresentacao: `Este ${data.tipoRelatorio} foi elaborado para ${safe(data.cliente)}, referente à propriedade ${safe(data.propriedade)} em ${safe(data.municipioUf)}. A vistoria ocorreu em ${safe(data.dataVistoria)} e considera o processo ${safe(data.processo)}.`,
    objetivo: safe(data.objetivo),
    documentacaoAnalisada: safe(data.documentacaoRecebida),
    caracterizacaoArea: `${safe(data.descricaoArea)}\n\nObservações de campo: ${safe(data.observacoesCampo)}`,
    descricaoVegetacao: safe(data.vegetacaoObservada),
    diagnosticoAmbiental: `APP/intervenção: ${safe(data.appIntervencao)}\n\nSíntese diagnóstica: a área apresenta condições para regularização ambiental mediante execução das ações técnicas propostas.`,
    legislacaoCompensacao: `Processo/CETESB/MP/TCRA: ${safe(data.processo)}\n\nCompensação ambiental proposta: ${safe(data.compensacaoAmbiental)}`,
    recomendacoesTecnicas: safe(data.recomendacoes),
    consideracoesFinais: safe(data.conclusao),
    anexos: `PDF: ${fileNames(files.pdf)}\nFotos: ${fileNames(files.fotos)}\nKML: ${fileNames(files.kml)}\nPlanilha: ${fileNames(files.planilha)}`,
  }
}

export default function App() {
  const [showForm, setShowForm] = useState(false)
  const [data, setData] = useState<ReportFormData>(initialData)
  const [files, setFiles] = useState<UploadedFiles>({ pdf: [], fotos: [], kml: [], planilha: [] })
  const [report, setReport] = useState<ReportDraft | null>(null)

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
        <img className="logo" src="/logo.svg" alt="Logo AgroLaudo IA" />
        <h1>AgroLaudo IA</h1>
        <p>Fluxo rápido para montar e revisar rascunhos técnicos ambientais.</p>
        <button type="button" onClick={() => setShowForm(true)}>Novo Relatório</button>
      </main>
    )
  }

  return (
    <main className="container">
      <header className="topbar">
        <img className="logo" src="/logo.svg" alt="Logo AgroLaudo IA" />
        <button type="button" onClick={() => setData(exampleData)}>Carregar exemplo</button>
      </header>

      {!report ? (
        <form className="grid" onSubmit={onSubmit}>
          <label>Tipo de relatório
            <select value={data.tipoRelatorio} onChange={(e) => setData((prev) => ({ ...prev, tipoRelatorio: e.target.value as ReportType }))}>
              <option>PRAD</option>
              <option>Relatório de Monitoramento</option>
              <option>Laudo de Vegetação</option>
              <option>TCRA</option>
            </select>
          </label>
          <label>Cliente<input value={data.cliente} onChange={(e) => setData((prev) => ({ ...prev, cliente: e.target.value }))} /></label>
          <label>Propriedade<input value={data.propriedade} onChange={(e) => setData((prev) => ({ ...prev, propriedade: e.target.value }))} /></label>
          <label>Município/UF<input value={data.municipioUf} onChange={(e) => setData((prev) => ({ ...prev, municipioUf: e.target.value }))} /></label>
          <label>Data da vistoria<input type="date" value={data.dataVistoria} onChange={(e) => setData((prev) => ({ ...prev, dataVistoria: e.target.value }))} /></label>
          <label>Processo/CETESB/MP/TCRA<input value={data.processo} onChange={(e) => setData((prev) => ({ ...prev, processo: e.target.value }))} /></label>

          <label className="full">Objetivo<textarea value={data.objetivo} onChange={(e) => setData((prev) => ({ ...prev, objetivo: e.target.value }))} /></label>
          <label className="full">Documentação recebida<textarea value={data.documentacaoRecebida} onChange={(e) => setData((prev) => ({ ...prev, documentacaoRecebida: e.target.value }))} /></label>
          <label className="full">Descrição da área<textarea value={data.descricaoArea} onChange={(e) => setData((prev) => ({ ...prev, descricaoArea: e.target.value }))} /></label>
          <label className="full">Vegetação observada<textarea value={data.vegetacaoObservada} onChange={(e) => setData((prev) => ({ ...prev, vegetacaoObservada: e.target.value }))} /></label>
          <label className="full">APP/intervenção<textarea value={data.appIntervencao} onChange={(e) => setData((prev) => ({ ...prev, appIntervencao: e.target.value }))} /></label>
          <label className="full">Compensação ambiental<textarea value={data.compensacaoAmbiental} onChange={(e) => setData((prev) => ({ ...prev, compensacaoAmbiental: e.target.value }))} /></label>
          <label className="full">Observações de campo<textarea value={data.observacoesCampo} onChange={(e) => setData((prev) => ({ ...prev, observacoesCampo: e.target.value }))} /></label>
          <label className="full">Recomendações<textarea value={data.recomendacoes} onChange={(e) => setData((prev) => ({ ...prev, recomendacoes: e.target.value }))} /></label>
          <label className="full">Conclusão<textarea value={data.conclusao} onChange={(e) => setData((prev) => ({ ...prev, conclusao: e.target.value }))} /></label>

          <section className="full uploads">
            <h2>Upload visual de arquivos</h2>
            <div className="upload-grid">
              <label>PDF<input type="file" accept=".pdf" multiple onChange={(e) => onFileChange('pdf', e.target.files)} /></label>
              <label>Fotos<input type="file" accept="image/*" multiple onChange={(e) => onFileChange('fotos', e.target.files)} /></label>
              <label>KML<input type="file" accept=".kml" multiple onChange={(e) => onFileChange('kml', e.target.files)} /></label>
              <label>Planilha<input type="file" accept=".xlsx,.xls,.csv" multiple onChange={(e) => onFileChange('planilha', e.target.files)} /></label>
            </div>
          </section>

          <button className="full" type="submit">Gerar rascunho do laudo</button>
        </form>
      ) : (
        <section className="preview">
          <h2>Preview do laudo</h2>
          <article className="report-card">
            <p><strong>Apresentação</strong>{`\n${report.apresentacao}`}</p>
            <p><strong>Objetivo</strong>{`\n${report.objetivo}`}</p>
            <p><strong>Documentação analisada</strong>{`\n${report.documentacaoAnalisada}`}</p>
            <p><strong>Caracterização da área</strong>{`\n${report.caracterizacaoArea}`}</p>
            <p><strong>Descrição da vegetação</strong>{`\n${report.descricaoVegetacao}`}</p>
            <p><strong>Diagnóstico ambiental</strong>{`\n${report.diagnosticoAmbiental}`}</p>
            <p><strong>Legislação/compensação</strong>{`\n${report.legislacaoCompensacao}`}</p>
            <p><strong>Recomendações técnicas</strong>{`\n${report.recomendacoesTecnicas}`}</p>
            <p><strong>Considerações finais</strong>{`\n${report.consideracoesFinais}`}</p>
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
