import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';
import axios from 'axios';
import Select from 'react-select';

const IndexLOPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
    const statusVendorOption = [
        { value: 'TAMPILKAN SEMUA', label: 'TAMPILKAN SEMUA' },
        { value: 'TERSEDIA', label: 'TERSEDIA' },
        { value: 'TIDAK TERSEDIA', label: 'TIDAK TERSEDIA' }
    ];
    const [vendorArmada, setVendorArmada] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const fetchVendorArmadaTersedia = async () => {
        try {
            const response = await axios.get('http://localhost:5050/api/vendorarmada/tersedia');
            const datavendorarmada = response.data.map(vendorarmadatersedia => ({
                id_vendor: vendorarmadatersedia.id_vendor,
                nama_vendor: vendorarmadatersedia.nama_vendor,
                alamat_vendor: vendorarmadatersedia.alamat_vendor,
                penanggungjawab_vendor: vendorarmadatersedia.penanggungjawab_vendor,
                telpon_vendor: vendorarmadatersedia.telpon_vendor,
                jumlah_armada: vendorarmadatersedia.jumlah_armada,
                status_vendor: vendorarmadatersedia.status_vendor,
                createdAt: vendorarmadatersedia.createdAt,
                updatedAt: vendorarmadatersedia.updatedAt
            }));
            setVendorArmada(datavendorarmada);
        } catch (error) {
            console.error('Error fetching Alokasi options:', error);
        }
    };
    const fetchVendorArmadaTidakTersedia = async () => {
        try {
            const response = await axios.get('http://localhost:5050/api/vendorarmada/tidaktersedia');
            const datavendorarmada = response.data.map(vendorarmadatidaktersedia => ({
                id_vendor: vendorarmadatidaktersedia.id_vendor,
                nama_vendor: vendorarmadatidaktersedia.nama_vendor,
                alamat_vendor: vendorarmadatidaktersedia.alamat_vendor,
                penanggungjawab_vendor: vendorarmadatidaktersedia.penanggungjawab_vendor,
                telpon_vendor: vendorarmadatidaktersedia.telpon_vendor,
                jumlah_armada: vendorarmadatidaktersedia.jumlah_armada,
                status_vendor: vendorarmadatidaktersedia.status_vendor,
                createdAt: vendorarmadatidaktersedia.createdAt,
                updatedAt: vendorarmadatidaktersedia.updatedAt
            }));
            setVendorArmada(datavendorarmada);
        } catch (error) {
            console.error('Error fetching Alokasi options:', error);
        }
    };
    const fetchVendorArmadaAll = async () => {
        try {
            const response = await axios.get('http://localhost:5050/api/vendorarmada/all');
            const datavendorarmada = response.data.map(vendorarmadaall => ({
                id_vendor: vendorarmadaall.id_vendor,
                nama_vendor: vendorarmadaall.nama_vendor,
                alamat_vendor: vendorarmadaall.alamat_vendor,
                penanggungjawab_vendor: vendorarmadaall.penanggungjawab_vendor,
                telpon_vendor: vendorarmadaall.telpon_vendor,
                jumlah_armada: vendorarmadaall.jumlah_armada,
                status_vendor: vendorarmadaall.status_vendor,
                createdAt: vendorarmadaall.createdAt,
                updatedAt: vendorarmadaall.updatedAt
            }));
            setVendorArmada(datavendorarmada);
        } catch (error) {
            console.error('Error fetching Alokasi options:', error);
        }
    };

    const handleStatusVendorChange = (selectedOption) => {
        setSelectedVendor(selectedOption);
        if (selectedOption.value == "TERSEDIA") {
            fetchVendorArmadaTersedia();
        } else if (selectedOption.value == "TIDAK TERSEDIA") {
            fetchVendorArmadaTidakTersedia();
        } else {
            fetchVendorArmadaAll();
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

    const handleBackClick = () => {
        setCurrentView('index');
        setSelectedVendor(
            { value: 'TAMPILKAN SEMUA', label: 'TAMPILKAN SEMUA' }
        );
        fetchVendorArmadaAll();
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
                            Klik <button className="fw-bold btn btn-link p-0" onClick={() => handlePageChange('add')}>disini</button> untuk menambahkan data Penyedia Armada.
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
                            <div className="col-md-12 mb-4 mb-md-0">
                                <div className="accordion mt-3" id="accordion_vendor_armada">
                                    {vendorArmada.map(va => (
                                        <div key={va.id_vendor} className="card accordion-item">
                                            <h2 className="accordion-header px-2" id={`heading${va.id_vendor}`}>
                                                <button
                                                    type="button"
                                                    className={`accordion-button accordion-button-primary collapsed ${(va.status_vendor == "TIDAK TERSEDIA") ? 'text-danger' : 'text-primary'}`}
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#accordion${va.id_vendor}`}
                                                    aria-expanded="false"
                                                    aria-controls={`accordion${va.id_vendor}`}
                                                >
                                                    {va.nama_vendor} | ARMADA {va.jumlah_armada} | {va.status_vendor}
                                                </button>
                                            </h2>
                                            <div id={`accordion${va.id_vendor}`} className="accordion-collapse collapse" data-bs-parent="#accordion_vendor_armada">
                                                <div className="accordion-body" style={{ marginTop: "-15px" }} >
                                                    <div className="px-2">
                                                        <hr />
                                                        <div className="col-md-12 col-sm-12 mt-0 mt-md-3">
                                                            <p style={{ marginBottom: "2px" }}>
                                                                {va.nama_vendor}
                                                            </p>
                                                            <p style={{ marginBottom: "2px" }}>
                                                                PENANGGUNG JAWAB {va.penanggungjawab_vendor}
                                                            </p>
                                                            <p style={{ marginBottom: "2px" }}>
                                                                TELPON PENANGGUNG JAWAB {va.telpon_vendor}
                                                            </p>
                                                            <p style={{ marginBottom: "2px" }}>
                                                                {va.jumlah_armada} ARMADA
                                                            </p>
                                                            <button className="btn btn-link p-0 mt-3" onClick={() => handleEditDataClick(va.id_vendor)}>
                                                                <i className="tf-icons bx bx-edit me-2"></i> DETAIL
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {currentView === 'add' && <AddPage handlePageChange={handlePageChange} handleBackClick={handleBackClick} />}
            {currentView === 'detail' && <DetailPage handlePageChange={handlePageChange} detailId={detailId} handleBackClick={handleBackClick} />}
        </div>
    );
};

export default IndexLOPage;