import {AppShell} from "@mantine/core";
import styles from "./_styles/Navbar.module.css"
import {NavLink} from "@mantine/core"
import {useState} from "react"
import navbarData from "./utils/Navbar-Data"

export default function Navbar() {
    // const [active, setActive] = useState(0)

    // const navbarEl = navbarData.map((navlink, index)=>{
    //     return <NavLink 
    //         href={navlink.href}
    //         key={navlink.label}
    //         active={index === active}
    //         leftSection={<navlink.leftSection size={16} stroke={1.5}/>}
    //         onClick={()=>setActive(index)}
    //     />
    // })

    return (
        <AppShell.Navbar className={styles.nav} p="md">
            {/* {navbarEl} */}
            <NavLink href="/" />
            <NavLink href="/games" />
            <NavLink leftSection ></NavLink>
        </AppShell.Navbar>
    )
}

{/* <NavLink href="/">Home</NavLink>
<NavLink href="/games">Games</NavLink>
<NavLink leftSection ></NavLink> */}