import React from 'react'

const DefaultLayout = async ({ children }: { children: React.ReactNode}) => {
  return (
    <React.Fragment>
        {children}
    </React.Fragment>
  )
}

export default DefaultLayout
