import './header.css'
import logo from './logo.PNG'

function Header(){
    return(
        <>
            <div className='header'>
                <span class="uil--bars"></span>
                <div className='a'></div>
                <img src={logo} alt="" />
            </div>
        </>
    )
}
export default Header;