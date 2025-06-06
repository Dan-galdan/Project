import './side.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/300.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Side() {
    const navigate = useNavigate();
    const location = useLocation(); // Get current route

    return (
        <div className='seisse'>
            <div className='home'>
                <div id='crazy'>
                    <h3 className='aasd'>Home</h3>
                </div>

                <button
                    className={`hoe ${location.pathname === '/' ? 'selected' : ''}`}
                    onClick={() => navigate('/')}
                >
                    <span className="fa-solid--home"></span>
                    <p>All Schools</p>
                </button>
                <button
                    className={`hoe ${location.pathname === '/popular' ? 'selected' : ''}`}
                    onClick={() => navigate('/popular')}
                >
                    <span className="tabler--flame-filled"></span>
                    <p>Popular</p>
                </button>
                <button
                    className={`hoe ${location.pathname === '/top_rated' ? 'selected' : ''}`}
                    onClick={() => navigate('/top_rated')}
                >
                    <span className="solar--medal-ribbon-bold"></span>
                    <p>Top Rated</p>
                </button>
            </div>
            <div className='filter'>
                <h3 className='aasd'>Filter</h3>
                <span className="weui--arrow-filled"></span>
                <select className='aaas' name="All schools" id="">
                    <option>All Schools</option>
                    <option>Public</option>
                    <option>Private</option>
                </select>
            </div>
            <div className='bt'>
                <h3 className='aasd'>About</h3>
                <span id='ba' className='weui--arrow-filled'></span>
                <p>Share school experiences anonymously or with your name.</p>
                <div className='po'>
                    <div className='ao'>
                        <span className="fa--group"></span>
                        <p>0</p>
                    </div>
                    <div className='ao'>
                        <span className="si--chat-fill"></span>
                        <p>0</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Side;