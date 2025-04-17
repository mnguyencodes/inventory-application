import AppShellInit from './AppShellInit'
import Header from './Header'
import Navbar from './Navbar'
import OutletInit from './OutletInit'
import Footer from './Footer'

// import styles from "./_styles/Layout.module.css"

export default function Layout() {
  return (
    <>
      <AppShellInit>
        <Header />
        <Navbar />
        <OutletInit />
        <Footer />
      </AppShellInit>
    </>
  )
}
