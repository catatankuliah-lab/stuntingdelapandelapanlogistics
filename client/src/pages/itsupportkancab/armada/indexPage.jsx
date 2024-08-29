import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';

const IndexArmadaPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
    const [vendorArmada, setVendorArmada] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [jenisMobil, setJenisMobil] = useState([]);
    const [selectedJenisMobil, setSelectedJenisMobil] = useState(null);
    const [selectedStatusArmada, setSelectedStatusArmada] = useState(null);
    const [armadaFiltered, setarmAdaFiltered] = useState([]);
    const [formFilter, setFormFilter] = useState({
    });
    const [statusArmada, setStatusArmada] = useState([
        { value: 'TAMPILKAN SEMUA', label: 'TAMPILKAN SEMUA' },
        { value: 'TERSEDIA', label: 'TERSEDIA' },
        { value: 'TIDAK TERSEDIA', label: 'TIDAK TERSEDIA' }
    ]);
    let fiterLengkap = true;
    const handlePageChange = (page, id = null) => {
        setCurrentView(page);
        if (id !== null) {
            setDetailId(id);
        }
    };

    const handleEditDataClick = (id) => {
        setDetailId(id);
        setCurrentView('detail');
    };

    const handleBackClick = () => {
        setCurrentView('index');
    };

    useEffect(() => {
        const fetchVendorArmadaAll = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/vendorarmada/all');
                const datavendorarmada = [
                    {
                        value: 0,
                        label: 'SEMUA VENDOR'
                    },
                    ...response.data.map(vendorarmadaall => ({
                        value: vendorarmadaall.id_vendor,
                        label: vendorarmadaall.nama_vendor
                    }))
                ];
                setVendorArmada(datavendorarmada);
            } catch (error) {
                console.error('Error fetching', error);
            }
        };
        fetchVendorArmadaAll();
    }, []);

    useEffect(() => {
        const fetchJenisMobil = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/jenismobil/all');
                const datajenismobil = [
                    {
                        value: 0,
                        label: 'SEMUA JENIS MOBIL'
                    },
                    ...response.data.map(jenismobil => ({
                        value: jenismobil.id_jenis_mobil,
                        label: jenismobil.nama_jenis_mobil
                    }))
                ];
                setJenisMobil(datajenismobil);
            } catch (error) {
                console.error('Error fetching', error);
            }
        };
        fetchJenisMobil();
    }, []);

    const handleVendorArmadaChange = (selectedOption) => {
        setSelectedVendor(selectedOption);
    };

    const handleJenisMobilChange = (selectedOption) => {
        setSelectedJenisMobil(selectedOption);
    };

    const handleStatusArmadaChange = (selectedOption) => {
        setSelectedStatusArmada(selectedOption);
    };

    const showFilter = async (vendor, jenis, status) => {
        if (!vendor) {
            fiterLengkap = false;
        }
        if (!jenis) {
            fiterLengkap = false;
        }
        if (!status) {
            fiterLengkap = false;
        }
        if (!fiterLengkap) {
            Swal.fire({
                title: 'Filter Data',
                text: 'Pilih Filter Data Terlebih Dahulu',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
                position: 'center',
                timerProgressBar: true
            });
        } else {
            const dataToSubmit = ({
                ...formFilter,
                id_vendor: vendor.value,
                id_jenis_mobil: jenis.value,
                status_armada: status.value
            });
            try {
                const response = await axios.post('http://localhost:5050/api/armada/filter', dataToSubmit);
                if (response.data.length == 0) {
                    Swal.fire({
                        title: 'Data Armada',
                        text: 'Data Armada Tidak Ditemukan',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 2000,
                        position: 'center',
                        timerProgressBar: true
                    });
                    const dataarmadafiltered = response.data.map(vendorarmadatersedia => ({
                        id_armada: "",
                        id_vendor: "",
                        nama_vendor: "",
                        id_jenis_mobil: "",
                        nama_jenis_mobil: "",
                        nopol_mobil_armada: "",
                        lokasi_terakhir: "",
                        status_armada: ""
                    }));
                    setarmAdaFiltered(dataarmadafiltered);
                } else {
                    const dataarmadafiltered = response.data.map(vendorarmadatersedia => ({
                        id_armada: vendorarmadatersedia.id_armada,
                        id_vendor: vendorarmadatersedia.id_vendor,
                        nama_vendor: vendorarmadatersedia.nama_vendor,
                        id_jenis_mobil: vendorarmadatersedia.id_jenis_mobil,
                        nama_jenis_mobil: vendorarmadatersedia.nama_jenis_mobil,
                        nopol_mobil_armada: vendorarmadatersedia.nopol_mobil_armada,
                        lokasi_terakhir: vendorarmadatersedia.lokasi_terakhir,
                        status_armada: vendorarmadatersedia.status_armada
                    }));
                    setarmAdaFiltered(dataarmadafiltered);
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Data Armada',
                    text: 'Data Armada Tidak Ditemukan',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000,
                    position: 'center',
                    timerProgressBar: true
                });
            }
        }
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
                            <div className="col-md-3 col-sm-12 col-sm-6 mb-3">
                                <label htmlFor="id_vendor" className="form-label">VENDOR ARMADA</label>
                                <Select
                                    id="id_vendor"
                                    name="id_vendor"
                                    value={selectedVendor}
                                    onChange={handleVendorArmadaChange}
                                    options={vendorArmada}
                                    placeholder="PILIH VENDOR"
                                />
                            </div>
                            <div className="col-md-3 col-sm-12 col-sm-6 mb-3">
                                <label htmlFor="id_jenis_mobil" className="form-label">JENIS MOBIL</label>
                                <Select
                                    id="id_jenis_mobil"
                                    name="id_jenis_mobil"
                                    value={selectedJenisMobil}
                                    onChange={handleJenisMobilChange}
                                    options={jenisMobil}
                                    placeholder="PILIH JENIS MOBIL"
                                />
                            </div>
                            <div className="col-md-3 col-sm-12 col-sm-6 mb-3">
                                <label htmlFor="status_vendor" className="form-label">STATUS</label>
                                <Select
                                    id="status_vendor"
                                    name="status_vendor"
                                    value={selectedStatusArmada}
                                    onChange={handleStatusArmadaChange}
                                    options={statusArmada}
                                    placeholder="PILIH STATUS"
                                />
                            </div>
                            <div className="col-md-3 col-sm-12 mb-3">
                                <label htmlFor="" className="form-label">FILTER</label>
                                <button type="button" className="btn btn-primary w-100" onClick={() => showFilter(
                                    selectedVendor,
                                    selectedJenisMobil,
                                    selectedStatusArmada
                                )} >TAMPILKAN</button>
                            </div>
                            <div className="col-md-12 mb-4 mb-md-0">
                                <div className="accordion mt-3" id="accordion_armada">
                                    {armadaFiltered.map(va => (
                                        <div key={va.id_armada} className="card accordion-item">
                                            <h2 className="accordion-header px-2" id={`heading${va.id_armada}`}>
                                                <button
                                                    type="button"
                                                    className={`accordion-button accordion-button-primary collapsed ${(va.status_vendor == "TIDAK TERSEDIA") ? 'text-danger' : 'text-primary'}`}
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#accordion${va.id_armada}`}
                                                    aria-expanded="false"
                                                    aria-controls={`accordion${va.id_armada}`}
                                                >
                                                    {va.nama_vendor} | {va.nopol_mobil_armada} - {va.nama_jenis_mobil} | {va.status_armada}
                                                </button>
                                            </h2>
                                            <div id={`accordion${va.id_armada}`} className="accordion-collapse collapse" data-bs-parent="#accordion_armada">
                                                <div className="accordion-body" style={{ marginTop: "-15px" }} >
                                                    <div className="px-2">
                                                        <hr />
                                                        <div className="col-md-12 col-sm-12 mt-0 mt-md-3">
                                                            <p style={{ marginBottom: "2px" }}>
                                                                {va.nama_vendor}
                                                            </p>
                                                            <p style={{ marginBottom: "2px" }}>
                                                                {va.nopol_mobil_armada} - {va.nama_jenis_mobil}
                                                            </p>
                                                            <p style={{ marginBottom: "2px" }}>
                                                                LOKASI TERAKHIR {va.lokasi_terakhir}
                                                            </p>
                                                            <p style={{ marginBottom: "2px" }}>
                                                                STATUS <span className='fw-bold' >{va.status_armada}</span>
                                                            </p>
                                                            <button className="btn btn-link p-0 mt-3" onClick={() => handleEditDataClick(va.id_armada)}>
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
            {currentView === 'detail' && <DetailPage handlePageChange={handlePageChange} detailId={detailId} />}
        </div>
    );
};

export default IndexArmadaPage;