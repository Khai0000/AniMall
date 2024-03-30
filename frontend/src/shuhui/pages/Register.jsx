import React, { useState, useEffect } from 'react';
import '../styles/Register.css';
import YellowTop from '../assets/images/yellow_top.png';
import VerifyIcon from '../assets/images/verify_icon.png';

function Register(){
    const [showVerify, setShowVerify] = useState(false);

    const handleRegisterClick = () => {
        setShowVerify(true);
    };

    return(
        <div className='register-pages-container'>
            <img className='yellow-top' src={YellowTop} alt='yellowtop'/>
            {!showVerify ?
            
            (<div className='register-pages'>
            
            <div className='register-component'>
                <h1 className='register-title'>Create Account</h1>
                <form className='register-container'>
                    <input className='register-username' type="text" placeholder="Username" />
                    <input className='register-email' type="email" placeholder="Email" />
                    <input className='register-password' type="password" placeholder="Password" />
                    <input className='register-confirmpassword' type="password" placeholder="Confirmed Password" />
                    <button className='register-button' onClick={handleRegisterClick} type="submit">REGISTER</button>
                </form>
            </div>
        </div>
        ):(
            <div className='register-verify'>
                <img className='verify-icon' src={VerifyIcon} alt='verifyicon'/>
                <p className='verify-text'>Please enter your verification code here.</p>
                <form className='verification-code-container'>
                    <input className='code1' type='number' min="0" max="9"/>
                    <input className='code2' type='number' min="0" max="9"/>
                    <input className='code3' type='number' min="0" max="9"/>
                    <input className='code4' type='number' min="0" max="9"/>
                    <input className='code5' type='number' min="0" max="9"/>
                    <input className='code6' type='number' min="0" max="9"/>
                </form>
                <p className='re-send'>Didn't receive it ? 
                <button className='resend-button' type='submit'>Send Again</button>
                
                </p>


            </div>


        )}


        

        </div>
      );
    }

export default Register;