const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', upload.array('images'),  (req, res) => {
    console.log(req.body)
    console.log(req.files)
    res.send('Hello World!');
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})