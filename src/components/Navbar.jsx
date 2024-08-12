import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-violet-950 w-full justify-between p-4'>
      <div className='font-bold text-white text-3xl'>ITask</div>
          <div>
              <ul className='flex text-white gap-7 text-xl'>
                  <li className='cursor-pointer'>home</li>
                  <li className='cursor-pointer'>Your Task</li>
              </ul>    
          </div>
    </nav>
  )
}

export default Navbar
