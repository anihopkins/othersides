import http.server as server
import socketserver as socket

PORT = 8000

print("serving at port", PORT)

Handler = server.SimpleHTTPRequestHandler

httpd = socket.TCPServer(("", PORT), Handler)

httpd.serve_forever()
