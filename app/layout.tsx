import React from 'react'
import StyledComponentsRegistry from '@/lib/registry'

const DefaultLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <StyledComponentsRegistry>
        {children}
      </StyledComponentsRegistry>
    </React.Fragment>
  )
}

export default DefaultLayout
