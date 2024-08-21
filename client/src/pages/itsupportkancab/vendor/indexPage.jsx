import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';
import axios from 'axios';
import Select from 'react-select';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const IndexLOPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
    const statusVendorOption = [
        { value: 'TAMPILKAN SEMUA', label: 'TAMPILKAN SEMUA' },
        { value: 'TERSEDIA', label: 'TERSEDIA' },
        { value: 'TIDAK TERSEDIA', label: 'TIDAK TERSEDIA' }
    ];
    const [selectedVendor, setSelectedVendor] = useState(null);
    const handleStatusVendorChange = (selectedOption) => {
        setSelectedVendor(selectedOption);
        if (selectedOption.value == "TERSEDIA") {
            console.log("TERSEDIA");
        } else if (selectedOption.value == "TIDAK TERSEDIA") {
            console.log("TIDAK TERSEDIA");
        } else {
            console.log("TAMPILKAN SEMUA");
        }
    };
    const handlePageChange = (page, id = null) => {
        setCurrentView(page);
        if (id !== null) {
            setDetailId(id);
        }
    };

    const handleAdd = () => {
        setCurrentView('add');
    };

    const handleEditDataClick = (id) => {
        setDetailId(id);
        setCurrentView('detail');
    };

    return (
        <div>
            {currentView === 'index' && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6 fw-bold">Data Penyedia Armada</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="">
                            Klik <button className="fw-bold btn btn-link p-0" onClick={() => handlePageChange('detail', '1', '1')}>disini</button> untuk menambahkan data Penyedia Armada.
                        </div>
                    </div>
                    <div className="col-lg-12 mt-3">
                        <div className="row">
                            <div className="col-md-4 col-sm-12 col-sm-6 mb-3">
                                <label htmlFor="status_vendor" className="form-label">STATUS</label>
                                <Select
                                    id="status_vendor"
                                    name="status_vendor"
                                    value={selectedVendor}
                                    onChange={handleStatusVendorChange}
                                    options={statusVendorOption}
                                    placeholder="PILIH STATUS"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {currentView === 'add' && <AddPage handlePageChange={handlePageChange} />}
            {currentView === 'detail' && <DetailPage handlePageChange={handlePageChange} detailId={detailId} />}
        </div>
    );
};

export default IndexLOPage;