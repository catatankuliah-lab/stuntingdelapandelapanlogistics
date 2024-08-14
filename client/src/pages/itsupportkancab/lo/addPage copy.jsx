import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';

const AddPage = ({ currentView, handleBackClick, refreshData }) => {

    const [provinsiOption, setProvinsiOption] = useState([]);
    const [selectedProvinsi, setSelectedProvinsi] = useState('');
    const [kabupatenOption, setKabupatenOption] = useState([]);
    const [selectedKabupaten, setSelectedKabupaten] = useState('');
    const [kecamatanOption, setKecamatanOption] = useState([]);
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [desaOption, setDesaOption] = useState([]);
    const [selectedDesa, setSelectedDesa] = useState('');
    const [alokasiOption, setAlokasiOption] = useState([]);
    const [selectedAlokasi, setSelectedAlokasi] = useState('');

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
        const fetchProvinsiOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/provinsi/all');
                const options = response.data.map(provinsi => ({
                    value: provinsi.id_provinsi,
                    label: provinsi.nama_provinsi
                }));
                setProvinsiOption(options);
            } catch (error) {
                console.error('Error fetching Provinsi options:', error);
            }
        };
        fetchProvinsiOptions();
    }, []);

    useEffect(() => {
        const fetchKabupatenOptions = async (provinsiId) => {
            try {
                const response = await axios.get(`http://localhost:5050/api/provinsi/details/${provinsiId}`);
                const options = response.data.kabupaten_by_provinsi.map(kabupaten => ({
                    value: kabupaten.id_kabupaten_kota,
                    label: kabupaten.nama_kabupaten_kota
                }));
                setKabupatenOption(options);
            } catch (error) {
                console.error('Error fetching Kabupaten options:', error);
            }
        };

        if (selectedProvinsi) {
            fetchKabupatenOptions(selectedProvinsi.value);
        } else {
            setKabupatenOption([]);
        }
    }, [selectedProvinsi]);

    useEffect(() => {
        const fetchKecamatanOptions = async (kabupatenId) => {
            try {
                const response = await axios.get(`http://localhost:5050/api/kabupaten/details/${kabupatenId}`);
                setKecamatanOption(response.data.kecamatan_by_kabupaten);
            } catch (error) {
                console.error('Error fetching Kecamatan options:', error);
            }
        };

        if (selectedKabupaten) {
            fetchKecamatanOptions(selectedKabupaten);
        }
    }, [selectedKabupaten]);

    useEffect(() => {
        const fetchDesaOptions = async (kecamatanId) => {
            try {
                const response = await axios.get(`http://localhost:5050/api/kecamatan/details/${kecamatanId}`);
                setDesaOption(response.data.desa_kelurahan_by_kecamatan);
            } catch (error) {
                console.error('Error fetching Desa options:', error);
            }
        };

        if (selectedKecamatan) {
            fetchDesaOptions(selectedKecamatan);
        }
    }, [selectedKecamatan]);


    const handleAlokasiChange = (selectedOption) => {
        console.log(selectedOption);
        setSelectedAlokasi(selectedOption);
    };

    const handleProvinsiChange = (selectedOption) => {
        console.log(selectedOption);
        setSelectedProvinsi(selectedOption);
        setSelectedKabupaten('');
        setSelectedKecamatan('');
        setSelectedDesa('');
        setDesaOption([]);
    };

    const handleKabupatenChange = (selectedOption) => {
        setSelectedKabupaten(selectedOption);
        setSelectedKecamatan('');
        setSelectedDesa('');
        setDesaOption([]);
    };

    const handleKecamatanChange = (event) => {
        setSelectedKecamatan(event.target.value);
        setSelectedDesa('');
    };

    const handleDesaChange = (event) => {
        setSelectedDesa(event.target.value);
    };

    const handleSubmit = () => {
        console.log("CEK");
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
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="id_provinsi" className="form-label">Provinsi</label>
                            <Select
                                id="id_provinsi"
                                name="id_provinsi"
                                value={selectedProvinsi}
                                onChange={handleProvinsiChange}
                                options={provinsiOption}
                                isClearable
                                placeholder="Pilih Provinsi"
                            />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="id_kabupaten" className="form-label">Kabupaten</label>
                            <Select
                                id="id_kabupaten"
                                name="id_kabupaten"
                                value={selectedKabupaten}
                                onChange={handleKabupatenChange}
                                options={kabupatenOption}
                                isClearable
                                placeholder="Pilih Kabupaten/Kota"
                            />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="id_kecamatan" className="form-label">Kecamatan</label>
                            <select className="form-control" id="id_kecamatan" name="id_kecamatan" value={selectedKecamatan} onChange={handleKecamatanChange} required>
                                <option value="">Pilih Kecamatan</option>
                                {kecamatanOption.map((kecamatan) => (
                                    <option key={kecamatan.id_kecamatan} value={kecamatan.id_kecamatan}>{kecamatan.nama_kecamatan}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="nomor_wo" className="form-label">Nomor Working Order (WO)</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_wo" name='nomor_wo' placeholder="Nomor Working Order" onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mt-2">
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