import DocumentRenderer from './DocumentRenderer'

export default function Comandos({ title, content, assets }) {
  return <DocumentRenderer title={title} content={content} assets={assets} />
}
