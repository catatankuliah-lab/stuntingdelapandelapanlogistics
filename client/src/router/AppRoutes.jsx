import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import IndexWOPageITSKancab from '../pages/itsupportkancab/wo/indexPage';
import IndexLOPageITSKancab from '../pages/itsupportkancab/lo/indexPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/itsupportkancab/wo" element={<IndexWOPageITSKancab />} />
            <Route path="/itsupportkancab/lo" element={<IndexLOPageITSKancab />} />
        </Routes>
    );
};

export default AppRoutes;
