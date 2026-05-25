import { FormEvent, useState } from 'react'
import mammoth from 'mammoth'

type ReportType = 'PRAD' | 'Relatório de Monitoramento' | 'Laudo de Vegetação' | 'TCRA'

type ReportFormData = {
  tipoRelatorio: ReportType
  cliente: string
  propriedade: string
  municipioUf: string
  dataVistoria: string
  processo: string
  objetivo: string
  observacoesCampo: string
}

type UploadedFiles = {
  docx: File[]
  pdf: File[]
  imagens: File[]
  audios: File[]
  videos: File[]
  planilhas: File[]
}

type ReportDraft = {
  informacoesGerais: string
  historico: string
  introducao: string
  localizacaoArea: string
  metodologia: string
  dadosCampo: string
  resultadosMonitoramento: string
  fotosAnexos: string
  consideracoesFinais: string
}

const initialData: ReportFormData = {
  tipoRelatorio: 'PRAD',
  cliente: '',
  propriedade: '',
  municipioUf: '',
  dataVistoria: '',
  processo: '',
  objetivo: '',
  observacoesCampo: '',
}

const safe = (text: string, fallback = 'Não informado.') => text.trim() || fallback
const fileNames = (list: File[]) => (list.length ? list.map((file) => file.name).join(', ') : 'Nenhum arquivo anexado.')

function summarizeDocText(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean) return 'Nenhum conteúdo textual relevante foi encontrado no DOCX.'
  return clean.length > 900 ? `${clean.slice(0, 900)}...` : clean
}

function generateEnvironmentalReport(data: ReportFormData, files: UploadedFiles, docText: string): ReportDraft {
  const docSummary = summarizeDocText(docText)
  return {
    informacoesGerais: `Tipo: ${data.tipoRelatorio}\nCliente: ${safe(data.cliente)}\nPropriedade: ${safe(data.propriedade)}\nMunicípio/UF: ${safe(data.municipioUf)}\nData da vistoria: ${safe(data.dataVistoria)}\nProcesso: ${safe(data.processo)}`,
    historico: `Com base nos documentos enviados pelo responsável técnico, especialmente o(s) DOCX anexado(s), foi consolidado o histórico técnico inicial para elaboração deste rascunho.\n\nResumo do conteúdo DOCX: ${docSummary}`,
    introducao: `Este rascunho foi gerado a partir dos dados fornecidos no formulário e do conteúdo real extraído dos documentos enviados. Objetivo declarado: ${safe(data.objetivo)}.`,
    localizacaoArea: `A área analisada está descrita como ${safe(data.propriedade)} no município de ${safe(data.municipioUf)}.`,
    metodologia: 'Leitura documental (DOCX/PDF/planilhas), análise dos anexos de mídia e consolidação das observações técnicas fornecidas no formulário para estruturação do laudo preliminar.',
    dadosCampo: safe(data.observacoesCampo),
    resultadosMonitoramento: `O conteúdo documental indica elementos técnicos para acompanhamento ambiental. Este texto deve ser revisado pelo responsável habilitado para validação final.\n\nTrecho-base extraído: ${docSummary}`,
    fotosAnexos: `DOCX: ${fileNames(files.docx)}\nPDF: ${fileNames(files.pdf)}\nImagens: ${fileNames(files.imagens)}\nÁudios: ${fileNames(files.audios)}\nVídeos: ${fileNames(files.videos)}\nPlanilhas: ${fileNames(files.planilhas)}`,
    consideracoesFinais: 'Rascunho gerado para apoio operacional a partir de documentos reais enviados pelo usuário. A versão final deve passar por revisão técnica do profissional responsável.',
  }
}

export default function App() {
  const [showForm, setShowForm] = useState(false)
  const [data, setData] = useState<ReportFormData>(initialData)
  const [files, setFiles] = useState<UploadedFiles>({ docx: [], pdf: [], imagens: [], audios: [], videos: [], planilhas: [] })
  const [docxPreview, setDocxPreview] = useState('')
  const [uploadMessage, setUploadMessage] = useState('')
  const [report, setReport] = useState<ReportDraft | null>(null)

  const onFileChange = (key: keyof UploadedFiles, selected: FileList | null) => {
    setFiles((prev) => ({ ...prev, [key]: selected ? Array.from(selected) : [] }))
  }

  const onDocxUpload = async (selected: FileList | null) => {
    const docxFiles = selected ? Array.from(selected) : []
    setFiles((prev) => ({ ...prev, docx: docxFiles }))
    if (docxFiles.length === 0) {
      setDocxPreview('')
      setUploadMessage('')
      return
    }

    try {
      const buffers = await Promise.all(docxFiles.map((file) => file.arrayBuffer()))
      const extractedTexts = await Promise.all(
        buffers.map(async (buffer) => {
          const result = await mammoth.extractRawText({ arrayBuffer: buffer })
          return result.value.trim()
        }),
      )
      const mergedText = extractedTexts.filter(Boolean).join('\n\n')
      setDocxPreview(mergedText)
      setUploadMessage('DOCX processado com sucesso. Prévia textual disponível abaixo.')
    } catch {
      setDocxPreview('')
      setUploadMessage('Não foi possível ler o DOCX. Verifique se o arquivo está válido e tente novamente.')
    }
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    setReport(generateEnvironmentalReport(data, files, docxPreview))
  }

  if (!showForm) {
    return (
      <main className="container landing">
        <img className="logo" src="/logo.svg" alt="Logo AgroLaudo IA" />
        <h1>AgroLaudo IA</h1>
        <p>Fluxo real para gerar rascunhos a partir de documentos enviados pelo cliente.</p>
        <button type="button" onClick={() => setShowForm(true)}>Novo Relatório</button>
      </main>
    )
  }

  return (
    <main className="container">
      <header className="topbar">
        <img className="logo" src="/logo.svg" alt="Logo AgroLaudo IA" />
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
          <label className="full">Observações de campo<textarea value={data.observacoesCampo} onChange={(e) => setData((prev) => ({ ...prev, observacoesCampo: e.target.value }))} /></label>

          <section className="full uploads">
            <h2>Upload real de documentos e anexos</h2>
            <div className="upload-grid">
              <label>DOCX<input type="file" accept=".docx" multiple onChange={(e) => onDocxUpload(e.target.files)} /></label>
              <label>PDF<input type="file" accept=".pdf" multiple onChange={(e) => onFileChange('pdf', e.target.files)} /></label>
              <label>Imagens<input type="file" accept="image/*" multiple onChange={(e) => onFileChange('imagens', e.target.files)} /></label>
              <label>Áudios<input type="file" accept="audio/*" multiple onChange={(e) => onFileChange('audios', e.target.files)} /></label>
              <label>Vídeos<input type="file" accept="video/*" multiple onChange={(e) => onFileChange('videos', e.target.files)} /></label>
              <label>Planilhas<input type="file" accept=".xlsx,.xls,.csv" multiple onChange={(e) => onFileChange('planilhas', e.target.files)} /></label>
            </div>
            {uploadMessage && <p className="helper-text">{uploadMessage}</p>}
          </section>

          <section className="full uploads">
            <h2>Prévia do texto extraído do DOCX</h2>
            <textarea value={docxPreview || 'Nenhum DOCX processado até o momento.'} readOnly className="docx-preview" />
          </section>

          <button className="full" type="submit">Gerar laudo a partir dos documentos enviados</button>
        </form>
      ) : (
        <section className="preview">
          <h2>Preview do laudo</h2>
          <article className="report-card">
            <p><strong>Informações gerais</strong>{`\n${report.informacoesGerais}`}</p>
            <p><strong>Histórico</strong>{`\n${report.historico}`}</p>
            <p><strong>Introdução</strong>{`\n${report.introducao}`}</p>
            <p><strong>Localização da área</strong>{`\n${report.localizacaoArea}`}</p>
            <p><strong>Metodologia</strong>{`\n${report.metodologia}`}</p>
            <p><strong>Dados coletados em campo</strong>{`\n${report.dadosCampo}`}</p>
            <p><strong>Resultados do monitoramento</strong>{`\n${report.resultadosMonitoramento}`}</p>
            <p><strong>Fotos/Anexos</strong>{`\n${report.fotosAnexos}`}</p>
            <p><strong>Considerações finais</strong>{`\n${report.consideracoesFinais}`}</p>
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
