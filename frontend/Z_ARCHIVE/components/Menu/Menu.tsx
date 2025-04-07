import {createContext} from "react"
import useToggle from "../../hooks/useToggle"
import {MenuProps} from "./MenuTypes"

const MenuContext = createContext(undefined)
export {MenuContext}

const Menu: React.FC<MenuProps> = ({children, onToggle}) => {

    const [open, toggleOpen] = useToggle({
        initialValue: false,
        onToggle: onToggle
    })

    return (
        <MenuContext.Provider value={{open, toggleOpen}}>
            <div className="menu">
                {children}
            </div>
        </MenuContext.Provider>
    )
}

export default Menu