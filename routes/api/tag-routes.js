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
    product_name:req.body.product_name,
    price:req.body.price,
    stock:req.body.price,
    catagory_id:req.body.catagory_id
  })
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
