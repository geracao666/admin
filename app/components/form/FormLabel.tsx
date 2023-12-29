export default function FormLabel({
  children,
  title,
  error = ''
}: {
  children: React.ReactNode,
  title: string,
  error?: string
}) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{title}</span>
      </div>

      {children}

      <div className="label">
        <span className="label-text-alt text-red-600">
          {error}&nbsp;
        </span>
      </div>
    </label>
  )
}