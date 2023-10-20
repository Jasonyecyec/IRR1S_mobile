import React from 'react'
import HamburgerIcon from '../assets/images/hamburger_icon.png'

const HomePage = () => {
  return (
    <div className=''>
      <div className='flex justify-between '>
          <button>
              <img src={HamburgerIcon}/>
          </button>

          <div className='space-x-5'>
            <button>+</button>
            <button className='bg-red-200 rounded-full w-10 h-10'>+</button>
          </div>
      </div>
    </div>
  )
}

export default HomePage