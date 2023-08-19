import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Dashboard } from "./pages/Dashboard"
import { User } from "./pages/User"
import { StickyFooterNavbar } from "./components/StickyFooterNavbar"
import { CreateUser } from "./components/User/CreateUser"

import { Abled } from "./components/User/status/Abled"

function App() {
  return (
    <Router>
      <div className="font-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/*"
            element={
              <div>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/user" element={<User />} />
                  <Route path="/create-user" element={<CreateUser />} />
                  <Route
                    path="/display-user/*"
                    element={
                      <Routes>
                        <Route path="/able" element={<Abled />} />
                      </Routes>
                    }
                  />
                </Routes>
                <StickyFooterNavbar />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App