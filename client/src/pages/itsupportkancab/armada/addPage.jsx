import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';

const AddPage = ({ handlePageChange, handleBackClick }) => {
    const [detailId, setDetailId] = useState('');
    const [vendorArmada, setVendorArmada] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [jenisMobil, setJenisMobil] = useState([]);
    const [selectedJenisMobil, setSelectedJenisMobil] = useState(null);
    const [formData, setFormData] = useState({
    });
    useEffect(() => {
        const fetchVendorArmadaAll = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/vendorarmada/all');
                const datavendorarmada = response.data.map(vendorarmadaall => ({
                    value: vendorarmadaall.id_vendor,
                    label: vendorarmadaall.nama_vendor
                }));
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
                const datajenismobil = response.data.map(jenismobil => ({
                    value: jenismobil.id_jenis_mobil,
                    label: jenismobil.nama_jenis_mobil
                }));
                setJenisMobil(datajenismobil);
            } catch (error) {
                console.error('Error fetching', error);
            }
        };
        fetchJenisMobil();
    }, []);

    useEffect(() => {
        if (detailId !== '') {
            console.log(detailId);
            handlePageChange('detail', detailId);
        }
    }, [detailId, handlePageChange]);

    const handleVendorArmadaChange = (selectedOption) => {
        setSelectedVendor(selectedOption);
    };

    const handleJenisMobilChange = (selectedOption) => {
        setSelectedJenisMobil(selectedOption);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSubmit = {
            ...formData,
            status_armada: "TERSEDIA",
            id_vendor: selectedVendor.value,
            id_jenis_mobil: selectedJenisMobil.value,
            lokasi_terakhir: "GARASI " + selectedVendor.label,
        };
        try {
            const response = await axios.post('http://localhost:5050/api/armada/add', dataToSubmit);
            const dataToUpdate = {
                status_vendor: "TERSEDIA"
            }
            await axios.put(`http://localhost:5050/api/vendorarmada/updatestatus/${response.data.id_vendor}`, dataToUpdate);
            Swal.fire({
                title: 'Data Armada',
                text: 'Data Berhasil Ditambahkan',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
                position: 'center',
                timerProgressBar: true
            }).then(() => {
                handleBackClick();
            });
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="mb-3">
                    <div className="divider text-start fw-bold">
                        <div className="divider-text">
                            <span className="menu-header-text fs-6">Tambah Armada</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="">
                    Klik <button className="fw-bold btn btn-link p-0" onClick={() => handlePageChange('index')}>disini</button> untuk kembali ke menu utama Armada.
                </div>
            </div>
            <div className="col-md-12 mt-3">
                <form id="form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 col-sm-12 col-sm-6 mb-3">
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
                        <div className="col-md-4 col-sm-12 col-sm-6 mb-3">
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
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="nopol_mobil_armada" className="form-label">Nopol Mobil</label>
                            <input className="form-control text-uppercase" type="text" id="nopol_mobil_armada" name='nopol_mobil_armada' placeholder="Nopol Mobil" onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="status_armada" className="form-label">Status</label>
                            <input className="form-control text-uppercase" type="text" id="status_armada" name='status_armada' placeholder="Tersedia" readOnly />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="" className="form-label">Proses</label>
                            <button type="submit" className="btn btn-primary w-100">SIMPAN</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

AddPage.propTypes = {
    handlePageChange: PropTypes.func.isRequired,
    handleBackClick: PropTypes.func.isRequired,
};

export default AddPage;