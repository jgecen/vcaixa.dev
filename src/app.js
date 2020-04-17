const bodyParser = require('body-parser')
const app = require('express')();
app.use(bodyParser.json())


app.get('/', (req, res) => res.send('API v.caixa'))

app.listen(3000, () => {
    console.log('API v.caixa ouvindo a porta 3000')
}) 