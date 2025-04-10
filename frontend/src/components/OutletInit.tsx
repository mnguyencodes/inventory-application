import {AppShell} from "@mantine/core"
import {Outlet} from "react-router"
import styles from "./_styles/Layout.module.css"

export default function OutletInit() {
    return (
        <AppShell.Main className={styles.main}>
            <Outlet />
        </AppShell.Main>
    )
}
