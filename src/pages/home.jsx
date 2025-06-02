import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import '../index.css'
import "@fontsource/inter";
import '@fontsource/inter/700.css';
import Header from '../components/header.jsx';
import Side from '../components/side.jsx';
import { Post } from '../components/post.jsx'


function Home() {
  return (
    <>
      <Header />
      <Side />
      <div className='as'>
        <div className='headersquare'>
          <h3>Recent Post</h3>
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
