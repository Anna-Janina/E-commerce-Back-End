const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags + include its associated Product data
  try {
    const list = await Tag.findAll({
    include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      } 
  })
  res.json(list)
  }
  catch (error) { res.status(500).json(err) }
  });

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` + include its associated Product data
  try {
    const getTag = await Tag.findOne({
    where: { id: req.params.id },
    include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
  })
  res.json(getTag)
  }
  catch (error) { res.status(500).json(err) }
  });

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const makeTag = await Tag.create({
    tag_name: req.body.tag_name
  })
  res.json(makeTag)
  }
  catch (error) { res.status(500).json(err) }
  });

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
    where: { id: req.params.id }
  })
  res.json(updateTag)
  }
  catch (error) { res.status(500).json(err) }
  });

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
    where: { id: req.params.id }
  })
  res.json(deleteTag)
  }
  catch (error) { res.status(500).json(err)}
  });

module.exports = router;
