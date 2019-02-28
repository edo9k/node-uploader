const express = require('express'),
      app = express(),
      multer = require('multer'),
      path = require('path'),
      fs = require('fs')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {

    // salvando com a mesma extensão
    cb(null, `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`)

    //salvando com o mesmo nome
    //cb(null, file.originalname)
    
  }
})


//const upload = multer({ dest: 'upload/' })
const upload = multer({ storage });

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
  (req, res) => res.send('<h2>Upload uploaded com sucesso.</h2>'))

app.get('/trash', trashFiles,
  (req, res) => res.send(`<h2>Arquivos deveriam ter sido apagados. (@${Date.now()})</h2>`))

app.get('/file/list', 
  (req, res) => res.send('meh'))

app.get('/wot', (req, res) => res.send(`
      <h2>Upload simples com JS+Node+Express+Multer</h2>
      <ul>
        <li> <a href="/file/upload"> Faz um upload de arquivo. </a> </li>
        <li> <a href="/file/list"> Lista arquivos em ./upload/ </a> </li>
        <li> <a href="/trash"> Apaga os arquivos da pasta ./upload/ </a> </li>
      </ul>
    `))


app.listen(3000, () => console.log('Rodando em localhost:3k'))
