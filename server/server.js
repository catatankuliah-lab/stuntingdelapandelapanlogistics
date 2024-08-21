const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const { sequelize, connectDB } = require('./config/database');

const userRoutes = require('./routes/userRoutes');
const alokasiRoutes = require('./routes/alokasiRoutes');
const provinsiRoutes = require('./routes/provinsiRoutes');
const kabupatenRoutes = require('./routes/kabupatenRoutes');
const kecamatanRoutes = require('./routes/kecamatanRoutes');
const desa2408Routes = require('./routes/desa2408Routes');
const hakAksesRoutes = require('./routes/hakAksesRoutes');
const adminKancabRoutes = require('./routes/adminKancabRoutes');
const kantorCabangRoutes = require('./routes/kantorCabangRoutes');
const gudangRoutes = require('./routes/gudangRoutes');
const jenisMobilRoutes = require('./routes/jenisMobilRoutes');
const vendorArmadaRoutes = require('./routes/vendorArmadaRoutes');
const armadaRoutes = require('./routes/armadaRoutes');
const wo2408Routes = require('./routes/wo2408Routes');
const lo2408Routes = require('./routes/lo2408Routes');
const sjt2408Routes = require('./routes/sjt2408Routes');
const itemWo2408Routes = require('./routes/itemWo2408Routes');

const app = express();
const PORT = 5050;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  "/uploads/mobil",
  express.static(path.join(__dirname, "uploads/mobil"))
);

// Menggunakan routes
app.use('/api/alokasi', alokasiRoutes);
app.use('/api/provinsi', provinsiRoutes);
app.use('/api/kabupaten', kabupatenRoutes);
app.use('/api/kecamatan', kecamatanRoutes);
app.use('/api/desa2408', desa2408Routes);
app.use('/api/hakakses', hakAksesRoutes);
app.use('/api/user', userRoutes);
app.use('/api/adminkancab', adminKancabRoutes);
app.use('/api/kantorcabang', kantorCabangRoutes);
app.use('/api/gudang', gudangRoutes);
app.use('/api/jenismobil', jenisMobilRoutes);
app.use('/api/vendorarmada', vendorArmadaRoutes);
app.use('/api/armada', armadaRoutes);
app.use('/api/wo2408', wo2408Routes);
app.use('/api/lo2408', lo2408Routes);
app.use('/api/sjt2408', sjt2408Routes);
app.use('/api/itemwo2408', itemWo2408Routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
