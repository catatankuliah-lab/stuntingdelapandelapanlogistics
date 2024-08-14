import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Select from 'react-select';


const DetailPage = ({ handlePageChange, detailId, idAlokasiPenyaluran }) => {
    const [selectedAlokasi, setSelectedAlokasi] = useState(null);
    const [alokasiOption, setAlokasiOption] = useState([]);
    const [LO, setLO] = useState([]);
    const [desaOption, setDesaOption] = useState([]);
    const [formData, setFormData] = useState({
    });
    let nomor = 1;

    useEffect(() => {
        const fetchBahanLO = async () => {
            let nama_tabel_lo = "lo2408";
            try {
                const response = await axios.get(`http://localhost:5050/api/${nama_tabel_lo}/detail/${detailId}`);
                setLO(response.data.result);
                const desaOptions = response.data.result.wo_details.items.map((desa, index) => ({
                    no: index + 1,
                    id_item_wo: desa.id_item_wo,
                    nama_kabupaten_kota: desa.nama_kabupaten_kota,
                    nama_kecamatan: desa.nama_kecamatan,
                    nama_desa_kelurahan: desa.nama_desa_kelurahan,
                    jumlah_paket_desa_kelurahan: desa.jumlah_paket_desa_kelurahan
                }));
                console.log(response.data.result);
                setDesaOption(desaOptions);
            } catch (error) {
                console.error('Error fetching Alokasi options:', error);
            }
        };
        fetchBahanLO();
    }, [detailId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSaveTonase = async (desaId, jumlah) => {
        console.log({
            desaId, jumlah
        });
        // const dataToSend = {
        //     jumlah_paket_desa_kelurahan: jumlah,
        //     id_wo: formData.id_wo,
        //     id_desa_kelurahan: desaId,
        // }
        // try {
        //     await axios.post('http://localhost:5050/api/itemwo2408/add', dataToSend);
        //     console.log('Data submitted successfully');
        //     const dataUpdate = {
        //         jumlah_alokasi_desa_sisa: 0,
        //     }
        //     try {
        //         await axios.put(`http://localhost:5050/api/desa2408/update/${desaId}`, dataUpdate);
        //         console.log('Data submitted successfully');
        //     } catch (error) {
        //         console.error('Error submitting data:', error);
        //     }
        // } catch (error) {
        //     console.error('Error submitting data:', error);
        // }
        // await fetchWO();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="mb-3">
                    <div className="divider text-start fw-bold">
                        <div className="divider-text">
                            <span className="menu-header-text fs-6">Detail Data Loading Order (LO)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="">
                    Klik <button className="fw-bold btn btn-link p-0" onClick={() => handlePageChange('index')}>disini</button> untuk kembali ke menu utama Loading Order (LO).
                </div>
            </div>
            <div className="col-md-12 mt-3">
                <form id="form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="tanggal_lo" className="form-label">Tanggal Loading Order (LO)</label>
                            <input className="form-control text-uppercase" type="date" id="tanggal_lo" name='tanggal_lo' placeholder="Tanggal WO" onChange={handleChange} value={LO?.tanggal_lo || ""} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="nomor_mobil" className="form-label">Nopol Mobil</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_mobil" name='nomor_mobil' placeholder="Nopol Mobil" onChange={handleChange} value={LO?.nomor_mobil || ""} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="nama_driver" className="form-label">Nama Driver</label>
                            <input className="form-control text-uppercase" type="text" id="nama_driver" name='nama_driver' placeholder="Nama Driver" onChange={handleChange} value={LO?.nama_driver || ""} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="nomor_driver" className="form-label">Nomor Telpon Driver</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_driver" name='nomor_driver' placeholder="Nomor Telpon Driver" onChange={handleChange} value={LO?.nomor_driver || ""} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="alokasi_penyaluran" className="form-label">Alokasi</label>
                            <input className="form-control text-uppercase" type="text" id="alokasi_penyaluran" name='alokasi_penyaluran' placeholder="BULAN TAHUN" value={idAlokasiPenyaluran.label} required readOnly />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="nomor_wo" className="form-label">Nomor WO</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_wo" name='nomor_wo' placeholder="Nomor WO" onChange={handleChange} value={LO.wo_details?.nomor_wo || ""} required />
                        </div>
                        <div className="col-md-12 mb-4 mb-md-0 mt-3">
                            <div className='table-responsive text-nowrap'>
                                <table className="table" style={{ fontSize: "13px" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "5px" }} >No</th>
                                            <th>Kabupaten/Kota</th>
                                            <th>Kecamatan</th>
                                            <th>Desa/Kelurahan</th>
                                            <th>Paket</th>
                                            <th>Titik Bagi</th>
                                            <th>Jam Pembagian</th>
                                            <th style={{ width: "5px" }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {desaOption.map(desa => (
                                            <tr key={desa.id_item_wo}>
                                                <td>{desa.no}</td>
                                                <td>{desa.nama_kabupaten_kota}</td>
                                                <td>{desa.nama_kecamatan}</td>
                                                <td>{desa.nama_desa_kelurahan}</td>
                                                <td>{desa.jumlah_paket_desa_kelurahan}</td>
                                                <td>
                                                    <input className="form-control text-uppercase" type="text" id="titik_bagi" name='titik_bagi' placeholder="TITIK BAGI" onChange={handleChange} required />
                                                </td>
                                                <td>
                                                    <input className="form-control text-uppercase" type="text" id="waktu_bagi" name='waktu_bagi' placeholder="00 S/D 00" onChange={handleChange} required />
                                                </td>
                                                <td>
                                                    <button className="btn btn-link text-start" type="button" id="button-addon2" onClick={() => handleSaveTonase(desa.id_item_wo, desa.jumlah_paket_desa_kelurahan)}>  <i className="tf-icons bx bx-plus-circle me-2"></i> Tambah</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 mt-2">
                            <button type="submit" className="btn btn-primary w-100">SIMPAN</button>
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
