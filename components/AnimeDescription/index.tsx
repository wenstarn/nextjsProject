interface Props {
    description: string | null
}
export default function AnimeDescription({ description }: Props) {
  return (
        <div className="text-light">
            <h1>Описание</h1>
            {description}
        </div>
  )
}
