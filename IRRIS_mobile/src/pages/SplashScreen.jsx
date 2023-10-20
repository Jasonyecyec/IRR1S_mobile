import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import IRISLogo from '../assets/images/iris_logo.png'
import "../index.css"

const SplashScreen = () => {
  const navigate = useNavigate()
  const [dissolveOut, setDissolveOut] = useState(false);
  

  // this should pre-loading the resource, data, api not setTimeout 
  useEffect(() => {
    const timer = setTimeout(() => {
      // Start the dissolve-out effect
      setDissolveOut(true);
      
      // Navigate to login after the dissolve-out duration (1s in this case)
      setTimeout(() => {
        navigate('/login');
      }, 500);
    }, 2000);  // Reduced to 2 seconds + 1 second for the dissolve-out

    return () => clearTimeout(timer);
  }, [navigate]);


  return (
    <div className={`flex justify-center bg-thirdColor items-center w-screen h-screen ${dissolveOut ? 'dissolve-out' : ''}`}>
        <div className='text-center'>
          <img
          src={IRISLogo}
          />
          <h1 className='text-mainColor text-2xl font-semibold'>IRIS</h1>
        </div>
    </div>   
  )
}

export default SplashScreen    