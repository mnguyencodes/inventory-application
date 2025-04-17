import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { createContext } from 'react'
import { ReactNode } from 'react'

interface AppShellInitContextType {
  opened: boolean
  toggle: () => void
}

interface AppShellInitProps {
  children: ReactNode
}

const AppShellInitContext = createContext<AppShellInitContextType>(null!)
export { AppShellInitContext }

export default function AppShellInit({ children }: AppShellInitProps) {
  const [opened, { toggle }] = useDisclosure()
  return (
    <AppShellInitContext.Provider value={{ opened, toggle }}>
      <AppShell
        header={{ height: 60 }}
        footer={{ height: 60 }}
        navbar={{
          width: { sm: 200, lg: 250 },
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding={{ base: 10, sm: 15, lg: 'xl' }}
      >
        {children}
      </AppShell>
    </AppShellInitContext.Provider>
  )
}
