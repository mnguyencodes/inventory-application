import {AppShell} from "@mantine/core";
import styles from "./_styles/Navbar.module.css"
import {NavLink} from "@mantine/core"
import {useState} from "react"
import navbarData from "./utils/Navbar-Data"

export default function Navbar() {

    const [active, setActive] = useState(0)

    const navbarEl = navbarData.map((navlink, index)=>{
        console.log("Inside map!")
        return <NavLink 
            href={navlink.href}
            key={navlink.text}
            label={navlink.text}
            active={index === active}
            leftSection={<navlink.icon size={16} stroke={1.5}/>}
            onClick={()=>setActive(index)}
        />
    })

    return (
        <AppShell.Navbar className={styles.nav} p="md">
            {navbarEl}
        </AppShell.Navbar>
    )
}
