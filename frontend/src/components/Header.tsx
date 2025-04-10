// import styles from "./Header.module.css"
// import logo from "./logo.png"
// import {Link} from "react-router"
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faHouseChimney} from "@fortawesome/free-solid-svg-icons"
// import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad"

// import styles from "./_sty/es/Header.module.css"

// import "./Header.module.css"

import {
    Burger,
    AppShell,
    // Group
} from "@mantine/core"

import {useContext} from "react"
import {AppShellInitContext} from "./AppShellInit"
import styles from "./_styles/Header.module.css"

export default function Header() {

    const {opened, toggle} = useContext(AppShellInitContext)

    return (
        <>
            <AppShell.Header className={styles.header}>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                    className={styles.burger}
                />
                <div className={styles.logo}>Logo</div>
            </AppShell.Header>
        </>
    )
}