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
import { Withdraw } from "./pages/Withdraw";
import MemberDashboard from "./pages/MemberDashboard";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" exact element={<AdminDashboard />}></Route>
            <Route
              path="/admin/:bankAccountId"
              exact
              element={
                <ProtectedRoutes role="admin" exact element={ControlPanel} />
              }
            ></Route>
            <Route
              path="/admin/:bankAccountId/deposit"
              exact
              element={<ProtectedRoutes role="admin" exact element={Deposit} />}
            ></Route>
            <Route
              path="/admin/:bankAccountId/withdraw"
              exact
              element={
                <ProtectedRoutes role="admin" exact element={Withdraw} />
              }
            ></Route>

            <Route path="/member" exact element={<MemberDashboard />}></Route>
            <Route
              path="/member/:bankAccountId"
              exact
              element={
                <ProtectedRoutes role="member" exact element={ControlPanel} />
              }
            ></Route>
            <Route
              path="/member/:bankAccountId/deposit"
              exact
              element={
                <ProtectedRoutes role="member" exact element={Deposit} />
              }
            ></Route>
            <Route
              path="/member/:bankAccountId/withdraw"
              exact
              element={
                <ProtectedRoutes role="member" exact element={Withdraw} />
              }
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
