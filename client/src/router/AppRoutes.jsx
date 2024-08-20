import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import IndexWOPageITSKancab from '../pages/itsupportkancab/wo/indexPage';
import IndexLOPageITSKancab from '../pages/itsupportkancab/lo/indexPage';
import IndexvendorPageITSKancab from '../pages/itsupportkancab/vendor/indexPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/itsupportkancab/vendor" element={<IndexvendorPageITSKancab />} />
            <Route path="/itsupportkancab/lo" element={<IndexLOPageITSKancab />} />
            <Route path="/itsupportkancab/wo" element={<IndexWOPageITSKancab />} />
        </Routes>
    );
};

export default AppRoutes;
