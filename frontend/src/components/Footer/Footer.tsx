import styles from "./Footer.module.css"
import {AppShell} from "@mantine/core"

export default function() {
    return (
        <AppShell.Footer className={styles.footer}>
            <h2>Inventory Application © {new Date().getFullYear()}</h2>
        </AppShell.Footer>
    )
}