import { ForwardRefExoticComponent } from 'react'
import { NavLinkProps } from '@mantine/core'
import { IconDeviceGamepad2, IconHome, IconProps } from '@tabler/icons-react'

interface MyNavLinkProps extends NavLinkProps {
  icon: ForwardRefExoticComponent<IconProps>
  href: string
  text: string
  authOnly?: boolean // Optional property to indicate if the link requires authentication
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
