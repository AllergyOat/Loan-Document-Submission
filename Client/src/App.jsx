import { useState } from 'react'
import Nav from './components/Nav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav />
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className="font-bold text-blue-950 underline">Hello world</h1>
        <p>Hello everyone :D</p>
      </div>
    </>
  )
}

export default App