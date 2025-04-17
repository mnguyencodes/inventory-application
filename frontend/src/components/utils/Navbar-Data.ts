import { ForwardRefExoticComponent } from 'react'
import { NavLinkProps } from '@mantine/core'
import { IconDeviceGamepad2, IconHome, IconProps } from '@tabler/icons-react'

interface MyNavLinkProps extends NavLinkProps {
  icon: ForwardRefExoticComponent<IconProps>
  href: string
  text: string
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
]

export default navbarData
