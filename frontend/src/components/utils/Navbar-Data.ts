import { ForwardRefExoticComponent } from 'react'
import { NavLinkProps } from '@mantine/core'
import { IconDeviceGamepad2, IconHome, IconProps, IconSettings } from '@tabler/icons-react'

interface MyNavLinkProps extends NavLinkProps {
  icon: ForwardRefExoticComponent<IconProps>
  href: string
  text: string
  authOnly?: boolean
}

const navbarData: MyNavLinkProps[] = [
  {
    href: '/',
    text: 'Home',
    icon: IconHome,
  },
  {
    href: '/games',
    text: 'Games',
    icon: IconDeviceGamepad2,
  },
  {
    href: '/manage-games',
    text: 'Manage Games',
    icon: IconSettings,
    authOnly: true,
  },
]

export default navbarData
