import React from 'react'
import '../styles/ForumHomeCard.css'
import dog1 from '../assets/images/dog1.jpg'

const ForumHomeCard = () => {
  return (
    <div className='cardContainer'>
        <div className='imageContainer'>
            <img src={dog1} alt="cover"/>
        </div>

        <div className='cardDetails'>
            <p className='title'>My Experience in taking care of dog</p>
            <p className='author'>By: <span className='authorDetails'>Khai</span></p>
            <p className='content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus molestie nunc non blandit. Sagittis vitae et leo duis ut diam. Eget est lorem ipsum dolor sit. Pretium nibh ipsum consequat nisl vel. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Sit amet massa vitae tortor condimentum lacinia quis. Bibendum est ultricies integer quis auctor elit sed vulputate. Ut etiam sit amet nisl purus in mollis nunc sed. Ut etiam sit amet nisl purus in. Et netus et malesuada fames ac turpis egestas sed tempus. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui. Nulla facilisi morbi tempus iaculis urna id. Gravida in fermentum et sollicitudin ac orci.</p>
        </div>

    </div>
  )
}

export default ForumHomeCard