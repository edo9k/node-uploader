const express = require('express'),
      app = express(),
      multer = require('multer')

const upload = multer({ dest: 'upload/' })

app.use(express.static('public'))

app.post('/file/upload', upload.single('file'),
  (req, res) => res.send('<h2>Upload uploaded com sucesso.</h2>'))

app.listen(3000, () => console.log('Rodando em localhost:3k'))
