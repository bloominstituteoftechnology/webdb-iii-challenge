server.get('/', function(req, res) {
    res.status(200).json({ success: true });
});