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
                            <span className="menu-header-text fs-6">Detail Armada</span>
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
                <div className="row">
                    <div className="col-md-12 mt-3">
                        <form id="form" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-4 col-sm-12 mb-3">
                                    <label htmlFor="tanggal_lo" className="form-label">Nama Penyedia Armada</label>
                                    <Select
                                        id="id_wo"
                                        name="id_wo"
                                        // value={selectedWO}
                                        // onChange={handleWOChange}
                                        // options={woOption}
                                        placeholder="PILIH NAMA PENYEDIA ARMADA"
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 mb-3">
                                    <label htmlFor="nomor_mobil" className="form-label">jenis Mobil</label>
                                    <Select
                                        id="id_wo"
                                        name="id_wo"
                                        // value={selectedWO}
                                        // onChange={handleWOChange}
                                        // options={woOption}
                                        placeholder="PILIH JENIS MOBIL"
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 mb-3">
                                    <label htmlFor="nama_driver" className="form-label">Nopol Mobil</label>
                                    <input className="form-control text-uppercase" type="text" id="nama_driver" name='nama_driver' placeholder="Nopol Mobil" onChange={handleChange} required />
                                </div>
                                <div className="col-md-4 col-sm-12 mb-3">
                                    <label htmlFor="nomor_driver" className="form-label">Nama Driver</label>
                                    <input className="form-control text-uppercase" type="text" id="nomor_driver" name='nomor_driver' placeholder="Nama Driver" onChange={handleChange} required />
                                </div>
                                <div className="col-md-4 col-sm-12 mb-3">
                                    <label htmlFor="nama_langsir" className="form-label">Nomor Telepon Driver</label>
                                    <input className="form-control text-uppercase" type="text" id="nama_langsir" name='nama_langsir' placeholder="Nomor Telepon Driver" onChange={handleChange} required />
                                </div>
                                <div className="col-md-4 col-sm-12 mb-3">
                                    <label htmlFor="alamat_langsir" className="form-label">Status</label>
                                    <input className="form-control text-uppercase" type="text" id="alamat_langsir" name='alamat_langsir' placeholder="Tersedia" onChange={handleChange} required />
                                </div>
                                <div className="col-md-4 col-sm-12 mb-3">
                                    <label htmlFor="alamat_langsir" className="form-label">Lokasi Terakhir</label>
                                    <input className="form-control text-uppercase" type="text" id="alamat_langsir" name='alamat_langsir' placeholder="KABUPATEN GAURT" onChange={handleChange} required />
                                </div>
                                <div className="col-md-4 col-sm-12 mb-3">
                                    <label htmlFor="alamat_langsir" className="form-label">Proses</label>
                                    <button type="submit" className="btn btn-primary w-100">SIMPAN PERUBAHAN</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
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
