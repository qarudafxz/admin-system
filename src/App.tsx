import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Dashboard } from "./pages/Dashboard"
import { User } from "./pages/User"
import { StickyFooterNavbar } from "./components/StickyFooterNavbar"
import { CreateUser } from "./components/User/CreateUser"

import { Admins } from "./components/User/variations/Admins"
import { Agents } from "./components/User/variations/Agents"
import { UserNav } from "./components/UserNav"

import { Summary } from "./pages/Summary"
import { StallSheet } from "./components/Summary/StallSheet"
import { StallSummary } from "./components/Summary/StallSummary"

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
                      <div>
                        <UserNav />
                        <Routes>
                          <Route path="/admins" element={<Admins />} />
                          <Route path="/agents" element={<Agents />} />
                        </Routes>
                      </div>
                    }
                  />

                  <Route path="/summary" element={<Summary />} />
                  <Route path="/summary/stall-sheet" element={<StallSheet />} />
                  <Route
                    path="/summary/stall-summary"
                    element={<StallSummary />}
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
