import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Dashboard } from "./pages/Dashboard"
import { User } from "./pages/User"

function App() {
  return (
    <Router>
      <div className="font-main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
