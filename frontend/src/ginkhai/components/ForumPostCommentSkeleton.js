import React from 'react'

const ForumPostCommentSkeleton = () => {
    return (
        <div className="commentDetailsContainer">
          <div className="imageContainer">
            <img className='skeleton' alt=''/>
          </div>
    
          <div className="authorContainer skeletonText">
            <p className="author skeleton skeletonText"></p>
            <p className="content skeleton skeletonText"></p>
          </div>
        </div>
      );  
}

export default ForumPostCommentSkeleton