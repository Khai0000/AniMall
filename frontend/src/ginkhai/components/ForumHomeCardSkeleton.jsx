import React from 'react'

const ForumHomeCardSkeleton = () => {
  return (
    <div className="cardContainer">
      <div className="imageContainer ">
        <img className='skeleton' alt=''/>
      </div>

      <div className="cardDetails">
        <p className="title skeleton skeletonText"></p>
        <p className="author skeleton skeletonText">
          <span className="authorDetails"></span>
        </p>
        <p className="content skeleton skeletonText"></p>
        <p className="content skeleton skeletonText"></p>
      </div>
    </div>
  )
}

export default ForumHomeCardSkeleton