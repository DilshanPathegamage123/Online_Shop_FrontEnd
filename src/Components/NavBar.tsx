import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className=' w-100 pt-5 pb-4'>
      <nav className="navbar navbar-light bg-dark">
  <div className="container-fluid">
  <Link to="/home" className="btn btn-secondary py-2 px-4">
    <a className="navbar-brand">Online Shop</a>
    </Link>
    <form className="d-flex">
      <Link to="/signin" className="btn btn-outline-secondary bg-secondary text-white m-2 fw-bolder">
      Sign In
                </Link>

                <Link to="/signup" className="btn btn-outline-secondary bg-secondary text-white m-2 fw-bolder">
                Sign Out
                </Link>
      
    </form>
  </div>
</nav>
    </div>
  )
}

export default NavBar
