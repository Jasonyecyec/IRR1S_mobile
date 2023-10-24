import React from 'react'
import { Link } from 'react-router-dom'

const HomeProcessButton = ({link,icon,name}) => {
  return (
    <div  className="text-center">
          <Link
            to={link}
            className="text-center rounded-[20px] w-20 h-20 bg-white flex flex-col items-center justify-center"
          >
            <img src={icon} className="w-8 h-8" />
          </Link>

          <p className="mt-1">{name}</p>
        </div>
  )
}

export default HomeProcessButton