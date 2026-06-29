import DocumentRenderer from './DocumentRenderer'

export default function Prompts({ title, content, assets }) {
  return <DocumentRenderer title={title} content={content} assets={assets} />
}
