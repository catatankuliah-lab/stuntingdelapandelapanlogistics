import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';

const AddPage = ({ handlePageChange }) => {
    const [detailId, setDetailId] = useState('');
    const [alokasiOption, setAlokasiOption] = useState([]);
    const [selectedAlokasi, setSelectedAlokasi] = useState(null);
    const [woOption, setWOOption] = useState([]);
    const [selectedWO, setSelectedWO] = useState(null);
    const [itemWOOption, setItemWOOption] = useState({ item_wo_by_wo_2408: [] });
    let nomor = 1;
    let id = 1;


    useEffect(() => {
        const fetchAlokasiOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/alokasi/all');
                const options = response.data.map(alokasi => ({
                    value: alokasi.id_alokasi,
                    label: `${alokasi.bulan_alokasi} ${alokasi.tahun_alokasi}`
                }));
                setAlokasiOption(options);
            } catch (error) {
                console.error('Error fetching Alokasi options:', error);
            }
        };
        fetchAlokasiOptions();
    }, []);

    useEffect(() => {
        if (detailId !== '') {
            console.log(detailId);
            handlePageChange('detail', detailId);
        }
    }, [detailId, handlePageChange]);


    const handleAlokasiChange = (selectedOption) => {
        setSelectedAlokasi(selectedOption);
        const fetchWOOptions = async () => {
            try {
                const response = await fetch('http://localhost:5050/api/wo2408/all');
                const data = await response.json();
                console.log(data);
                const options = data.map(wo => ({
                    value: wo.id_wo,
                    label: `${wo.nomor_wo}`
                }));
                setWOOption(options);
            } catch (error) {
                console.error('Error fetching WO options:', error);
            }
        };
        fetchWOOptions();
    };

    const handleWOChange = (selectedOption) => {
        setSelectedWO(selectedOption);
        const fetchItemWO = async () => {
            try {
                const response = await fetch(`http://localhost:5050/api/wo2408/details/${selectedOption.value}`);
                const data = await response.json();
                setItemWOOption(data);
            } catch (error) {
                console.error('Error fetching WO options:', error);
            }
        };
        fetchItemWO();
    };

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
        event.preventDefault();
        if (selectedWO == null) {
            console.log("KOSONG");
        } else {
            const dataToSubmit = {
                ...formData,
                id_wo: selectedWO.value,
                nomor_lo: 'LO-88LOGSTNG-A1-' + selectedAlokasi.value + '24-1',
                qr_lo: 'LO-88LOGSTNG-A1-' + selectedAlokasi.value + '24-1',
                status_lo: "SEDANG DIBUAT",
                jenis_muatan: "AYAM",
            };
            console.log(dataToSubmit);
            try {
                await axios.post('http://localhost:5050/api/lo2408/add', dataToSubmit);
                console.log('Data submitted successfully');
                try {
                    const response = await fetch(`http://localhost:5050/api/lo2408/getlastbyidadminkancabayam/1`, dataToSubmit);
                    const data = await response.json();
                    console.log('Data submitted successfully');
                    setDetailId(data.id_lo);
                } catch (error) {
                    console.error('Error submitting data:', error);
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
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
};

export default AddPage;