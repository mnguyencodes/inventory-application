import {AppShell} from "@mantine/core";
import styles from "./_styles/Navbar.module.css"
import {NavLink as NavLinkMantine} from "@mantine/core"
import {NavLink} from "react-router"
import {useState} from "react"
import navbarData from "./utils/Navbar-Data"

export default function Navbar() {

    const [active, setActive] = useState<number | null>(null)

    const navbarEl = navbarData.map((navlink, index)=>{
        return <NavLinkMantine
            component={NavLink}
            to={navlink.href}
            key={navlink.text}
            label={navlink.text}
            active={index === active}
            leftSection={<navlink.icon size={16} stroke={1.5}/>}
            onClick={()=>setActive(index)}
            variant="filled"
        />
    })

    return (
        <AppShell.Navbar className={styles.nav} p="md">
            {navbarEl}
        </AppShell.Navbar>
    )
}
