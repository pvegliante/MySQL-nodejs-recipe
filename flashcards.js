module.exports = function(app, connection) {
    app.get('/flashcards', function(req, res) {
        connection.query('SELECT * FROM flashcards', function(err, rows) {
            if (err) {
                console.log('Error reading flashcards');
                return res.sendStatus(500);
            }
            res.json(rows);
        });
    });

    app.post('/flashcards', function(req, res){
      var query = `INSERT INTO flashcards (front_text, back_text, owner, subject)
      VALUES ('${req.body.front_text}', '${req.body.back_text}', '${req.body.owner}', '${req.body.subject}')`;
      // make sure values are on the same line!!!
      connection.query(query, function(err, result){
        if(err){
          console.log("Error writing flash card: "+err.toString());
          return res.sendStatus(500);
        }
        res.json(result);
      })
    });

    app.put('/flashcards', function(req, res){
      var query = `UPDATE flashcards set front_text = '${req.body.front_text}', back_text = '${req.body.back_text}', subject = '${req.body.subject}' WHERE id = ${req.body.id}`;
      connection.query(query, function(err, result){
        if (err){
          console.log("Error updating flashcard with id: "+req.body.id);
          console.log(err.toString());
            return res.sendStatus(500);
        }
        res.json(result);
      });
    })
}
