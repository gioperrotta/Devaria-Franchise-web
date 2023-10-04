

interface SpinnerProps {
  isOpen: boolean
}

export function Spinner({ isOpen }: SpinnerProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-green-950 bg-opacity-10 flex justify-center items-center" >
      <div
        className="inline-block h-16 w-16 animate-spin rounded-full border-8 border-solid border-green-900 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >
          Loading...
        </span>
      </div>
    </div>
  )
}