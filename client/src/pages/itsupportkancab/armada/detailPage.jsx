import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Select from 'react-select';


const DetailPage = ({ handlePageChange, detailId, idAlokasiPenyaluran }) => {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [formData, setFormData] = useState({
    });

    const handleSubmit = async (event) => {
        // event.preventDefault();
        // if (selectedWO == null) {
        //     console.log("KOSONG");
        // } else {
        //     const dataToSubmit = {
        //         ...formData,
        //         id_wo: selectedWO.value,
        //         nomor_lo: 'LO-88LOGSTNG-A1-' + selectedAlokasi.value + '24-1',
        //         qr_lo: 'LO-88LOGSTNG-A1-' + selectedAlokasi.value + '24-1',
        //         status_lo: "SEDANG DIBUAT",
        //         jenis_muatan: "AYAM",
        //     };
        //     console.log(dataToSubmit);
        //     try {
        //         await axios.post('http://localhost:5050/api/lo2408/add', dataToSubmit);
        //         console.log('Data submitted successfully');
        //         try {
        //             const response = await fetch(`http://localhost:5050/api/lo2408/getlastbyidadminkancabayam/1`, dataToSubmit);
        //             const data = await response.json();
        //             console.log('Data submitted successfully');
        //             setDetailId(data.id_lo);
        //         } catch (error) {
        //             console.error('Error submitting data:', error);
        //         }
        //     } catch (error) {
        //         console.error('Error submitting data:', error);
        //     }
        // }
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
                <form id="form">
                    <div className="row">
                        <div className="col-md-12 mt-3">
                            <form id="form" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-4 col-sm-12 mb-3">
                                        <label htmlFor="tanggal_lo" className="form-label">Nama Penyedia Armada</label>
                                        <input className="form-control text-uppercase" type="text" id="tanggal_lo" name='tanggal_lo' placeholder="Nama Penyedia Armada" onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-4 col-sm-12 mb-3">
                                        <label htmlFor="nomor_mobil" className="form-label">Alamat Penyedia Armada</label>
                                        <input className="form-control text-uppercase" type="text" id="nomor_mobil" name='nomor_mobil' placeholder="Alamat Penyedia Armada" onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-4 col-sm-12 mb-3">
                                        <label htmlFor="nama_driver" className="form-label">Penanggung Jawab</label>
                                        <input className="form-control text-uppercase" type="text" id="nama_driver" name='nama_driver' placeholder="Penanggung Jawab" onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-4 col-sm-12 mb-3">
                                        <label htmlFor="nomor_driver" className="form-label">Nomor Telpon Penyedia Armada</label>
                                        <input className="form-control text-uppercase" type="text" id="nomor_driver" name='nomor_driver' placeholder="Nomor Telpon Penyedia Armada" onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-4 col-sm-12 mb-3">
                                        <label htmlFor="nama_langsir" className="form-label">Jumlah Armada</label>
                                        <input className="form-control text-uppercase" type="text" id="nama_langsir" name='nama_langsir' placeholder="Jumlah Armada" onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-4 col-sm-12 mb-3">
                                        <label htmlFor="alamat_langsir" className="form-label">Status</label>
                                        <input className="form-control text-uppercase" type="text" id="alamat_langsir" name='alamat_langsir' placeholder="Tersedia" onChange={handleChange} required />
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
                                                        <th>Nama Driver</th>
                                                        <th>Nomor Telepon</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* {itemWOOption.item_wo_by_wo_2408.map((itemWo, index) => (
                                                        <tr key={itemWo.id_item_wo}>
                                                            <td>{nomor++}</td>
                                                            <td>{itemWo.desa_kelurahan.kecamatan.kabupaten_kota.nama_kabupaten_kota}</td>
                                                            <td>{itemWo.desa_kelurahan.kecamatan.nama_kecamatan}</td>
                                                            <td>{itemWo.desa_kelurahan.nama_desa_kelurahan}</td>
                                                            <td>{itemWo.jumlah_paket_desa_kelurahan}</td>
                                                        </tr>
                                                    ))} */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

DetailPage.propTypes = {
    handlePageChange: PropTypes.func.isRequired,
    detailId: PropTypes.number.isRequired,
    idAlokasiPenyaluran: PropTypes.object.isRequired
};

export default DetailPage;
