const http = require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

// Parse the port argument from the command line
const args = minimist(process.argv.slice(2));
const port = args.port || 3000;  // Default port 3000 if not supplied

// Helper function to serve HTML files
function serveFile(response, filePath, contentType) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            response.writeHead(500);
            response.end(`Server error: ${err.code}`);
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}

// Create the server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        serveFile(res, path.join(__dirname, 'home.html'), 'text/html');
    } else if (req.url === '/projects') {
        serveFile(res, path.join(__dirname, 'project.html'), 'text/html');
    } else if (req.url === '/registration') {
        // Serve registration.html when visiting /registration
        serveFile(res, path.join(__dirname, 'registration.html'), 'text/html');
    } else {
        res.writeHead(404);
        res.end('404: Not Found');
    }
});

// Listen on the provided port number
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
