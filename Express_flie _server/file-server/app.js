const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

const BASE_DIR = __dirname;

// --- File Paths ---
const LOG_FILE_PATH = path.join(BASE_DIR, 'logs', 'server.log');
const PAGES_DIR = path.join(BASE_DIR, 'pages');

if (!fs.existsSync(path.join(BASE_DIR, 'logs'))) {
    fs.mkdirSync(path.join(BASE_DIR, 'logs'));
}


/**

 * @param {string} url 
 */
function logRequest(url) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] Requested URL: ${url}\n`;

    try {
        fs.appendFileSync(LOG_FILE_PATH, logEntry);
    } catch (err) {
        console.error(`Error logging request to ${LOG_FILE_PATH}:`, err.message);
    }
}

/**

 * @param {string} filePath - The absolute path to the file to serve.
 * @param {number} statusCode - The HTTP status code (e.g., 200, 404).
 * @param {http.ServerResponse} res - The response object.
 * @param {string} contentType - The MIME type for the response header.
 */
function serveFile(filePath, statusCode, res, contentType = 'text/html') {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            
            console.error(`Error reading file ${filePath}:`, err.message);
            
            
            if (err.code === 'ENOENT' && statusCode !== 404) {
                 serve404(res);
                 return;
            }

            
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error: Failed to load requested resource or 404 page.');
            return;
        }

        res.writeHead(statusCode, { 'Content-Type': `${contentType}; charset=UTF-8` });
        res.end(data);
    });
}

/**
 * 
 * @param {http.ServerResponse} res 
 */
function serve404(res) {
    const filePath = path.join(PAGES_DIR, '404.html');
    serveFile(filePath, 404, res);
}


const server = http.createServer((req, res) => {
    const url = req.url || '/';
    logRequest(url);

    // Routing logic
    switch (url) {
        case '/':
            serveFile(path.join(PAGES_DIR, 'index.html'), 200, res);
            break;

        case '/about':
            serveFile(path.join(PAGES_DIR, 'about.html'), 200, res);
            break;

        case '/contact':
            serveFile(path.join(PAGES_DIR, 'contact.html'), 200, res);
            break;
            
        case '/data':
            const jsonData = {
                status: 'success',
                endpoint: '/data',
                server_type: 'Node.js Core HTTP Server',
                timestamp: new Date().toISOString(),
                items: [
                    { id: 1, name: 'Core Module A', usage: 'http' },
                    { id: 2, name: 'Core Module B', usage: 'fs' },
                    { id: 3, name: 'Core Module C', usage: 'path' }
                ]
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(jsonData, null, 2));
            break;

        default:
            serve404(res);
            break;
    }
});


server.listen(PORT, () => {
    console.log(`Node.js File Server is LIVE!`);
    console.log(`Access at: http://localhost:${PORT}`);
    console.log(`Log file path: ${LOG_FILE_PATH}`);
});