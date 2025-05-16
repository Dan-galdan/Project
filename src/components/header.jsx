import './header.css'
import logo from './logo.PNG'
import "@fontsource/inter/700.css";
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'


function Header(){
    return(
        <>
            <div className='header'>
                <span class="uil--bars"></span>
                <div className='a'></div>
                <img src={logo} alt="" />
                <h2 className='inter-imga'>TellU</h2>
                <div className='sea'>
                    <input type="search" placeholder="Search" className="Searcht" />
                    <span class="material-symbols--search-rounded"></span>
                </div>

                <div className='chi'>
                    <div className='teneg'>
                        <span class="material-symbols--person-rounded"></span>
                        <p>Account</p>
                    </div>
                    <div className='teneg1'>
                        <span class="line-md--plus"></span>
                        <p>Create Post</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;