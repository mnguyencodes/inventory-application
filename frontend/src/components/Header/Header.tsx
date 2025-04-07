// import styles from "./Header.module.css"
// import logo from "./logo.png"
// import {Link} from "react-router"
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faHouseChimney} from "@fortawesome/free-solid-svg-icons"
// import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad"

import styles from "./Header.module.css"

// import "./Header.module.css"

import {
    Burger,
    AppShell,
    // Group
} from "@mantine/core"

interface HeaderProps {
    opened: boolean
    toggle: () => void
}

export default function Header({opened, toggle}: HeaderProps) {
    

    return (
        <>
            <AppShell.Header>
                <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
                />
                <div>Logo</div>
            </AppShell.Header>

            <AppShell.Navbar className={styles.nav} p="md">Navbar</AppShell.Navbar>
        </>

    )
}
