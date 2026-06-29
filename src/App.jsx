import React, { useState } from 'react'
import './App.css'

import resumenDoc from '../docs_berjes/01_resumen_berjes.md?raw'
import sqliDoc from '../docs_berjes/02_sqli_berjes.md?raw'
import xssDoc from '../docs_berjes/03_xss_berjes.md?raw'
import comandosDoc from '../docs_berjes/04_comandos.berjes.md?raw'
import activosDoc from '../docs_berjes/05_activos_berjes.md?raw'
import matrizDoc from '../docs_berjes/06_matriz_berjes.md?raw'
import controlesDoc from '../docs_berjes/07_controles_berjes.md?raw'
import recuperacionDoc from '../docs_berjes/08_recuperacion_berjes.md?raw'
import promptsDoc from '../docs_berjes/09_prompts_berjes.md?raw'

const imageAssets = {
  'img_berjes/sqli_berjes.png': new URL('../docs_berjes/img_berjes/sqli_berjes.png', import.meta.url).href,
  'img_berjes/XSS_berjes_1.png': new URL('../docs_berjes/img_berjes/XSS_berjes_1.png', import.meta.url).href,
  'img_berjes/XSS_berjes_2.png': new URL('../docs_berjes/img_berjes/XSS_berjes_2.png', import.meta.url).href,
  'img_berjes/comandos_berjes.png': new URL('../docs_berjes/img_berjes/comandos_berjes.png', import.meta.url).href,
}

function resolveAsset(src, assets = {}) {
  if (!src) return src
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src
  }
  return assets[src] || src
}

function formatInline(text, assets = {}) {
  const parts = []
  const regex = /(\*\*[^*]+\*\*|!\[([^\]]*)\]\(([^)]+)\)|\[[^\]]+\]\([^)]+\))/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]
    if (token.startsWith('**')) {
      parts.push(<strong key={`${token}-${match.index}`}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('![')) {
      const imageMatch = token.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
      if (imageMatch) {
        const src = resolveAsset(imageMatch[2], assets)
        parts.push(
          <figure key={`${token}-${match.index}`} className="doc-image-wrap">
            <img className="doc-image" src={src} alt={imageMatch[1] || 'Documento BERJES'} />
          </figure>,
        )
      } else {
        parts.push(token)
      }
    } else {
      const label = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (label) {
        parts.push(
          <a key={`${token}-${match.index}`} href={label[2]} target="_blank" rel="noreferrer">
            {label[1]}
          </a>,
        )
      } else {
        parts.push(token)
      }
    }

    lastIndex = match.index + token.length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

function renderMarkdown(markdown, assets = {}) {
  const lines = markdown.split(/\r?\n/)
  const blocks = []
  let paragraphLines = []
  let listItems = []
  let tableRows = []
  let codeLines = []
  let inCodeBlock = false

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      blocks.push(
        <p key={`p-${blocks.length}`}>
          {formatInline(paragraphLines.join(' '), assets)}
        </p>,
      )
      paragraphLines = []
    }
  }

  const flushCodeBlock = () => {
    if (codeLines.length > 0) {
      blocks.push(
        <pre key={`pre-${blocks.length}`} className="doc-code-block">
          <code>{codeLines.join('\n')}</code>
        </pre>,
      )
      codeLines = []
    }
  }

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push(
        <ul key={`ul-${blocks.length}`}>
          {listItems.map((item, index) => (
            <li key={`li-${blocks.length}-${index}`}>{item}</li>
          ))}
        </ul>,
      )
      listItems = []
    }
  }

  const flushTable = () => {
    if (tableRows.length > 0) {
      const [header, ...rows] = tableRows
      blocks.push(
        <table key={`table-${blocks.length}`}>
          <thead>
            <tr>
              {header.map((cell, index) => (
                <th key={`th-${index}`}>{formatInline(cell)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`tr-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`td-${rowIndex}-${cellIndex}`}>{formatInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>,
      )
      tableRows = []
    }
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim()

    if (trimmed.startsWith('```')) {
      flushParagraph()
      flushList()
      flushTable()
      if (!inCodeBlock) {
        inCodeBlock = true
        codeLines = []
      } else {
        inCodeBlock = false
        flushCodeBlock()
      }
      return
    }

    if (inCodeBlock) {
      codeLines.push(line)
      return
    }

    if (!trimmed) {
      flushParagraph()
      flushList()
      flushTable()
      return
    }

    if (/^#{1,6}\s/.test(trimmed)) {
      flushParagraph()
      flushList()
      flushTable()
      const level = trimmed.match(/^#+/)[0].length
      const text = trimmed.replace(/^#{1,6}\s/, '')
      blocks.push(React.createElement(`h${level}`, { key: `h-${index}` }, formatInline(text, assets)))
      return
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph()
      flushTable()
      listItems.push(trimmed.replace(/^[-*]\s+/, ''))
      return
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph()
      flushTable()
      listItems.push(trimmed.replace(/^\d+\.\s+/, ''))
      return
    }

    if (/^\|.*\|$/.test(trimmed)) {
      flushParagraph()
      flushList()
      tableRows.push(trimmed.split('|').slice(1, -1).map((cell) => cell.trim()))
      return
    }

    flushList()
    flushTable()
    paragraphLines.push(trimmed)
  })

  flushParagraph()
  flushList()
  flushTable()
  if (inCodeBlock) {
    flushCodeBlock()
  }

  return blocks
}

const sections = [
  { id: 'resumen', label: 'Resumen', title: 'Resumen ejecutivo', content: resumenDoc },
  { id: 'sqli', label: 'SQLi', title: 'Inyección SQL', content: sqliDoc },
  { id: 'xss', label: 'XSS', title: 'Cross Site Scripting', content: xssDoc },
  { id: 'comandos', label: 'Comandos', title: 'Inyección de comandos', content: comandosDoc },
  { id: 'activos', label: 'Activos', title: 'Activos en juego', content: activosDoc },
  { id: 'matriz', label: 'Matriz', title: 'Matriz de riesgos', content: matrizDoc },
  { id: 'controles', label: 'Controles', title: 'Controles y recomendaciones', content: controlesDoc },
  { id: 'recuperacion', label: 'Recuperación', title: 'Plan de recuperación', content: recuperacionDoc },
  { id: 'prompts', label: 'Prompts', title: 'Prompts de prueba', content: promptsDoc },
]

function App() {
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const activeDoc = sections.find((section) => section.id === activeSection) ?? sections[0]

  return (
    <div className="app-shell">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">Auditoría BERJES</p>
          <h1>Portal navegable de documentación de seguridad</h1>
          <p className="hero-copy">
            Explora cada informe desde un único panel con una experiencia visual inspirada en Matrix.
          </p>
        </div>
      </header>

      <main className="content-grid">
        <aside className="sidebar">
          <h2>Secciones</h2>
          <nav className="nav-list">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
                aria-pressed={activeSection === section.id}
              >
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="viewer">
          <article className="doc-card">
            <div className="doc-card__header">
              <span className="doc-card__eyebrow">Documento activo</span>
              <h2>{activeDoc.title}</h2>
            </div>
            <div className="doc-card__body">{renderMarkdown(activeDoc.content || '', imageAssets)}</div>
          </article>
        </section>
      </main>
    </div>
  )
}

export default App
