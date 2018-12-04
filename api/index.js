import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import assert from 'assert';
import config from '../config';

let mdb;
MongoClient.connect(config.mongodbUri, (err, client) => {
  assert.equal(null, err);
  mdb = client.db('reactcolorsdb');

})

const router = express.Router();

router.get('/colors', (req, res) => {
  let colors = {};
  mdb.collection('colors').find({})
     .project({ color: 1,
                shades: 1
     })
     .each((err, color) =>{
        console.log(color)
        assert.equal(null, err);
        if(!color){
          // console.log("COLORS ", {colors});
          res.send({colors});
          return
        }
        colors[color._id] = color;
      });
});
// router.get('/names/:nameIds', (req, res) => {
//
//   const nameIds = req.params.nameIds.split(',').map(ObjectID);
//   let names = {};
//   mdb.collection('names').find({_id: {$in: nameIds}})
//      .each((err, name) =>{
//         assert.equal(null, err);
//         if(!name){
//           res.send({ names });
//           return;
//         }
//         names[name._id] = name;
//       });
// });
router.get('/colors/:colorId', (req, res) => {
//req.params.colorId
  mdb.collection('colors')
     .findOne({_id: ObjectID(req.params.colorId)})
     .then(color => res.send(color))
     .catch(console.error)
});

// router.post('/names', (req, res) => {
//   const colorId = ObjectID(req.body.colorId);
//   const name = req.body.newName;
//   //validation for name
// mdb.collection('names').insertOne({ name })
//                        .then(result =>
//                          mdb.collection('colors').findAndModify(
//                             {_id: colorId},
//                             [],
//                             { $push: { nameIds: result.insertedId } },
//                             { new: true }
//                          ).then(doc =>
//                             res.send({
//                               updatedColor: doc.value,
//                               newName: { _id: result.insertedId, name}
//                             })
//                           )
//                         ).catch(error => {
//                             console.error(error);
//                             res.status(404).send('Bad Request');
//                           });
// })

export default router;
