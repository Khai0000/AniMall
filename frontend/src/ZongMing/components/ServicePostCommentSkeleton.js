import React from 'react'

const ServicePostCommentSkeleton = () => {
    return (
        <div className="commentDetailsContainerSPC">
          <div className="imageContainerSPC">
            <img className='skeleton' alt=''/>
          </div>
    
          <div className="authorContainerSPC skeletonText">
            <p className="authorSPC skeleton skeletonText"></p>
            <p className="contentSPC skeleton skeletonText"></p>
          </div>
        </div>
      );  
}

export default ServicePostCommentSkeleton