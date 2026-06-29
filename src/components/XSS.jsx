import DocumentRenderer from './DocumentRenderer'

export default function XSS({ title, content, assets }) {
  return <DocumentRenderer title={title} content={content} assets={assets} />
}
