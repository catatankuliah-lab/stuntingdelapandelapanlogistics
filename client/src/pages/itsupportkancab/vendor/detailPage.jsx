import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const DetailPage = ({ handlePageChange, detailId, handleBackClick }) => {
    const inputRef = useRef(null);
    const [vendorArmada, setVendorArmada] = useState([]);
    const [listArmada, setListArmada] = useState([]);
    const [formData, setFormData] = useState({
        nama_vendor: vendorArmada?.nama_vendor || "",
        alamat_vendor: vendorArmada?.alamat_vendor || "",
        penanggungjawab_vendor: vendorArmada?.penanggungjawab_vendor || "",
        telpon_vendor: vendorArmada?.telpon_vendor || "",
    });

    useEffect(() => {
        setFormData({
            nama_vendor: vendorArmada?.nama_vendor || "",
            alamat_vendor: vendorArmada?.alamat_vendor || "",
            penanggungjawab_vendor: vendorArmada?.penanggungjawab_vendor || "",
            telpon_vendor: vendorArmada?.telpon_vendor || "",
        });
    }, [vendorArmada]);

    const fetchVendorArmada = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5050/api/vendorarmada/detail/${detailId}`);
            console.clear();
            setVendorArmada(response.data.result)
            const bahanArmada = response.data.result.armada_by_id_vendor.map((armada, index) => ({
                no: index + 1,
                id_armada: armada.id_armada,
                id_vendor: armada.id_vendor,
                id_jenis_mobil: armada.id_jenis_mobil,
                nopol_mobil_armada: armada.nopol_mobil_armada,
                telpon_driver_armada: armada.telpon_driver_armada,
                status_armada: armada.status_armada,
                lokasi_terakhir: armada.lokasi_terakhir
            }));
            setListArmada(bahanArmada);
        } catch (error) {
            console.error('Error fetching Alokasi options:', error);
        }
    }, [detailId]);

    useEffect(() => {
        fetchVendorArmada();
    }, [fetchVendorArmada]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:5050/api/vendorarmada/update/${detailId}`, formData);
            Swal.fire({
                title: 'Data Penyedia Armada',
                text: 'Data Berhasil Diperbaharui',
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
                            <span className="menu-header-text fs-6">Detail Penyedia Armada</span>
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
                <div className="col-md-12 mt-3">
                    <form id="form" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-4 col-sm-12 mb-3">
                                <label htmlFor="nama_vendor" className="form-label">Nama Penyedia Armada</label>
                                <input className="form-control text-uppercase" type="text" id="nama_vendor" name='nama_vendor' placeholder="Nama Penyedia Armada" ref={inputRef} defaultValue={vendorArmada?.nama_vendor || ""} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4 col-sm-12 mb-3">
                                <label htmlFor="alamat_vendor" className="form-label">Alamat Penyedia Armada</label>
                                <input className="form-control text-uppercase" type="text" id="alamat_vendor" name='alamat_vendor' placeholder="Alamat Penyedia Armada" ref={inputRef} defaultValue={vendorArmada?.alamat_vendor || ""} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4 col-sm-12 mb-3">
                                <label htmlFor="penanggungjawab_vendor" className="form-label">Penanggung Jawab</label>
                                <input className="form-control text-uppercase" type="text" id="penanggungjawab_vendor" name='penanggungjawab_vendor' placeholder="Penanggung Jawab" ref={inputRef} defaultValue={vendorArmada?.penanggungjawab_vendor || ""} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4 col-sm-12 mb-3">
                                <label htmlFor="telpon_vendor" className="form-label">Nomor Telpon Penyedia Armada</label>
                                <input className="form-control text-uppercase" type="text" id="telpon_vendor" name='telpon_vendor' placeholder="Nomor Telpon Penyedia Armada" ref={inputRef} defaultValue={vendorArmada?.telpon_vendor || ""} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4 col-sm-12 mb-3">
                                <label htmlFor="jumlah_armada" className="form-label">Jumlah Armada</label>
                                <input className="form-control text-uppercase" type="text" id="jumlah_armada" name='jumlah_armada' placeholder="Jumlah Armada" value={vendorArmada.jumlah_armada} readOnly />
                            </div>
                            <div className="col-md-4 col-sm-12 mb-3">
                                <label htmlFor="alamat_langsir" className="form-label">Status</label>
                                <input className="form-control text-uppercase" type="text" id="alamat_langsir" name='alamat_langsir' placeholder="Tersedia" value={vendorArmada.status_vendor} readOnly />
                            </div>
                            <div className="col-md-4 col-sm-12 mb-3 mt-4">
                                <button type="submit" className="btn btn-primary w-100">SIMPAN PERUBAHAN</button>
                            </div>
                            <div className="col-md-12 mb-4 mb-md-0 mt-3">
                                <div className='table-responsive text-nowrap"'>
                                    <table className="table" style={{ fontSize: "13px" }} >
                                        <thead>
                                            <tr>
                                                <th style={{ width: "5px" }} >No</th>
                                                <th>Nopol Mobil</th>
                                                <th>Nomor Telepon</th>
                                                <th>Lokasi Terakhir</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listArmada.map((itemArmada, index) => (
                                                <tr key={itemArmada.id_armada}>
                                                    <td>{itemArmada.no}</td>
                                                    <td>{itemArmada.nopol_mobil_armada}</td>
                                                    <td>{itemArmada.telpon_driver_armada}</td>
                                                    <td>{itemArmada.lokasi_terakhir}</td>
                                                    <td>{itemArmada.status_armada}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

DetailPage.propTypes = {
    handlePageChange: PropTypes.func.isRequired,
    detailId: PropTypes.number.isRequired,
    handleBackClick: PropTypes.func.isRequired,
};

export default DetailPage;
