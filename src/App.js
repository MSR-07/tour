import React,{useState,useEffect} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from './components/Loading';
import Tours from './components/Tours';
const url = 'https://course-api.com/react-tours-project'

function App() {
  const [loading,setLoading] =useState(true)
  const [tours, setTours] = useState([])
  const removeTour =(id)=>{
    const newTours = tours.filter((tour)=>tour.id !== id)
    setTours(newTours)
  }

  const fetchTour = async() =>{
    setLoading(true)
    try {
      const response = await fetch(url,{ timeout: 5000 });
      const tours =await response.json()
      setLoading(false)
      setTours(tours)
      console.log(tours);
      
    } catch (error) {
      setLoading(false)
      console.log("Error Occur");
      
    }
  }

  useEffect(()=>{
    fetchTour()
  },[])
  if(loading){
    return(
      <>
        <Loading/>
      </>
    )
  }if(tours.length===0){
    return(
      <>
        <main>
          <div className='title'>
            <h2>no tours left</h2>
            <button className='btn' onClick={fetchTour}>refresh</button>
          </div>
        </main>
      </>
    )
  }
  return (
   <>
    <main>
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
   </>
  );
}

export default App;
