


import React from 'react'
import Navbar from './Components/Header/Navbar/Navbare.jsx'
import { Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';


// import Home from "./Components/Pages/Home/Home"
import AssessmentTypes from './Components/Pages/AssessmentTypes/AssessmentTypes'
import Footer from './Components/Header/Footer/Footer'
import QuestionStyles from './Components/Pages/QuestionStyles/QuestionStyles.jsx'
import Skills from './Components/Pages/Skills/Skills.jsx'
import Cognitive from './Components/Pages/Cognitive/Cognitive.jsx' // ✅ Import added
import Behavioral from './Components/Pages/Behavioral/Behavioral.jsx'
import PopularAssessments from './Components/Pages/PopularAssessments/PopularAssessments.jsx'
import Simulation from './Components/Pages/Simulation/Simulation.jsx'
import Video from './Components/Pages/Video/Video.jsx'
import Customization from './Components/Pages/Customization/Customization.jsx'
import Dedicatedassessment from './Components/Pages/Dedicatedassessment/Dedicatedassessment.jsx'
import Home from './Components/Pages/Home/Home.jsx'
import AssessmentLibrary from './Components/Pages/AssessmentLibrary/AssessmentLibrary.jsx'
// import Dedicatedassessment from './Components/PaDedicatedassessment.jsx

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/AssessmentTypes' element={<AssessmentTypes/>}/>
        <Route path='/QuestionStyles' element={<QuestionStyles />}/>
        <Route path='/Skills' element={<Skills />} />
        <Route path='/Cognitive' element={<Cognitive />} /> {/* ✅ Fixed */}
        <Route path='/Behavioral' element={ <Behavioral />} />
        <Route path='/PopularAssessments' element={ <PopularAssessments />} />
        <Route path="/Simulation" element={ <Simulation />} />
        <Route path='/Video' element={<Video/>} />
        <Route path='/Customization' element={<Customization />} />
        <Route path='/Dedicatedassessment' element={<Dedicatedassessment />} />
        <Route path='/AssessmentLibrary' element={<AssessmentLibrary />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
