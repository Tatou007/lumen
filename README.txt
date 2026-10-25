ORBIT EXPLORER — WEBSITE PROJECT

11 HTML pages: index.html, seven planet pages, store.html, medical.html and basket.html.
Additional files: database.sql, submit_medical.php, css/style.css, js/main.js, js/planet.js.

RUN WITH XAMPP
1. Copy the orbit_explorer folder into XAMPP's htdocs directory.
2. Start Apache and MySQL.
3. Open phpMyAdmin and import database.sql.
4. If necessary, configure ORBIT_DB_HOST, ORBIT_DB_NAME, ORBIT_DB_USER and ORBIT_DB_PASS in the PHP environment, or adjust the defaults in submit_medical.php.
5. Visit http://localhost/orbit_explorer/.
6. Planet pages load Three.js from jsDelivr and need internet access for that library.

STORE
The store includes suits for Mercury ($4,200), Venus ($7,000), Mars ($5,200), Jupiter ($6,800), Saturn ($6,100), Uranus ($5,700), and Neptune ($6,400). Edit PRODUCTS in js/main.js to change details or prices.

SCIENTIFIC / DEPLOYMENT NOTES
- 3D planets use Three.js and generated visual surface maps, not NASA imagery or accurate terrain. Drag to rotate; scroll to zoom.
- Suit listings are conceptual, not certified or flight-ready. Jupiter, Saturn, Uranus and Neptune have no solid surface suitable for a conventional astronaut to stand on; their suits are speculative remote-atmosphere concepts.
- Carbon dioxide is a waste gas that must be removed from a breathing loop. Oxygen is essential; nitrogen can be used only as a correctly engineered diluent. Temperature should be managed by insulation and active heating/cooling, not greenhouse gases in a helmet.
- The medical form stores submissions in MySQL. Before public launch, configure HTTPS, secure credentials, role-based access, privacy notice, retention/deletion rules, and a staffed clinical workflow. This website is not an emergency service.
- Basket totals are calculated in the browser. A real payment gateway, server-side pricing validation, order API and order database still need to be configured before accepting payments.
