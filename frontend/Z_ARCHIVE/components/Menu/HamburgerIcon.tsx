import "./_Menu.css"

export default function HamburgerIcon({...rest}) {
    return (
        <>
            <div className="hamburger-container" {...rest}>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
            </div>
        </>
    )
}