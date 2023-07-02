import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import frontendUrl from '../urls/frontendUrl';
import Details from '../pages/details';

export default function AuthRoutes() {
    return (
        <Routes>
            <Route path={frontendUrl.HOME.SELF} element={<Dashboard />} />
            <Route path={frontendUrl.HOME.DETAIL} element={<Details />} />
        </Routes>
    )
}