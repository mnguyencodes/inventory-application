import navbarData from './utils/Navbar-Data'
import { AppShellInitContext } from './AppShellInit'
import { AppShell } from '@mantine/core'
import { NavLink as NavLinkMantine } from '@mantine/core'
import { Button } from '@mantine/core'
import { NavLink } from 'react-router'
import { useContext } from 'react'
import { useState } from 'react'
import styles from './_styles/Navbar.module.css'

export default function Navbar() {
  const { toggle } = useContext(AppShellInitContext)
  const [active, setActive] = useState<number | null>(null)

  function handleClick(index: number, toggle: () => void) {
    setActive(index)
    toggle()
  }

  const navbarEl = navbarData.map((navlink, index) => {
    return (
      <NavLinkMantine
        component={NavLink}
        to={navlink.href}
        key={navlink.text}
        label={navlink.text}
        active={index === active}
        leftSection={<navlink.icon size={16} stroke={1.5} />}
        onClick={() => handleClick(index, toggle)}
        variant="filled"
      />
    )
  })

  return (
    <AppShell.Navbar className={styles.nav} p="md">
      <div className={styles.account}>
        <Button variant="filled" component={NavLink} to="/users/sign-up">
          Sign up
        </Button>
        <Button variant="light" component={NavLink} to="/users/log-in">
          Log in
        </Button>
      </div>
      {navbarEl}
    </AppShell.Navbar>
  )
}
