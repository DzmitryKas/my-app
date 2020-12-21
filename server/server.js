const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const config = require('./config/config');
const app = express();
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || config.serverPort;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(compression());
app.use(cors({origin: 'http://localhost:3000'}));
app.use(fileUpload({}));

const start = async () => {
  try {
      await mongoose.connect(config.url, {
          useNewUrlParser:true,
          useUnifiedTopology:true,
          useCreateIndex: true
      })

      require('./app/routes')(app);
      app.listen(PORT, () => {
          console.log('Server started on port ', PORT)
      })
  } catch (e) {
      console.log(e)
  }
}

start()




