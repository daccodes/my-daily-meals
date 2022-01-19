import Logo from '../../Assets/meals.png'
import './Header.css'

const Header =()=>{
    return(
        <div className='header'>
            <p>
                <img src={Logo} alt='Logo'/>
                My Daily Meals:
            </p>
        </div>
    )
}
export default Header;
