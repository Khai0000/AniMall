import React from 'react';
import '../styles/Register.css';
import YellowTop from '../assets/images/yellow_top.png';

function ResetPassword(){

    return(
        <div className='reset-password-pages'>
            <img className='yellow-top' src={YellowTop} alt='yellowtop'/>
            <div className='register-component'>
                <h1 className='register-title'>Reset Password</h1>
                <form className='register-container'>
                    <input className='register-email' type="email" placeholder="Email" />
                    <input className='register-password' type="password" placeholder="Password" />
                    <input className='register-confirmpassword' type="password" placeholder="Confirmed Password" />
                    <button className='reset-button' type="submit">RESET</button>
                </form>
            </div>
        </div>
      );
    }

export default ResetPassword;