import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="mainav">
        <h1>LINKBIO</h1>
        <div className="links">
            <Link to='/signup'>signup</Link>
            <Link to='/login'>login</Link>
        </div>
    </nav>
  )
}

export default Navbar