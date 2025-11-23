export default function TypeBadge({ type }: { type: string }) {
  return (
    <div className="bg-white/10 rounded-full px-4 py-2">
      {type}
    </div>
  )
}