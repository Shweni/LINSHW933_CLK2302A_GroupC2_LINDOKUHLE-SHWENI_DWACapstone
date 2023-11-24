import React from "react"
import Navbar from "./Components/Navbar"
import Main from "./Components/Main"
import { BrowserRouter ,Routes, Route} from 'react-router-dom'
import Show from "./pages/show"
    export default function App() {
        
         return (
        <>
        <BrowserRouter>
        <Navbar />
        <Routes >
        <Route path="/" element={<Main/>}/>
        <Route path="/show/:id" element={<Show/>}/>

        

        </Routes>
        
        
        </BrowserRouter>
        
        </>
           
    )
}
