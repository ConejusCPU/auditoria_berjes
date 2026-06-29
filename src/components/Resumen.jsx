import DocumentRenderer from './DocumentRenderer'

export default function Resumen({ title, content, assets }) {
  return <DocumentRenderer title={title} content={content} assets={assets} />
}
