import './side.css'
import "@fontsource/inter/700.css";
import '@fontsource/inter/500.css';

function Side(){
    return(
        <>
            <div className='seisse'>
                <div className='home'>
                    <div id='crazy'>
                        <h3>Home</h3>
                    </div>
                    <div className='hoe' id='ho'>
                        <span class="fa-solid--home"></span>
                        <p>All Schools</p>
                    </div>
                    <div className='hoe' id='hoo'>
                        <span class="tabler--flame-filled"></span>
                        <p>Popular</p>
                    </div>
                    <div className='hoe' id='hooo'>
                        <span class="solar--medal-ribbon-bold"></span>
                        <p>Top Rated</p>
                    </div>
                </div>
                <div className='filter'>
                    <h3>Filter</h3>
                    <span  class="weui--arrow-filled"></span>
                    <li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </li>
                </div>
            </div>


        </>
    )
}
export default Side