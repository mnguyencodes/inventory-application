import "./_Menu.css"
import {useContext} from "react"
import {MenuContext} from "./Menu"

export default function MenuDropdown({children}) {
    const {open} = useContext(MenuContext)

    return open && (
        <div className="menu-dropdown-container">
            {children}
        </div>
    )
}