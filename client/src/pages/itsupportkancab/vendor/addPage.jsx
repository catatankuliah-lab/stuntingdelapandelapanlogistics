import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddPage = ({ handlePageChange, handleBackClick }) => {
    const [formData, setFormData] = useState({
    });
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
            status_vendor: "TIDAK TERSEDIA",
            jumlah_armada: "0",
        };
        try {
            await axios.post('http://localhost:5050/api/vendorarmada/add', dataToSubmit);
            Swal.fire({
                title: 'Data Penyedia Armada',
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
                            <span className="menu-header-text fs-6">Tambah Penyedia Armada</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="">
                    Klik <button className="fw-bold btn btn-link p-0" onClick={() => handlePageChange('index')}>disini</button> untuk kembali ke menu utama Penyedia Armada.
                </div>
            </div>
            <div className="col-md-12 mt-3">
                <form id="form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="nama_vendor" className="form-label">Nama Penyedia Armada</label>
                            <input className="form-control text-uppercase" type="text" id="nama_vendor" name='nama_vendor' placeholder="Nama Penyedia Armada" onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="alamat_vendor" className="form-label">Alamat Penyedia Armada</label>
                            <input className="form-control text-uppercase" type="text" id="alamat_vendor" name='alamat_vendor' placeholder="Alamat Penyedia Armada" onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="penanggungjawab_vendor" className="form-label">Penanggung Jawab</label>
                            <input className="form-control text-uppercase" type="text" id="penanggungjawab_vendor" name='penanggungjawab_vendor' placeholder="Penanggung Jawab" onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="telpon_vendor" className="form-label">Nomor Telpon Penyedia Armada</label>
                            <input className="form-control text-uppercase" type="text" id="telpon_vendor" name='telpon_vendor' placeholder="Nomor Telpon Penyedia Armada" onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="jumlah_armada" className="form-label">Jumlah Armada</label>
                            <input className="form-control text-uppercase" type="text" id="jumlah_armada" name='jumlah_armada' placeholder="Jumlah Armada" readOnly />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="alamat_langsir" className="form-label">Status</label>
                            <input className="form-control text-uppercase" type="text" id="alamat_langsir" name='alamat_langsir' placeholder="Tersedia" readOnly />
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