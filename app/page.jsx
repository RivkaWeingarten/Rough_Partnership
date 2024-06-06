// import React from 'react'
import Link from 'next/link'

function HomePage() {
  return (
    <div>
      <h1 className='text-3xl'>Welcome</h1>
      <Link href='/crystals'>Show Me the Rough</Link>

    </div>
  )
}

export default HomePage