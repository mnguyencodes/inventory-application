import "./Header.css"
import Menu from "../Menu/index"
import logo from "./logo.png"
import {Link} from "react-router"
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons"

import { faGamepad } from "@fortawesome/free-solid-svg-icons/faGamepad"

export default function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <Menu.Menu>
                        <Menu.MenuIcon />
                        <Menu.MenuDropdown>
                            <Menu.MenuItem icon={faHouseChimney} to=".">Home</Menu.MenuItem>
                            <Menu.MenuItem icon={faGamepad} to="games">Games</Menu.MenuItem>
                        </Menu.MenuDropdown>
                    </Menu.Menu>
                    <Link to="." className="logo">
                        <img src={logo} />
                    </Link>
                </ul>
            </nav>
        </header>
    )
}
