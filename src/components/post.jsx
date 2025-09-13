import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faShareAlt, faStar, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './post.css';
import '@fontsource/inter/700.css';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// StarRating component remains untouched as per your request
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
    <div className="star-rating" role="radiogroup" aria-label="Star rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={ratingValue}
            type="button"
            className={`star ${ratingValue <= (hover || rating) ? 'active' : ''}`}
            onClick={() => handleStarClick(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            aria-label={`Rate ${ratingValue} star${ratingValue > 1 ? 's' : ''}`}
            aria-checked={rating === ratingValue}
            role="radio"
          >
            <FontAwesomeIcon icon={faStar} />
          </button>
        );
      })}
    </div>
  );
}

// Fixed Comment component with return statement and date prop
const Comment = ({ comment, date }) => {
  return (
    <div className="commentexample">
      <div className="commentTop">
        <p id="Name">Mai Willy</p>
        <p id="date">{date}</p>
      </div>
      <div className="comments">
        <p>{comment || "No comment text"}</p>
      </div>
    </div>
  );
};

export function Post({ schoolname, postguy, date, postHeader, posttext, commentcount }) {
  const [voteStatus, setVoteStatus] = useState(null);
  const [count, setCount] = useState(0);
  const [postRating, setPostRating] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [youWrote, setYouWrote] = useState("");
  const [comments, setComments] = useState([]); // Store comments as an array

  const handleChange = (event) => {
    setYouWrote(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && youWrote.trim()) {
      setComments([...comments, { text: youWrote, date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' }) }]);
      setYouWrote(""); // Clear input after posting
    }
  };

  const DivCountGObbr = () => {
    if (youWrote.trim()) {
      setComments([...comments, { text: youWrote, date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' }) }]);
      setYouWrote(""); // Clear input after posting
    }
  };

  const handleUpvote = () => {
    if (voteStatus === 'up') {
      setVoteStatus(null);
      setCount(count - 1);
    } else if (voteStatus === 'down') {
      setVoteStatus('up');
      setCount(count + 2);
    } else {
      setVoteStatus('up');
      setCount(count + 1);
    }
  };

  const handleDownvote = () => {
    if (voteStatus === 'down') {
      setVoteStatus(null);
      setCount(count + 1);
    } else if (voteStatus === 'up') {
      setVoteStatus('down');
      setCount(count - 2);
    } else {
      setVoteStatus('down');
      setCount(count - 1);
    }
  };

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleToggleComments = () => {
    setShowComment(!showComment);
  };

  const MAX_LENGTH = 300;
  const isLong = posttext.length > MAX_LENGTH;

  return (
    <div
      className="general"
      role="article"
      aria-label="Post"
    >
      <div className="opinion" aria-label="Voting controls">
        <div className="rating">
          <button
            className={`mingcute--arrow-up-fill ${voteStatus === 'up' ? 'active' : ''}`}
            onClick={handleUpvote}
            aria-pressed={voteStatus === 'up'}
            aria-label="Upvote"
          ></button>
          <p className="number" aria-live="polite" aria-atomic="true">{count}</p>
          <button
            className={`mingcute--arrow-up-fill ${voteStatus === 'down' ? 'active' : ''}`}
            id="downarrow"
            onClick={handleDownvote}
            aria-pressed={voteStatus === 'down'}
            aria-label="Downvote"
          ></button>
        </div>
      </div>

      <div className="main">
        <div className="postguy">
          <p>{schoolname}</p>
          <p>Posted by {postguy} &#8226; {date}</p>
        </div>

        <h4 className="Postheader">{postHeader}</h4>
        <StarRating initialRating={postRating} onRatingChange={setPostRating} />

        <p className={`posttext ${showMore ? 'expanded' : ''}`}>
          {isLong && !showMore ? `${posttext.slice(0, MAX_LENGTH)}...` : posttext}
        </p>

        {isLong && (
          <button
            className="readmore"
            onClick={handleToggleShowMore}
            aria-expanded={showMore}
            aria-label={showMore ? 'Show less content' : 'Show more content'}
          >
            {showMore ? 'Read Less' : 'Read More'}
          </button>
        )}

        <hr className="lineunderreadmore" />

        <div className="underpost">
          <div
            className="commentpart"
            role="button"
            tabIndex={0}
            onClick={handleToggleComments}
            aria-label={`${comments.length || commentcount} comments`}
          >
            <FontAwesomeIcon className="commenticon" icon={faCommentAlt} />
            <p>{comments.length || commentcount} comment{(comments.length || commentcount) !== 1 ? 's' : ''}</p>
          </div>
          <div className="commentpart" role="button" tabIndex={0} aria-label="Share post">
            <FontAwesomeIcon className="commenticon" icon={faShareAlt} />
            <p>Share</p>
          </div>
        </div>

        <AnimatePresence>
          {showComment && (
            <motion.div
              className="allcomment"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >

              {comments.map((comment, index) => (
                <Comment key={index} comment={comment.text} date={comment.date} />
              ))}
              <div className="commentPost">
                <input
                  type="text"
                  value={youWrote}
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  placeholder="Add a comment..."
                />
                <button onClick={DivCountGObbr}>Post</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}