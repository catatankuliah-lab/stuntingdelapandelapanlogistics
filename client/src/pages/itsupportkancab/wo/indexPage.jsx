import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';
import axios from 'axios';
import Select from 'react-select';

const IndexWoPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
    const [alokasiOption, setAlokasiOption] = useState([]);
    const [selectedAlokasi, setSelectedAlokasi] = useState(null);
    const [WO, setWO] = useState([]);

    const handleAddMobilClick = () => {
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
        await fetchWO();
    };

    const handleBackClick = () => {
        setCurrentView('index');
        fetchWO();
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
        console.log(selectedOption.value);
        fetchWO();
    };


    const fetchWO = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/wo2408/all');
            const data = await response.json();
            console.log(data);
            setWO(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            {currentView === 'index' && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6 fw-bold">Data Working Order (WO)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="">
                            Klik <button className="fw-bold btn btn-link p-0" onClick={handleAddMobilClick}>disini</button> untuk menambahkan data working Order (WO).
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
                            {WO.map(wo => (
                                <div key={wo.id_wo} className="card accordion-item">
                                    <h2 className="accordion-header px-2" id={`heading${wo.id_wo}`}>
                                        <button type="button" className="accordion-button accordion-button-primary collapsed text-primary" data-bs-toggle="collapse" data-bs-target={`#accordion${wo.id_wo}`} aria-expanded="false" aria-controls={`accordion${wo.id_wo}`}>
                                            {wo.tanggal_wo} | {wo.nomor_wo}
                                        </button>
                                    </h2>
                                    <div id={`accordion${wo.id_wo}`} className="accordion-collapse collapse" data-bs-parent="#accordion_wo">
                                        <div className="accordion-body" style={{ marginTop: "-15px" }} >
                                            <div className="px-2">
                                                <hr />
                                                <div className="col-md-12 col-sm-12 mt-0 mt-md-3">
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {wo.tanggal_wo.slice(0, 10)}
                                                    </p>
                                                    <button className="btn btn-link p-0" onClick={() => handleEditDataClick(wo.id_wo)}>
                                                        <i className="tf-icons bx bx-edit me-2"></i> DETAIL
                                                    </button>
                                                    <button className="btn btn-link text-danger p-0 ms-3" onClick={() => handleDeleteDataClick(wo.id_wo)}>
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
                </div>
            )}
            {currentView === 'add' && <AddPage currentView={currentView} handleBackClick={handleBackClick} refreshData={fetchWO} />}
            {currentView === 'detail' && detailId && <DetailPage id={detailId} handleBackClick={handleBackClick} refreshData={fetchWO} />}
        </>
    );
};

export default IndexWoPage;