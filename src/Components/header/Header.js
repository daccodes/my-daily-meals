import './Header.css'

const Header =()=>{
    return(
        <div className='header'>
            <p>
                <img src={process.env.PUBLIC_URL + "/meals.png"} alt='Logo'/>
                My Daily Meals:
            </p>
        </div>
    )
}
export default Header;
