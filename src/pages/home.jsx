import './home.css'
import "@fontsource/inter";
import Header from '../components/header.jsx'
import Side from '../components/side.jsx';


function Home() {
  return (
    <>
      <Header/>
      <Side/>
      <div className='top-word'>
        <h2>Recent Post</h2>
        <div className='squaresundbar'>
          <div className='squares'></div>
          <span class="heroicons--squares-2x2-solid"></span>
          <div></div>
          <span class="pixel--bars-solid"></span>
        </div>
      </div>
    </>
  )
}

export default Home
