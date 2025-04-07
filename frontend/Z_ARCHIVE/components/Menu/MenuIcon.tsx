import "./_Menu.css"
import HamburgerIcon from "./HamburgerIcon"
import {useContext} from "react"
import {MenuContext} from "./Menu"

export default function MenuIcon() {
    const {toggleOpen} = useContext(MenuContext)
    return (
        <HamburgerIcon onClick={toggleOpen} />    
    )
}