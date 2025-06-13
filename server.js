const express = require('express');
const bodyParser = require('body-parser');
const zlib = require('zlib');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/compress', (req, res) => {
  const input = req.body.inputString;

  if (!input) {
    return res.send('Please enter a string to compress.');
  }

  const buffer = Buffer.from(input, 'utf-8');
  zlib.gzip(buffer, (err, result) => {
    if (err) {
      return res.send('Compression failed.');
    }

    const base64Compressed = result.toString('base64');
    res.send(`
      <h1>Compression Result</h1>
      <p><strong>Original:</strong> ${input}</p>
      <p><strong>Compressed (base64):</strong></p>
      <textarea rows="5" cols="60" readonly>${base64Compressed}</textarea>
      <br><br><a href="/">Try another</a>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
