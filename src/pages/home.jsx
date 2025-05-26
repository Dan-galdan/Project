import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';  
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'; 
import './home.css';
import "@fontsource/inter";
import '@fontsource/inter/700.css';
import Header from '../components/header.jsx';
import Side from '../components/side.jsx';
import { StarRating } from './StarRating.jsx';
import { useState } from 'react';

export function Post({ schoolname, postguy, date, postHeader, posttext, commentcount }) {
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [click, setClick] = useState(false);
  const [postRating, setPostRating] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const handleUpvote = () => {
    if (!clicked) {
      setCount(count + 1);
      setClicked(true);
      setClick(false);
    } else {
      setCount(count - 1);
      setClicked(false);
    }
  };

  const handleDownvote = () => {
    if (!click) {
      setCount(count - 1);
      setClick(true);
      setClicked(false);
    } else {
      setCount(count + 1);
      setClick(false);
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

function Home() {
  return (
    <>
      <Header />
      <Side />
      <div className='as'>
        <div className='headersquare'>
          <h3>Recent Post</h3>
          <div className='topSquares'>
            <div className='topblueSquare'>
              <span className='heroicons--squares-2x2-solid'></span>
            </div>
            <div className='topgreySquare'>
              <span className='pixel--bars-solid'></span>
            </div>
          </div>
        </div>

        <Post
          schoolname='31st School'
          postguy='Badmaa'
          date='2001/11/9'
          postHeader='Excellent School'
          posttext="The campus is beautiful and the lecture halls are well-equipped with modern technology. The professors are knowledgeable and always willing to help students outside of class hours. The library is extensive and offers great study spaces. I've had an amazing academic experience so far!The campus is beautiful and the lecture halls are well-equipped with modern technology. The professors are knowledgeable and always willing to help students outside of class hours. The library is extensive and offers great study spaces. I've had an amazing academic experience so far!The campus is beautiful and the lecture halls are well-equipped with modern technology. The professors are knowledgeable and always willing to help students outside of class hours. The library is extensive and offers great study spaces. I've had an amazing academic experience so far!The campus is beautiful and the lecture halls are well-equipped with modern technology. The professors are knowledgeable and always willing to help students outside of class hours. The library is extensive and offers great study spaces. I've had an amazing academic experience so far!"
          commentcount={2}
        />

        <Post
          schoolname='1st School'
          postguy='Bruce Wayne'
          date='2000/01/01'
          postHeader='Hmmmm'
          posttext="The school is fine but the bullying is a big problem here."
          commentcount={5}
        />
      </div>
    </>
  );
}

export default Home;
