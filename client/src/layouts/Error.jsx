import React from 'react';
import '../assets/css/error.css';
import { useNavigate } from 'react-router-dom';



export default function Error() {
  const navigate = useNavigate();

  const goToHome = () =>{
    navigate("/");
  }
  return (
    <div className='error-page'>
      <div className='error-page-heading'>Oops!</div>
      <div className='error-page-404'>404 - PAGE NOT FOUND</div>
      <button className='error-page-btn' onClick={goToHome}>GO TO HOMEPAGE</button>
    </div>
  )
}
