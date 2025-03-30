import "./_Menu.css"
import {Link} from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MenuItem({to, icon, children}) {
    const iconEl = icon ? <FontAwesomeIcon className="fa-icon" icon={icon} /> : ""
    return (
        <Link className="menu-item" to={to}>
            <span className="menu-item-icon">{iconEl}</span>
            <span className="menu-item-text">{children}</span>
        </Link>
    )
}
