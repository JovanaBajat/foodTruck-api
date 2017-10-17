import express from 'express';

import Comment from '../model/comment';
import Truck from '../model/truck';

const router = express.Router();

//router /app/trucks - get all trucks
router.get('/', (req, res) => {
  Truck.find({}, (err, trucks) => {
    if(err) {
      res.send(err)
    }
    res.json({ trucks });
  });
});

//router /app/trucks/add - add a trucks
router.post('/add', (req, res) => {
  const newTruck = new Truck(req.body);

  newTruck.save((err) => {
    if(err){
      res.send(err)
    }
    res.json({
      "message": "New truck successfully added"
    });
  });
});

//router /app/trucks/:id/update - update a trucks
router.post('/:id/update', (req, res) => {
  Truck.findByIdAndUpdate(req.params.id, req.body, (err, updatedTruck) => {
    if(err){
      res.send(err)
    }
    res.json({
      "message": "Truck is successfully updated"
    });
  });
});

//router /app/trucks/:id/delete
router.get('/:id/delete', (req, res) => {
  Truck.findByIdAndRemove(req.params.id, (err, deletedTruck) => {
    if(err){
      res.send(err)
    }
    res.json({
      "message": "Truck is successfully deleted"
    });
  });
});

//router /app/trucks/:id/comment/create
router.post('/:id/comment/create', (req, res) => {
  const newComment = new Comment(req.body)
  newComment.save((err, comment) => {
    if(err){res.send(err)}
    Truck.findByIdAndUpdate(req.params.id,
    { $push : { comments : comment._id }}, err => {
    if (err) {
      res.send(err)
    }
    res.json({
      "message": "a comment has been created"
    });
  });
});
});

//router /app/trucks/:id/comment
router.get('/:id/comment', (req, res) => {
  Truck.findById(req.params.id)
  .populate('comments')
  .exec((err, truck) => {
    if (err) res.send(err)
    res.send(truck.comments)
  });
});

//router /app/trucks/:id/comment/:commentid/delete

router.post('/:id/comment/:commentid/delete', (req, res) => {
  Comment.findByIdAndRemove(req.params.commentid, (err, deletedComment) => {
    if(err){res.send(err)}
    console.log(deletedComment)
    Truck.findByIdAndUpdate(
      req.params.id,
      { $pull : { comments : deletedComment._id }}, err => {
        if(err) {
          res.send(err)
        }
        res.json({
          "message": "a comment has been deleted"
        });
      });
  });
});

export default router;
