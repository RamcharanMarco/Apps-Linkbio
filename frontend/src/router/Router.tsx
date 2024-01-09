import { BrowserRouter,Routes,Route } from "react-router-dom"

import MainLayout from "../components/MainLayout"
import HomePage from "../pages/Home"
import LoginPage from "../pages/Login"
import SignupPage from "../pages/Signup"
import UserLayout from "../components/UserLayout"
import UserHomePage from "../pages/UserHome"
import LinkBioEdit from "../pages/LinkBioEdit"
import UserSettingsPage from "../pages/UserSettings"
import AuthLayout from "../components/AuthLayout"

import FakeBio from '../pages/FakeBio'
import LinkBioLayout from "../components/LinkBioLayout"
import LinkBioHome from "../pages/LinkBioHome"
import BioSettings from "../pages/BioSettings"
import BioAnalytics from "../pages/BioAnalytics"

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route index element={<HomePage/>}></Route>
            </Route>
            <Route path='/' element={<AuthLayout/>}>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='signup' element={<SignupPage/>}/>
            </Route>
            <Route path='/user/:id/' element={<UserLayout/>}>
                <Route index element={<UserHomePage/>}></Route>
                <Route path='settings' element={<UserSettingsPage/>}/>
            </Route>
            <Route path='/user/:id/bio/' element={<LinkBioLayout/>}>
                <Route index element={<LinkBioHome/>}></Route>
                <Route path='edit' element={<LinkBioEdit/>}/>
                <Route path='settings' element={<BioSettings/>}/>
                <Route path='analytics' element={<BioAnalytics/>}/>

            </Route>
            <Route path='/bio' element={<FakeBio/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router