import './home.css'
import "@fontsource/inter";
import Header from '../components/header.jsx'
import Side from '../components/side.jsx';


function Home() {
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
              <span class="mingcute--arrow-up-fill"></span>
            </div>
            <div className='main'> </div>
        </div>
      </div>
    </>
  )
}

export default Home
