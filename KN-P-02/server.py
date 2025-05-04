from http.server import HTTPServer, SimpleHTTPRequestHandler
from random import randint


class MetricHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/metrics':
            self.send_response(200)
            self.send_header("Content-type", "text/plain")
            self.end_headers()
            # zufaellige CPU Metrik (0-100) als Byte-String im HTTP-Response-Body zurücksenden
            self.wfile.write(f"cpu {randint(0, 100)}".encode())

if __name__ == "__main__":
    port = 8080
    # "" -> ueber alle Netzwerk Interfaces zugreifen (localhost, etc.)
    address = ("", port)
    # erstellt Server Instanz
    httpd = HTTPServer(address, MetricHandler)
    print(f"Starting server at Port: {port}")
    # httpd = http Daemon
    httpd.serve_forever()


