import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';

const AddPage = ({ currentView, handleBackClick, refreshData }) => {

    const [alokasiOption, setAlokasiOption] = useState([]);
    const [selectedAlokasi, setSelectedAlokasi] = useState(null);
    const [gudangOption, setGudangOption] = useState([]);
    const [selectedGudang, setSelectedGudang] = useState(null);

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
        const fetchGudangOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/gudang/all');
                const options = response.data.map(gudang => ({
                    value: gudang.id_gudang,
                    label: `${gudang.nama_gudang}`
                }));
                setGudangOption(options);
            } catch (error) {
                console.error('Error fetching Gudang options:', error);
            }
        };
        fetchGudangOptions();
    }, []);

    const handleAlokasiChange = (selectedOption) => {
        setSelectedAlokasi(selectedOption);
    };

    const handleGudangChange = (selectedOption) => {
        setSelectedGudang(selectedOption);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [formData, setFormData] = useState({
        tanggal_wo: '',
        nomor_wo: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSubmit = {
            ...formData,
            id_admin_kancab: 1,
            qr_wo: formData.nomor_wo.replace(/[ ,./]/g, ''),
            status_wo: "BELUM TERSALURKAN",
            id_alokasi: selectedAlokasi ? selectedAlokasi.value : null,
            id_gudang: selectedGudang ? selectedGudang.value : null
        };
        console.log(dataToSubmit);
        try {
            await axios.post('http://localhost:5050/api/wo2408/add', dataToSubmit);
            console.log('Data submitted successfully');
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
                            <span className="menu-header-text fs-6">Tambah Data Working Order (WO)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="">
                    Klik <button className="fw-bold btn btn-link p-0" onClick={handleBackClick}>disini</button> untuk kembali ke menu utama Working Order (WO).
                </div>
            </div>
            <div className="col-md-12 mt-3">
                <form id="form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="tanggal_wo" className="form-label">Tanggal Working Order (WO)</label>
                            <input className="form-control text-uppercase" type="date" id="tanggal_wo" name='tanggal_wo' placeholder="Tanggal WO" onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="nomor_wo" className="form-label">Nomor Working Order (WO)</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_wo" name='nomor_wo' placeholder="Nomor Working Order" onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="id_alokasi" className="form-label">Alokasi</label>
                            <Select
                                id="id_alokasi"
                                name="id_alokasi"
                                value={selectedAlokasi}
                                onChange={handleAlokasiChange}
                                options={alokasiOption}
                                isClearable
                                placeholder="Pilih Alokasi"
                            />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3 d-none">
                            <label htmlFor="id_gudang" className="form-label">Gudang</label>
                            <Select
                                id="id_gudang"
                                name="id_gudang"
                                value={selectedGudang}
                                onChange={handleGudangChange}
                                options={gudangOption}
                                isClearable
                                placeholder="Pilih Gudang"
                            />
                        </div>
                        <div className="col-md-12 col-sm-12 mt-2">
                            <button type="submit" className="btn btn-primary w-100">Simpan</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

AddPage.propTypes = {
    currentView: PropTypes.string.isRequired,
    handleBackClick: PropTypes.func.isRequired,
    refreshData: PropTypes.func.isRequired
};

export default AddPage;