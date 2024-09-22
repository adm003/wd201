const http = require("http");
const fs = require("fs");

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

// Create an HTTP server
http.createServer((request, response) => {
    let url = request.url; // Get the requested URL
    response.writeHeader(200, { "Content-Type": "text/html" });

    // Serve different content based on the URL route
    switch (url) {
        case "/project":
            response.write(projectContent);
            response.end();
            break;
        case "/registration":
            response.write(registrationContent); // Serve the registration page
            response.end();
            break;
        default:
            response.write(homeContent); // Serve home page by default
            response.end();
            break;
    }
}).listen(3000, () => {
    console.log("Server is listening on port 3000");
});
