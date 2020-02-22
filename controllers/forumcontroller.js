let express = require('express');
let router = express.Router();
let sequelize = require('../db')
let forumModel = sequelize.import('../Models/forum');

//find by id
router.get('/find/:id', function (req, res){
    let primaryKey = req.params.id;
    let userid = req.user.id;
    forumModel.findOne({
      where: { id: primaryKey, owner: userid }
    }).then(data => {
      data ? res.json(data) : res.send('Not Authorized to view item');
    }),
      err => res.send(500, err.message);
  });
//findall
router.get("/getall", function(req, res) {
    // var userid = req.user.id;
    forumModel.findAll({
      // where: { owner: userid },
      order: [["id", "ASC"]]
    }).then(
      function findAllSuccess(data) {
        res.json(data);
      },
      function findAllError(err) {
        res.send(500, err.message);
      }
    );
  });
//create post
router.post('/post/create', function (req, res){
    let name = req.body.forum.name;
    let description = req.body.forum.description;
    let dimensions = req.body.forum.dimensions;
    let photo = req.body.forum.photo;
    let owner = req.user.id

    forumModel.create({
        name: name,
        description: description,
        dimensions: dimensions,
        owner: owner,
        photo: photo
    }).then(
        function createSuccess(response){
            res.json({message: 'success',
            added: response
            })
        }, function createError(err){
            res.send(500, err.message)
        }
    )
})
//delete a post
router.delete('/post/delete/:id', function(req,res){
    let primaryKey = req.params.id;
    let userid = req.user.id;
    forumModel.destroy({
        where: {id: primaryKey, owner: userid}
    }).then(
        data => {
            return data > 0
            ? res.send('Item was deleted')
            : res.send('Nothing deleted')
        }),err => res.send(500, err.message);
});
//update a post
router.put('/post/update:id', function(req,res){
    let userid = req.user.id;
    let primaryKey = req.params.id;
    let name = req.body.forum.name;
    let description = req.body.forum.description;
    let dimensions = req.body.forum.dimensions;
    let photo = req.body.forum.photo;
    forumModel.update({
        name: name,
        description: description,
        dimensions: dimensions,
        photo: photo
    },{ where: { id: primaryKey, owner: userid }}
    ).then(
        data => {
            return data > 0
                ? res.send("Item updated!")
                : res.send("No updates where made.")
        }),
        err => res.send(500, err.message)
})

module.exports = router