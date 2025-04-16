import {AppShell} from "@mantine/core";
import styles from "./_styles/Navbar.module.css"
import {NavLink as NavLinkMantine} from "@mantine/core"
import {NavLink} from "react-router"
import {useState} from "react"
import navbarData from "./utils/Navbar-Data"
import {AppShellInitContext} from "./AppShellInit"
import {useContext} from "react"

export default function Navbar() {

    const {toggle} = useContext(AppShellInitContext)
    const [active, setActive] = useState<number | null>(null)
    
    function handleClick(index: number, toggle: () => void) {
        setActive(index)
        toggle()
    }

    const navbarEl = navbarData.map((navlink, index)=>{
        return <NavLinkMantine
            component={NavLink}
            to={navlink.href}
            key={navlink.text}
            label={navlink.text}
            active={index === active}
            leftSection={<navlink.icon size={16} stroke={1.5}/>}
            onClick={()=>handleClick(index, toggle)}
            variant="filled"
        />
    })

    return (
        <AppShell.Navbar className={styles.nav} p="md">
            {navbarEl}
        </AppShell.Navbar>
    )
}
