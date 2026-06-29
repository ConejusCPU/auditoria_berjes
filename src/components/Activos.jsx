import DocumentRenderer from './DocumentRenderer'

export default function Activos({ title, content, assets }) {
  return <DocumentRenderer title={title} content={content} assets={assets} />
}
