import React from 'react'
import VanillaTilt from 'vanilla-tilt';

const VanillaComponent:React.FC<{children: React.ReactNode, className: string,}> = ({children, className}) => {
  const imageRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (imageRef.current) {
      VanillaTilt.init(imageRef.current)
    }
  }, [])
  return (
    <div className={className} ref={imageRef}>
      {children}
    </div>
  )
}

export default React.memo(VanillaComponent)
