import React, { Suspense } from 'react'
import './scss/app.scss'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
// import Cart from './pages/Cart'
// import NotFound from './pages/NotFound'
// import FullSneaker from './pages/FullSneaker'
import MainLayout from './layouts/MainLayout'

const Cart = React.lazy(() => import('./pages/Cart'))
const FullSneaker = React.lazy(() => import('./pages/FullRamen'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route
                    path="cart"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Cart />
                        </Suspense>
                    }
                />
                <Route
                    path="ramen/:id"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <FullSneaker />
                        </Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <NotFound />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    )
}

export default App
