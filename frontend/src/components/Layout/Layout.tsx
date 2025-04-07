import {Outlet} from "react-router"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import {AppShell} from "@mantine/core"
import {useDisclosure} from "@mantine/hooks"
import styles from "./Layout.module.css"

export default function Layout() {

    const [opened, { toggle }] = useDisclosure()

    return (
        <>
            <AppShell
                header={{ height: 60 }}
                footer={{ height: 60 }}
                navbar={{
                    width: {sm: 200, lg: 250},
                    breakpoint: 'sm',
                    collapsed: { mobile: !opened },
                }}
                padding={{ base: 10, sm: 15, lg: 'xl' }}
            >
                <Header toggle={toggle} opened={opened} />
                <AppShell.Main className={styles.main}>
                    <Outlet />
                </AppShell.Main>
                <Footer />
            </AppShell>
        </>  
    )
}