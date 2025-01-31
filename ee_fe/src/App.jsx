import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Banner from "./components/Banner.jsx"
import ElectricityData from "./components/electricity/electricity"
import MeteringPoints from "./components/meteringPoints/meteringPoints.jsx"
import MeteringConsumption from "./components/meteringPoints/meteringConsumption/meteringConsumption.jsx"
import HomePage from "./components/marketGraph/MarketGraph.jsx"
import Login from "./components/Login/Login.jsx";

// const PrivateRoute = ({ element }) => {
//   const token = localStorage.getItem("token");
//   return token ? element : <Navigate to="/login" />;
// };

function App() {
  return (

    <Router>
        <Banner>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/electricity" element={<ElectricityData />} />
            <Route path="/metering" element={<MeteringPoints />} />
            <Route path="/metering/:meteringPointId/consumption" element={<MeteringConsumption />} />

{/*              <Route path="/graph" element={<PrivateRoute element={<GraphView />} />} /> */}
{/*         <Route path="*" element={<NotFound />} />  Catch-all route for 404 */}
        </Routes>
      </Banner>
    </Router>
  );
}

export default App
