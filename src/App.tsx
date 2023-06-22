import React from 'react'
import './scss/app.scss'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import FullSneaker from './pages/FullSneaker'
import MainLayout from './layouts/MainLayout'

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="sneaker/:id" element={<FullSneaker />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App
