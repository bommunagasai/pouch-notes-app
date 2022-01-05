import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateOutlet from '../components/PrivateOutlet'
import List from './List'
import Register from './Register'
import NotFound from './NotFound'
import { SpinLoader } from '@ds.crisp/react-components'
const Create = React.lazy(() => import('./Create'))
const Update = React.lazy(() => import('./Update'))

import '@ds.crisp/scss/lib/SearchBar.css'
import '@ds.crisp/scss/lib/Grid.css'
import '@ds.crisp/scss/lib/Tag.css'
import '@ds.crisp/scss/lib/Utilities.css'
import '@ds.crisp/scss/lib/Color.css'
import '@ds.crisp/scss/lib/Icons.css'
import '@ds.crisp/scss/lib/Loader.css'
import '@ds.crisp/scss/lib/Button.css'
import '@ds.crisp/scss/lib/Sheet.css'

const App = ({}) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateOutlet redirectTo="/register" />}>
          <Route path="/" element={<List />} />
          <Route
            path="/view/:noteId"
            element={
              <Suspense fallback={<SpinLoader />}>
                <Update />
              </Suspense>
            }
          />
          <Route
            path="/create"
            element={
              <Suspense fallback={<SpinLoader />}>
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
