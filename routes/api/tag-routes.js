const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include:[{
      model:Product,
    }]
  }).then(data=>{
    res.json(data)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
        msg:"An error occurred",
        err:err
    })
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id,{
    include:[{
        model:Product
    }]
  }).then(data=>{
    if(data){
       return  res.json(data);
    } else {
        res.status(404).json({
            msg:"no such record"
        })
    }
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name:req.body.tag_name
  })
  .then(newTag => {
    res.status(201).json({ message: 'Tag created successfully', data: newTag });
  })
  .catch(error => {
    res.status(500).json({ message: 'An error occurred while creating the tag', error });
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((updatedTag) => {
    res.status(200).json({
      message: `Tag updated successfully`,
      updatedTag
    });
  })
  .catch((error) => {
    res.status(500).json({
      error: error.message
    });
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
        id:req.params.id
    }
}).then(data=>{
    if(data){
        return res.json(data)
    } else {
        return res.status(404).json({msg:"no such record"})
    }
}).catch(err=>{
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
})
});

module.exports = router;
