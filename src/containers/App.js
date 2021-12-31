import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateOutlet from '../components/PrivateOutlet'
import List from './List'
import Register from './Register'
import NotFound from './NotFound'
import { SpinLoader } from '@ds.crisp/react-components'
const Create = React.lazy(() => import('./Create'))
const Update = React.lazy(() => import('./Update'))

const App = ({}) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateOutlet redirectTo="/register" />}>
          <Route path="/" element={<List />} />
          <Route
            path="/view/:noteId"
            element={
              <Suspense fallback={<SpinLoader/>}>
                <Update />
              </Suspense>
            }
          />
          <Route
            path="/create"
            element={
              <Suspense fallback={<SpinLoader/>}>
                <Create />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
