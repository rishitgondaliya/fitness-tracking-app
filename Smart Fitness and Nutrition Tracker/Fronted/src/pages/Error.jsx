import React from 'react'
import page_not_found from "../assets/logo/page_not_found.svg";
export const Error = () => {
  return (
    <div className='flex items-center justify-center mt-32'>
        <img src={page_not_found} alt="404" width={300} height={300}/>
    </div>
  )
}
