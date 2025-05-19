import { Routes, Route } from 'react-router-dom';
import SplashScreen from './SplashScreen';
import PatientDashboard from './components/patient/PatientDashboard'; // Create this if it doesn't exist

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/dashboard" element={<PatientDashboard />} />
    </Routes>
  );
}

export default App;
