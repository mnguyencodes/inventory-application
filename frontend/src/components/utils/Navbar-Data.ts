import {ForwardRefExoticComponent} from "react"
import {NavLinkProps} from "@mantine/core"
import {IconProps} from "@tabler/icons-react"
import {
    IconDeviceGamepad2,
    IconHome
} from "@tabler/icons-react"

interface MyNavLinkProps extends NavLinkProps {
    icon: ForwardRefExoticComponent<IconProps>
    href: string
}

const navbarData: MyNavLinkProps[] = [
    {
        href: "/",
        label: "Home",
        icon: IconHome,
    },
    {
        href: "/games",
        label: "Games",
        icon: IconDeviceGamepad2,
    },
]

export default navbarData