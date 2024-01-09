import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className="home">
      <div className="banner">
        <h1>LINKBIO</h1>
        <p>all your links in 1 place</p>
        <Link to='/signup'>get started</Link>
      </div>
      <main className='main1'>
        <h1>GET YOUR LINK PROFILE LIVE IN MINUTES</h1>
        <p>GREAT TEMPLATES TO CHOOSE FROM</p>
        <p>Join millions and show of your links online</p>
      </main>
      <main className='main2'>
        <h1>DEMOS</h1>
        <p>See what your bio can look like</p>
        <Link to='/projects'>view demos</Link>
      </main>
    </div>
  )
}

export default Home