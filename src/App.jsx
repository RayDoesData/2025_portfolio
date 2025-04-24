import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'

const myName = "Davidson"

const App = () => {
  return (
    <div
      className="container mx-auto max-w-7xl"
    >
      <Navbar siteName={myName} />
      <Hero name={myName} />
      <section className="min-h-screen"></section>
      <section className="min-h-screen"></section>
      <section className="min-h-screen"></section>
      {/* about */}
      {/* projects */}
      {/* experience */}
      {/* testimonial */}
      {/* contact */}
      {/* footer */}
    </div>
  )
}


export default App