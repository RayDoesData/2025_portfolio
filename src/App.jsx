import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'

const myName = "Davidson"

const App = () => {
  return (
    <div
      className="container mx-auto max-w-7xl"
    >
      <Navbar siteName={myName} />
      <Hero name={myName} />
      <About name={myName} />
      <Projects />
      <section className="min-h-screen"></section>
      <section className="min-h-screen"></section>
      <section className="min-h-screen"></section>
      {/* experience */}
      {/* testimonial */}
      {/* contact */}
      {/* footer */}
    </div>
  )
}


export default App