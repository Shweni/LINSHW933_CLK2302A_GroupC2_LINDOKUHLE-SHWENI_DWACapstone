import React, { useEffect,useState } from "react"
import { useParams } from "react-router-dom";
//import ReactAudioPlayer from 'react-audio-player';
    export default function Show() {

        const [podcast , setPodcast] = useState({});
        //const [genres,setGenres] = useState({}) ;
        const [isPlaying, setIsPlaying] = useState(false)
        const params = useParams()

       const audioUrl = 'https://podcast-api.netlify.app/placeholder-audio.mp3'
       

       const playPauseHandler = () => {
        const audio = document.getElementById('audio');
    
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
    
        setIsPlaying(!isPlaying);
      };



        useEffect(()=>{

        console.log('params =',params)

        // Fetching a specific podcast by ID
        fetch(`https://podcast-api.netlify.app/id/${params.id}`,
        {method: "GET", })
        .then(response => response.json())
        .then(data => {
          // Handle the data (a single SHOW object with SEASON and EPISODE objects) here
          console.log(data);
          setPodcast(data); // Update the state with a single-element array
             })
        .catch(error => {
          // Handle errors here
        console.error(`Error fetching podcast with ID ${params.id}:`, error);
        })
    },[params])


/*useEffect(()=>{
        console.log('params =',params)
    fetch(`https://podcast-api.netlify.app/genre/${params.id}`,
    {method: "GET", })
    .then(response => response.json())
    .then(data => {
           // Handle the data (an array of PREVIEW objects) here
      console.log(data);
      setGenres(data);
    })
      .catch(error => {
      // Handle errors here
      console.error(`Error fetching Genres with ID ${params.id}:`, error);
       
     })
},[params])*/
        
         return (
            <> 
                {podcast.seasons && (
                    <ul>
                        {podcast.seasons.map(season => (
                        <li key={season.id}>
                        <img src={season.image} alt={podcast.title} className="show--image" />
                            <br/>
                          <p className="season--title"> Title:{season.title}</p> 
                          <p>{season.description}</p>

                            {podcast.genres &&(
                                <ul>
                                    {podcast.genres.map(genre =>(
                                        <li key={genre.id}>
                                        <p>Genres: {podcast.genres}</p>
                                        </li>
                                    ))}
                                </ul>
                              )  
                            }
                            
                             <p>Updated: {podcast.updated}</p>
                            <br/>
                      <p className="season--number"> Season:{season.season}</p>

                    
                      {season.episodes && (
                        <ul>
                          {season.episodes.map(episode => (

                        <li key={episode.id}>
                            
                              <p className="episode--title">Title: {episode.title}</p>
                              <p className="episode">Episode: {episode.episode}</p>
                              <p className="episode--description">Description: {episode.description}</p>
                                <div>
                                <audio id="audio" src={audioUrl} />
                                <button onClick={playPauseHandler}>
                                    {isPlaying ? 'Pause' : 'Play'}
                                </button>
                                </div>
                        </li>
                          ))}
                        </ul>
                        )}

                    </li>
                  ))}
                </ul>
              )}

        </>
           
    )
}
                
                        
                  