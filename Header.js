import React from 'react'

const Header = ({ title }) => {
  return (
    <main className='Header'>
    <h1>{title}</h1>
    {/* {width < 768 ?<FAcell /> :width < 992 ?<FAtab />:<FAlaptop />} */}
    </main>
  )
}

export default Header