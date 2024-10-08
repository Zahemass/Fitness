import React, { useState } from 'react';
import DashboardNav from '../components/DashBoardNav';
import SettingNav from '../components/SettingNav';
import exercisePlans from "../components/ExeriscsList";
import "../components/Styles/Plans.css";
import Goalset from '../components/Goalset';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function Plans() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('beginner');


  const handleDayClick = (day) => {
    setSelectedDay(selectedDay === day ? null : day); // Toggle dropdown
  };

  const getExerciseDetails = () => {
    if (selectedDay) {
      const dayExercises = exercisePlans.find(plan => plan[selectedLevel])[selectedLevel][selectedDay];
      return Array.isArray(dayExercises) ? dayExercises : [dayExercises];
    }
    return [];
  };

  return (
    <div className="dashboard-container">
      <DashboardNav Dcolor={"orange"} />
      <div className="Report-container">
        <Goalset />
        <p className='MyPlan-text'>My Plans</p>
        <nav className='Day-List'>
          {Object.keys(exercisePlans[0][selectedLevel]).map(day => (
            <li 
              key={day} 
              className={`Day-Item ${selectedDay === day ? 'active' : ''}`} 
              style={{ backgroundColor: selectedDay === day ? "orange" : "white" }}
              onClick={() => handleDayClick(day)}
            >
              {day}
              {selectedDay === day && (
                <div className='Exercise-Details' style={{ height: selectedDay === null ? 0 : 500}}>
                  <span className='Close-Icon' onClick={() => setSelectedDay(null)}>
                    {/* <FontAwesomeIcon icon={faX} /> */}
                  </span>
                  <ul>
                    {getExerciseDetails().map((exercise, index) => (
                      <li key={index} className='List-Exercise'>{exercise}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </nav>
      </div>
      <SettingNav />
    </div>
  );
}

export default Plans;
