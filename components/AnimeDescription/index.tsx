interface Props {
    description: string | null
}
export default function AnimeDescription({ description }: Props) {
  return (
        <div style={{ marginBottom: '16px' }} className="text-light">
            <h1>Описание</h1>
            {description}
        </div>
  )
}
