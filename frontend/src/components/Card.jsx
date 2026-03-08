import React from 'react'

const Card = ({ children , bg = 'bg-gray-100'}) => {
  return (
    <div className={`rounded-lg shadow-md relative ${bg} p-6`}>
      {children}
    </div>
  )
}

export default Card
