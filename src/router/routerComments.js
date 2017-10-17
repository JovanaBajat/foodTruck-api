import express from 'express';

import Comment from '../model/comment';

const router = express.Router();

// route /app/comments/:id/comment/:commentid/update
router.post('/comment/:commentid/update', (req, res) => {
  Comment.findByIdAndUpdate(req.params.commentid,
  { $set : { text : req.body.text }}, (err, updatedComment) => {
    if (err) {res.send(err)}
    res.json({
      "message" : "a comment has been updated"
    });
  });
});


export default router;
