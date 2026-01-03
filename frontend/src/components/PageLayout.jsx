import Navbar from './Navbar'
import { useEffect } from 'react'

function PageLayout({ children, className = "" }) {
  useEffect(() => {
    // Scroll to top on page navigation to ensure navbar is visible
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <div className={`pt-20 ${className}`}>
        {children}
      </div>
    </>
  )
}

export default PageLayout