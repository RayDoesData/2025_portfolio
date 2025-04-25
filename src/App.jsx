import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Experiences from './sections/Experiences'
import Testimonial from './sections/Testimonial'
import Contact from './sections/Contact'

const myName = "Davidson"
const myEmail = "davidsonf108@gmail.com"

const App = () => {
  return (
    <div
      className="container mx-auto max-w-7xl mb-40"
    >
      <Navbar siteName={myName} />
      <Hero name={myName} />
      <About myName={myName} myEmail={myEmail} />
      <Projects />
      <Experiences />
      <Testimonial />
      <Contact myName={myName} myEmail={myEmail} />
      {/* footer */}
    </div>
  )
}


export default App