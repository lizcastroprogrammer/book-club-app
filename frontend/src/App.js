import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import ControlPanel from "./pages/ControlPanel";
import Deposit from "./pages/Deposit";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/admin"
              exact
              element={<ProtectedRoutes exact element={AdminDashboard} />}
            ></Route>
            <Route
              path="/admin/:bankAccountId"
              exact
              element={<ProtectedRoutes exact element={ControlPanel} />}
            ></Route>
            <Route
              path="/admin/:bankAccountId/Deposit"
              exact
              element={<ProtectedRoutes exact element={Deposit} />}
            ></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
