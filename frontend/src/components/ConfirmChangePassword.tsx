import {FC} from 'react'
import '../styles/confirmchangepassword.css'
import { useChangePassword } from '../hooks/useChangePassword';
import {IoArrowBackCircleOutline} from 'react-icons/io5'

interface AppProps {
  toggleChangePassword: (params: any) => any;
}

const ConfirmChangePassword: FC<AppProps> = ({toggleChangePassword}) => {


  const {changePassword} = useChangePassword()

  return (
    <div className="confirmchangepassword">
        <h1>change password</h1>
        <input type="text" placeholder='current password'/>
        <input type="text" placeholder='new'/>
        <input type="text" placeholder='confirm new'/>
        <IoArrowBackCircleOutline className='cancel' onClick={toggleChangePassword}/>
        <button onClick={ (e) => changePassword(`messi`, `messi2`)}>change password</button>
    </div>
  )
}

export default ConfirmChangePassword