import './home.css'
import "@fontsource/inter";
import Header from '../components/header.jsx'
import Side from '../components/side.jsx';
import '@fontsource/inter/700.css';
import { useState } from 'react';

function Home() {
const [clicked, setClicked] = useState(false);
const [click, setclick] = useState(false)
const [count, setcount] = useState(0)

const handleUpvote = () => {
    if (!clicked) {
        setcount(count + 1);
        setClicked(true);
        setclick(false);
        setclickedtimes(clickedtimes+1)
    } else {
        setClicked(false);
        setcount(count-1)
    }

};

const handleDownvote = () => {
    if (!click) {
        setcount(count - 1);
        setclick(true);
        setClicked(false);
    } else {
      setcount(count+1)
        setclick(false);
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
  }


  return (
    <>
      <Header/>
      <Side/>
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
        <div className='general'>
            <div className='opinion'>
              <div className='rating'>
                <span class="mingcute--arrow-up-fill" onClick={handleUpvote} style={arrowStyle}></span>
                <p className='number'>{count}</p>
                <span id='downarrow' class="mingcute--arrow-up-fill" onClick={handleDownvote} style={downarrowStyle}></span>
              </div>

            </div>
            <div className='main'>
              <div className='postguy'>
                <p>31st School</p>
                <p>Posted by Badmaa * 11/9/2001/</p>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Home
