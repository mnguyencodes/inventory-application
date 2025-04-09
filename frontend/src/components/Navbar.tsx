import {AppShell} from "@mantine/core";
import styles from "./_styles/Navbar.module.css"

export default function Navbar() {
    return (
        <AppShell.Navbar className={styles.nav} p="md">Navbar</AppShell.Navbar>
    )
}