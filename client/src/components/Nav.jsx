import { Link } from "react-router-dom";

const Nav = ({ currentUser, setCurrentUser }) => {

    const handleLogout = () => {
        fetch('/logout', { method: 'DELETE' })
        setCurrentUser({})
        window.location.reload();
    }

    return (
        <div className="nav">
            <Link className="link" to='favorites'>
                <h3 style={{ margin: '0' }}>Favorites</h3>
            </Link>

            <h3 className="logo">Drink<Link to='/'>
                <img className="logo" src="https://img.icons8.com/pastel-glyph/344/cocktail--v2.png" />
            </Link>Up!</h3>


            <h3>
                {currentUser ?
                    <div className="link" onClick={handleLogout}>Log Out</div> :
                    <><Link className="link" to='login'>
                        Log In
                    </Link> / <Link className="link" to='register'>
                            Sign Up
                        </Link></>}
            </h3>


        </div>
    )
}

export default Nav; 