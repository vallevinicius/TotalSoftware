import { Outlet } from 'react-router-dom'
import CustomCursor from './CustomCursor'
import Navbar from './Navbar'
import Footer from './Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Layout() {
  useScrollReveal()

  return (
    <>
      <CustomCursor />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
