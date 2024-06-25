import React from 'react'

export const NewsCard = ({title,description,imageUrl,link}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover"/>
      <div className="p-6">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4 text-sm">{description.substring(0,100)}{'...'}</p>
        <a href={link} className="text-blue-500 cursor-pointer text-sm">Read More...</a>
      </div>
    </div>

  )
}
