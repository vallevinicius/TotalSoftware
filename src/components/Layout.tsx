import { Outlet } from 'react-router-dom'
import CustomCursor from './CustomCursor'
import Navbar from './Navbar'
import Footer from './Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useScrollToTop } from '../hooks/useScrollToTop'

export default function Layout() {
  useScrollToTop()
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
