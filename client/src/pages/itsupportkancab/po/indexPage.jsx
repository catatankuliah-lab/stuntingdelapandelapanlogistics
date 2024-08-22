import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';
import axios from 'axios';
import Select from 'react-select';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const IndexLOPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
    const [alokasiOption, setAlokasiOption] = useState([]);
    const [selectedAlokasi, setSelectedAlokasi] = useState(null);
    const [LO, setLO] = useState([]);

    const handlePageChange = (page, id = null, alokasi = null) => {
        setCurrentView(page);
        if (id !== null) {
            setDetailId(id);
        } else if (alokasi !== null) {
            selectedAlokasi(alokasi);
        }
    };

    const handleAdd = () => {
        setCurrentView('add');
    };

    const handleEditDataClick = (id) => {
        setDetailId(id);
        setCurrentView('detail');
    };

    const handleDeleteDataClick = async (id) => {
        try {
            await axios.get(`http://localhost:5050/api/wo2408/delete/${id}`);
            console.log('WO deleted successfully');
        } catch (error) {
            console.error('Error deleting WO:', error);
        }
        await fetchLO();
    };

    const handleBackClick = () => {
        setCurrentView('index');
        fetchLO();
    };

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

    const handleAlokasiChange = (selectedOption) => {
        setSelectedAlokasi(selectedOption);
        fetchLO();
    };


    const fetchLO = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/lo2408/getallbyidadminkancabayam/1');
            const data = await response.json();
            console.log(data);
            setLO(data);
        } catch (error) {
            console.error('Error fetching data:', error);
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
                                    <span className="menu-header-text fs-6 fw-bold">Data Purchase Order (PO)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="">
                            Klik <button className="fw-bold btn btn-link p-0" onClick={() => handlePageChange('add', '1', '1')}>disini</button> untuk menambahkan data Purchase Order (PO).
                        </div>
                    </div>
                    <div className="col-lg-12 mt-3">
                        <div className="row">
                            <div className="col-md-4 col-sm-12 col-sm-6 mb-3">
                                <label htmlFor="id_alokasi" className="form-label">Alokasi</label>
                                <Select
                                    id="id_alokasi"
                                    name="id_alokasi"
                                    value={selectedAlokasi}
                                    onChange={handleAlokasiChange}
                                    options={alokasiOption}
                                    placeholder="Pilih Alokasi"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="accordion mt-3" id="accordion_wo">
                            {LO.map(lo => (
                                <div key={lo.id_lo} className="card accordion-item">
                                    <h2 className="accordion-header px-2" id={`heading${lo.id_lo}`}>
                                        <button type="button" className="accordion-button accordion-button-primary collapsed text-primary" data-bs-toggle="collapse" data-bs-target={`#accordion${lo.id_lo}`} aria-expanded="false" aria-controls={`accordion${lo.id_lo}`}>
                                            {lo.tanggal_lo} | {lo.nomor_lo}
                                        </button>
                                    </h2>
                                    <div id={`accordion${lo.id_lo}`} className="accordion-collapse collapse" data-bs-parent="#accordion_lo">
                                        <div className="accordion-body" style={{ marginTop: "-15px" }} >
                                            <div className="px-2">
                                                <hr />
                                                <div className="col-md-12 col-sm-12 mt-0 mt-md-3">
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {lo.tanggal_lo.slice(0, 10)}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {/* {lo.gudang.kantor_cabang.nama_kantor_cabang} */}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {/* GUDANG : {lo.gudang.nama_gudang} */}
                                                    </p>
                                                    <button className="btn btn-link p-0" onClick={() => handleEditDataClick(lo.id_lo)}>
                                                        <i className="tf-icons bx bx-edit me-2"></i> DETAIL
                                                    </button>
                                                    <button className="btn btn-link text-danger p-0 ms-3" onClick={() => handleDeleteDataClick(lo.id_lo)}>
                                                        <i className="tf-icons bx bx-message-square-x me-2"></i> DELETE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <div className="col-md-12 mb-4 mb-md-0">
                        <iframe id="pdf-preview" width="100%" height="1200px"></iframe>
                    </div> */}
                </div>
            )}
            {currentView === 'add' && <AddPage handlePageChange={handlePageChange} />}
            {currentView === 'detail' && <DetailPage handlePageChange={handlePageChange} detailId={detailId} idAlokasiPenyaluran={selectedAlokasi} />}
        </div>
    );
};

export default IndexLOPage;