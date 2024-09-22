const http = require("http");
const fs = require("fs");
const minimist = require("minimist"); // Add this line to include minimist

// Read the port argument using minimist
const args = minimist(process.argv.slice(2));
const port = args.port || 3000; // Default to port 3000 if no port is provided

let homeContent = "";
let projectContent = "";
let registrationContent = "";

// Read the home.html file
fs.readFile("home.html", (err, home) => {
    if (err) {
        throw err;
    }
    homeContent = home;
});

// Read the project.html file
fs.readFile("project.html", (err, project) => {
    if (err) {
        throw err;
    }
    projectContent = project;
});

// Read the registration.html file
fs.readFile("registration.html", (err, registration) => {
    if (err) {
        throw err;
    }
    registrationContent = registration;
});

// Create the HTTP server
http.createServer((request, response) => {
    const url = request.url; // Get the requested URL
    response.writeHead(200, { "Content-Type": "text/html" });

    // Serve content based on the URL route
    switch (url) {
        case "/project":
            response.write(projectContent);
            response.end();
            break;
        case "/registration":
            response.write(registrationContent);
            response.end();
            break;
        default:
            response.write(homeContent);
            response.end();
            break;
    }
}).listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
