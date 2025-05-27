import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';  
import { faShareAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import './post.css';
import '@fontsource/inter/700.css';
import { useState } from 'react';


 export function StarRating({ initialRating = 0, onRatingChange }) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleStarClick = (ratingValue) => {
    setRating(ratingValue);
    if (onRatingChange) {
      onRatingChange(ratingValue);
    }
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={ratingValue}
            className={`star ${ratingValue <= (hover || rating) ? 'active' : ''}`}
            onClick={() => handleStarClick(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            <FontAwesomeIcon icon={faStar} />
          </button>
        );
      })}
    </div>
  );
}


export function Post({ schoolname, postguy, date, postHeader, posttext, commentcount }) {
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [click, setClick] = useState(false);
  const [postRating, setPostRating] = useState(0);
  const [showMore, setShowMore] = useState(false);

const handleUpvote = () => {
  if (clicked) {
    // Undo upvote
    setCount(count - 1);
    setClicked(false);
  } else if (click) {
    // Switch from downvote to upvote
    setCount(count + 2);
    setClicked(true);
    setClick(false);
  } else {
    // Normal upvote
    setCount(count + 1);
    setClicked(true);
  }
};

const handleDownvote = () => {
  if (click) {
    setCount(count + 1);
    setClick(false);
  } else if (clicked) {
    setCount(count - 2);
    setClick(true);
    setClicked(false);
  } else {
    setCount(count - 1);
    setClick(true);
  }
};


  const arrowStyle = {
    filter: clicked
      ? 'invert(43%) sepia(27%) saturate(2929%) hue-rotate(194deg) brightness(99%) contrast(96%)'
      : 'none',
  };

  const downarrowStyle = {
    filter: click
      ? 'invert(43%) sepia(27%) saturate(2929%) hue-rotate(194deg) brightness(99%) contrast(96%)'
      : 'none',
  };

  const MAX_LENGTH = 300;
  const isLong = posttext.length > MAX_LENGTH;
  const displayText = showMore ? posttext : posttext.slice(0, MAX_LENGTH);

  return (
    <div className='general'>
      <div className='opinion'>
        <div className='rating'>
          <span className="mingcute--arrow-up-fill" onClick={handleUpvote} style={arrowStyle}></span>
          <p className='number'>{count}</p>
          <span id='downarrow' className="mingcute--arrow-up-fill" onClick={handleDownvote} style={downarrowStyle}></span>
        </div>
      </div>
      <div className='main'>
        <div className='postguy'>
          <p>{schoolname}</p>
          <p>Posted by {postguy} * {date}</p>
        </div>
        <h4 className='Postheader'>{postHeader}</h4>
        <StarRating initialRating={postRating} onRatingChange={setPostRating} />
        
        <p className="posttext">
          {displayText}
          {isLong && !showMore && <span>...</span>}
        </p>
        
        {isLong && (
          <button className='readmore' onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Read Less' : 'Read More'}
          </button>
        )}

        <hr className='lineunderreadmore' />
        <div className='underpost'>
          <div className='commentpart'>
            <FontAwesomeIcon className='commenticon' icon={faCommentAlt} /> 
            <p>{commentcount} comment</p>
          </div>
          <div className='commentpart'>
            <FontAwesomeIcon className='commenticon' icon={faShareAlt} /> 
            <p>Share</p>
          </div>
        </div>
      </div>
    </div>
  );
}
