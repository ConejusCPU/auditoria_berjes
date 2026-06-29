import DocumentRenderer from './DocumentRenderer'

export default function Controles({ title, content, assets }) {
  return <DocumentRenderer title={title} content={content} assets={assets} />
}
