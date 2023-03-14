const express = require('express');
const shortid = require('shortid');
const fs = require('fs');

const DATA_FILE = 'urls.json';

const app = express();

app.use(express.json());

// Middleware to loggining requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Endpoint to create a shortened URL
app.post('/api/shorten', (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL cannot be empty' });
    }
    const id = shortid.generate();
    const urlObj = { id, url };
    const urls = readUrls();
    urls.push(urlObj);
    writeUrls(urls);
    console.log(`Created shortened URL: ${JSON.stringify(urlObj)}`);
    res.json(urlObj);
});

// Endpoint to get the original URL
app.get('/api/shortened/:id', (req, res) => {
    const { id } = req.params;
    const urls = readUrls();
    const urlObj = urls.find(u => u.id === id);
    if (!urlObj) {
        return res.status(404).json({ error: 'URL not found' });
    }
    console.log(`Returning shortened URL: ${JSON.stringify(urlObj)}`);
    res.json(urlObj);
});

// Helper functions to read and write the JSON file
function readUrls() {
    try {
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function writeUrls(urls) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(urls));
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Port: ${port}`));
