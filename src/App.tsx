import './App.css'
import Manager from './Manager'
import Navbar from './Navbar'
import SideBar from './SideBar'

function App() {
  return (
    <body className='flex flex-row'>
      <section>
        <div className='hidden md:flex'>
          <SideBar /> 
        </div>
      </section>
      <section className='flex flex-col'>
        <div className=''><Navbar /></div>
        <div className='overflow-x-scroll scrollbar-hidden relative'><Manager /></div>
      </section>
    </body>
  )
}

export default App
