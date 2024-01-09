import {Outlet} from 'react-router-dom'
import Footer from './Footer'

const AuthLayout = () => {
  return (
    <div className="mainLayout">
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default AuthLayout