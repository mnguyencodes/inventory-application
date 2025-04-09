import {AppShell} from "@mantine/core"
import {Outlet} from "react-router"

export default function OutletInit() {
    return (
        <AppShell.Main>
            <Outlet />
        </AppShell.Main>
    )
}
