import { createServer } from "node:http";

const server = createServer((request, response) => {
    console.log("request received")

    response.statusCode = 200;

    response.setHeader("Content-Type", "application/json")

    const jsonResponseBody = JSON.stringify({ location: "Mars" })

    response.end(jsonResponseBody)
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000')
});


/* StatusCode        : 200
StatusDescription : OK
Content           : {"location":"Mars"}
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Content-Length: 19 -----è il valore del corpo della risposta (in bytes). Quindi la risposta in questo caso contiene 19 bytes di dati.
                    Content-Type: application/json
                    Date: Thu, 04 Apr 2024 10:31:43 GMT

                    {"location":"Mars"}
Forms             : {}
Headers           : {[Connection, keep-alive], [Keep-Alive, timeout=5],       
                    [Content-Length, 19], [Content-Type,
                    application/json]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : System.__ComObject
RawContentLength  : 19
 */