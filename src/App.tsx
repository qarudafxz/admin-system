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

import { Expenses } from "./pages/Expenses"
import { RequestExpenses } from "./pages/RequestExpenses"

import { Result } from "./pages/Result"
import { AddResult } from "./components/Result/AddResult"
import { Hits } from "./pages/Hits"
import { Limit } from "./pages/Limit"
import { CheckLimit } from "./pages/CheckLimit"
import { HotNumbers } from "./pages/HotNumbers"
import { CreateHot } from "./pages/CreateHot"

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
                  <Route path="/expenses" element={<Expenses />} />
                  <Route path="/view-requests" element={<RequestExpenses />} />
                  <Route path="/result" element={<Result />} />
                  <Route path="/limits" element={<Limit />} />
                  <Route path="/check-limit" element={<CheckLimit />} />

                  <Route path="/add-result" element={<AddResult />} />
                  <Route path="/hits" element={<Hits />} />
                  <Route path="/hot" element={<HotNumbers />} />
                  <Route path="/create-hot" element={<CreateHot />} />
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
