const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      multer = require('multer'),
      path = require('path'),
      fs = require('fs')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/')
  },
  filename: function (req, file, cb) {

    // salvando com a mesma extensão
    /* console.log(`
    ---
    ${file}
    ---
    ${req}
    ---
    `); */

    cb(null, `${Date.now()}-${file.originalname}`)
  }
})


//const upload = multer({ dest: 'upload/' })
const upload = multer({ storage })

const trashFiles = (req, res, next) => {
  fs.readdir('upload/', (err, files) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join('upload/', file), err => {
        if (err) throw err;
      })
    }
  })

  next()
}

app.use(express.static('public'))

app.post('/file/upload', upload.single('file'),
  (req, res) => res.send('<h2>Arquivo enviado com sucesso.</h2>'))

app.get('/trash', trashFiles,
  (req, res) => res.send(`<h2>Arquivos apagados.</h2> <sub>@${ new Date() }</sub>`))


app.get('/file/list', 
  (req, res) => res.send('meh'))

app.listen(3000, () => console.log('Rodando em localhost:3k'))
