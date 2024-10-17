const express = require("express");
const {google} = require("googleapis");
const bodyParser = require("body-parser");
const session = require("express-session");
const fs = require("fs");
const path = require("path");
const {exec} = require("child_process");
const moment = require("moment");
const app = express();
const passport = require("passport");
const flash = require("express-flash");
const methodOverride = require("method-override");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static(path.join(__dirname, "public")));


app.use(
  session({
    secret: "rahasia", 
    resave: false,
    saveUninitialized: true,
  })
);


app.get("/css/bootstrap.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "bootstrap.css"));
});
app.get("/css/bootstrap.min.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "bootstrap.min.css"));
});
app.get("/css/ruang-admin.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ruang-admin.css"));
});
app.get("/css/ruang-admin.min.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ruang-admin.min.css"));
});
app.get("/css/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "styles.css"));
});

// Fungsi untuk mendapatkan credentials login dari environment variables
const getLoginCredentials = () => ({
  username: process.env.USER_USERNAME,
  password: process.env.USER_PASSWORD,
});

// Endpoint untuk login
app.post("/login", (req, res) => {
  const {
    username,
    password
  } = req.body;

  const credentials = getLoginCredentials();

  if (username === credentials.username && password === credentials.password) {
    req.session.loggedIn = true;
    req.session.cookie.maxAge = 3600000; 
    res.redirect("/"); 
  } else {
    
    res.redirect("/login.html?error=true"); 
  }
});

function requireLogin(req, res, next) {
  if (req.session.loggedIn && req.session.cookie.maxAge > 0) {
    next(); 
  } else {
    res.redirect("/login.html");
  }
}


app.get("/", requireLogin, (req, res) => {
  
  if (req.session.loggedIn && req.session.cookie.maxAge > 0) {
    res.sendFile(path.join(__dirname, "views", "indie.html")); 
  } else {
    res.redirect("/login.html"); 
  }
});

app.get("/tugas:jumlahOrang",  (req, res) => {
  const jumlahOrang = req.params.jumlahOrang;
  const filePath = path.join(__dirname, `views/tugas${jumlahOrang}.html`);


  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Failed to load file.");
    } else {
      res.send(data);
    }
  });
});

const getGCPCredentials = () => {

  return process.env.GCP_PRIVATE_KEY ?
    {
      client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, "\n"), 
    } : 
    {};
};

// ENDPOINT AUTOCOMPLETE
app.get("/getAutocompleteOptions", async (req, res) => {
  try {
    const {
      term
    } = req.query; 

    const auth = new google.auth.GoogleAuth({
      credentials: getGCPCredentials(),
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({
      version: "v4",
      auth,
    });

    const spreadsheetId = "";

    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: `Daftar Pegawai KPP Bangko!B2:E`,
    });

    const values = response.data.values;

    if (values.length) {
      
      const filteredOptions = values.filter((row) =>
        row[0].toLowerCase().includes(term.toLowerCase())
      );

      const autocompleteOptions = filteredOptions.map((row) => ({
        label: row[0], 
        value: row[0], 
        nip: row[1], 
        pangkat: row[2], 
        jabatan: row[3], 
      }));

      res.json(autocompleteOptions);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to get autocomplete options.");
  }
});


app.post("/sendtosheets", async (req, res) => {
  const {
    nama,
    nip,
    pangkat,
    jabatan,
    nama2,
    nip2,
    pangkat2,
    jabatan2,
    nama3,
    nip3,
    pangkat3,
    jabatan3,
    nama4,
    nip4,
    pangkat4,
    jabatan4,
    nama5,
    nip5,
    pangkat5,
    jabatan5,
    nama6,
    nip6,
    pangkat6,
    jabatan6,
    harimulai,
    hariselesai,
    waktuDari,
    waktuSampai,
    lama,
    alamat,
    tempat,
    agenda,
  } = req.body;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: getGCPCredentials(),
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({
      version: "v4",
      auth,
    });

    const spreadsheetId = "";
    let row = new Array(31).fill("");
    const tanggalKirim = req.body.tanggalKirim;
    

    // Menempatkan data sesuai dengan indeks yang ditargetkan
    row[1] = nama;
    row[2] = nip;
    row[3] = pangkat;
    row[4] = jabatan;
    row[5] = nama2;
    row[6] = nip2;
    row[7] = pangkat2;
    row[8] = jabatan2;
    row[9] = nama3;
    row[10] = nip3;
    row[11] = pangkat3;
    row[12] = jabatan3;
    row[13] = nama4;
    row[14] = nip4;
    row[15] = pangkat4;
    row[16] = jabatan4;
    row[17] = nama5;
    row[18] = nip5;
    row[19] = pangkat5;
    row[20] = jabatan5;
    row[21] = nama6;
    row[22] = nip6;
    row[23] = pangkat6;
    row[24] = jabatan6;
    row[25] = harimulai;
    row[26] = hariselesai;
    row[27] = waktuDari;
    row[28] = waktuSampai;
    row[29] = lama;
    row[30] = alamat;
    row[31] = tempat;
    row[32] = agenda;
    row[33] = tanggalKirim;
    row[42] = "belum diproses";

    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:AH",
      valueInputOption: "RAW",
      resource: {
        values: [row], 
      },
    });

    res.send("Successfully submitted! Thank you!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to submit to Google Sheets.");
  }
});

function parseCustomDate(dateString) {
  const months = {
    'Januari': '01',
    'Februari': '02',
    'Maret': '03',
    'April': '04',
    'Mei': '05',
    'Juni': '06',
    'Juli': '07',
    'Agustus': '08',
    'September': '09',
    'Oktober': '10',
    'November': '11',
    'Desember': '12'
  };

  const parts = dateString.split(', ');
  if (parts.length !== 2) return null; 

  const day = parts[0]; 
  const date = parts[1].split(' '); 
  if (date.length !== 3) return null; 

  const month = months[date[1]]; 
  const year = date[2]; 

  const formattedDate = `${year}-${month}-${date[0]}`;
  return formattedDate;
}




app.post("/checkDates", async (req, res) => {
  const {
    harimulai,
    hariselesai,
    tempat
  } = req.body;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: getGCPCredentials(),
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({
      version: "v4",
      auth: client,
    });
    const spreadsheetId = "";

   
    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!B:AI",
    });

    const values = response.data.values;
    
    const formattedStart = parseCustomDate(harimulai);
    const formattedEnd = parseCustomDate(hariselesai);

    if (!formattedStart || !formattedEnd) {
      throw new Error("Format tanggal tidak valid.");
    }

    let overlappingData = [];
    

   
    const availableCars = [
      "BH 8626 F (TRITON)",
      "BH 1050 F (ERTIGA)",
      "BH 1049 F (ERTIGA)",
      "BH 1039 F (XPANDER)",
      "BH 1036 F (XPANDER)",
      "BH 1040 F (XPANDER)",
    ];

    values.forEach((row) => {
      const name = row[0];

  const tanggal = row[24];
      const mobildinas = row[33];
      const startDate = moment(row[24], "YYYY-MM-DD").format("YYYY-MM-DD");
      const endDate = moment(row[25], "YYYY-MM-DD").format("YYYY-MM-DD");
      const location = row[30].toLowerCase();

      if (
        tempat.toLowerCase() === location &&
        formattedStart <= endDate &&
        formattedEnd >= startDate
      ) {
        overlappingData.push({
          name,
          location,
          startDate,
          endDate,
          mobildinas,
        });
      }
      if (formattedStart <= endDate && formattedEnd >= startDate) {
        const index = availableCars.indexOf(mobildinas);
        if (index !== -1) {
          availableCars.splice(index, 1); 
        }
      }
    });

   
    res.json({
      overlapping: overlappingData.length > 0,
      overlappingData,
      availableCars,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Failed to check dates.");
  }
});


const port = 2031;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
