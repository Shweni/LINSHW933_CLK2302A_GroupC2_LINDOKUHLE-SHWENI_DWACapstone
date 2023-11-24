import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Main() {
  const [podcasts, setPodcasts] = useState([]);
  const [podcast , setPodcast] = useState([{}]);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
  const[genres , setGenres] = useState([{}])
  

  
 
      useEffect(() => {
              // Fetching the list of shows
      fetch('https://podcast-api.netlify.app/shows',
      {method: "GET", })
      .then(response => response.json())
      .then(data => {
             // Handle the data (an array of PREVIEW objects) here
        console.log(data);
        setPodcasts(data);
      })
        .catch(error => {
        // Handle errors here
        console.error('Error fetching shows:', error);
      });
          }, []); // Empty dependency array to ensure the effect runs only once 


// Sorting podcasts based on the selected sort order
    const sortedPodcasts = [...podcasts].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    return order * a.title.localeCompare(b.title);
  });

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };


  const handleClick = (id) => { 
    
    //setLoading(true);
   // setOpenModal(true);
      // Fetching a specific podcast by ID
       fetch(`https://podcast-api.netlify.app/id/${id}`,
      {method: "GET", })
        .then(response => response.json())
        .then(data => {
          // Handle the data (a single SHOW object with SEASON and EPISODE objects) here
         // console.log(data);
          setPodcast(data); // Update the state with a single-element array
        })
        .catch(error => {
          // Handle errors here
          console.error(`Error fetching podcast with ID ${id}:`, error);
        })

        // Fetching a specific podcast by ID
        fetch(`https://podcast-api.netlify.app/genre/${id}`,
    {method: "GET", })
    .then(response => response.json())
    .then(data => {
           // Handle the data (an array of PREVIEW objects) here
      console.log(data);
      setGenres(data);
    })
      .catch(error => {
      // Handle errors here
      console.error(`Error fetching Genres with ID ${id}:`, error);
       
     })

       
  }
  return (
    <div>
      <button onClick={handleSortToggle} className='button--sort'>
        Sort by: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
      </button>
      
      


      <ul>
        {sortedPodcasts.map(podcast => (
          <li key={podcast.id}>
            <div className='podcast--shows'onClick={() => handleClick(podcast.id)}  >

              <img src={podcast.image} alt={podcast.title} className="header--image" />
              <Link to= {`/show/${podcast.id}`}>
              <h2 className='podcast--title'>{podcast.title}</h2>
              </Link>
              <p className='podcast--description'>{podcast.description}</p>
              <p>Seasons: {podcast.seasons}</p>
              <p>Updated:{podcast.updated}</p>
              <p>Genres:{podcast.genres}</p>
              
            </div>
          </li>
        ))}
      </ul>
    
    </div>
  );
  }


 

    





/*import React, { useState, useEffect } from 'react';

export default function Main() {

const [podcasts, setPodcasts] = useState([]);
const [podcast , setPodcast] = useState({});
const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
const [modal, setModal] = useState(false)


      useEffect(() => {

    fetch('https://podcast-api.netlify.app/shows',
    {method: "GET", })

      .then(response => response.json())

      .then(data => {
        // Handle the data (an array of PREVIEW objects) here
        console.log(data);
        setPodcasts(data);
      })

      .catch(error => {
        // Handle errors here
        console.error('Error fetching shows:', error);
      });

  }, []); // Empty dependency array to ensure the effect runs only once 

// Sorting podcasts based on the selected sort order
  const sortedPodcasts = [...podcasts].sort((a, b) => {
  const order = sortOrder === 'asc' ? 1 : -1;
    return order * a.title.localeCompare(b.title);
  });

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };


  const handleClick = (id) => { 
  
    //Fetching a specific podcast by ID
    fetch(`https://podcast-api.netlify.app/id/${id}`,
    {method: "GET", })
      .then(response => response.json())
      .then(data => {
        // Handle the data (a single SHOW object with SEASON and EPISODE objects) here
        console.log(data);
        setPodcast(data); // Update the state with a single-element array
      })
      .catch(error => {
        // Handle errors here
        console.error(`Error fetching podcast with ID ${id}:`, error);
      });
   
}

const toggleModal =() =>{
setModal(!modal)
}


  
  return (
 <div>

      <button onClick={handleSortToggle}>
        Sort by: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
      </button>

      <dialog open>This is an open dialog window</dialog>
  <ul>
        {sortedPodcasts.map(podcast => (
    <li key={podcast.id}>

<button onClick={toggleModal}className='open--modal'>
                   Open   
      </button>  
      

{modal &&(
 <div className='podcast--shows'onClick={() => handleClick(podcast.id)}  >

      

 <div onClick={toggleModal} className='overlay--modal'></div>

<div className='modal-content'>
 <img src={podcast.image} alt={podcast.title} className="title--image" />
 <h2 className='podcast--title'>{podcast.title}</h2>
 <p className='podcast--description'>{podcast.description}</p>
 <p>{podcast.genres}</p>
 <p>{podcast.updates}</p>
</div>

<button className='close--modal' onClick={toggleModal}>Close</button>   
</div>
)}

 
   </li>
        ))}

  </ul>

  </div>
  )
}*/


//https://podcast-api.netlify.app/placeholder-audio.mp3