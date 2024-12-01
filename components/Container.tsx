type ContainerProps = {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className='flex flex-col bg-white/[2%] min-h-screen max-w-7xl mx-auto'>
      {children}
    </div>
  )
}
