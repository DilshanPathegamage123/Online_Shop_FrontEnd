
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store';

const NavBar = () => {
  const { isAuthenticated, userRole } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/signin');
  };

  return (
    <div className='w-100 pt-5 pb-4'>
      <nav className="navbar navbar-light bg-dark">
        <div className="container-fluid">
          <Link 
            to="/home"
            className="btn btn-secondary py-2 px-4"
          >
            <span className="navbar-brand">Online Shop</span>
          </Link>
          
          {isAuthenticated && userRole === 'admin' && (
            <div className="d-flex mx-auto">
              <Link to="/admin" className="btn btn-outline-light">
                Admin Dashboard
              </Link>
            </div>
          )}
          
          <div className="d-flex">
            {isAuthenticated ? (
              <button 
                onClick={handleSignOut}
                className="btn btn-outline-secondary bg-secondary text-white m-2 fw-bolder"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link to="/signin" className="btn btn-outline-secondary bg-secondary text-white m-2 fw-bolder">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-outline-secondary bg-secondary text-white m-2 fw-bolder">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar