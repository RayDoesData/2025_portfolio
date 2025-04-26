import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Experiences from './sections/Experiences'
import Testimonial from './sections/Testimonial'
import Contact from './sections/Contact'

const siteName = "Morpheus Dev"
const myEmail = "davidsonf108@gmail.com"

const App = () => {
  return (
    <div
      className="container mx-auto max-w-7xl mb-40"
    >
      <Navbar siteName={siteName} />
      <Hero />
      <About />
      <Projects />
      <Experiences />
      <Testimonial />
      <Contact />
      {/* footer */}
    </div>
  )
}


export default App