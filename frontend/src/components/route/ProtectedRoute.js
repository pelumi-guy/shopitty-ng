import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { loadUser } from '../../actions/authActions';
import Loader from '../layout/Loader';

const ProtectedRoute = ({ children, isAdmin = false }) => {

  const dispatch = useDispatch();

  const { isAuthenticated, loading, user } = useSelector(state => state.authentication);

  useEffect(() => {
    if (!user){
        dispatch(loadUser());
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (Loader)
  };

  if (!loading && isAuthenticated) {
    if (isAdmin === true && user.role !== 'admin') {
        return <Navigate to='/' />
    }
    return children;
  } else {
    return <Navigate to='/login/redirect' />
  }
}

export default ProtectedRoute