const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const list = await Category.findAll({
      // be sure to include its associated Products
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    })
    res.json(list)
  }
  catch(error) { res.status(500).json(error) }
});


router.get('/:id', async (req, res) => {
  try {
    const getId = await Category.findOne({
  where: {
    id: req.params.id,
  },
  include: {
    model: Product,
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
  }
  })
  res.json(getId)
  }
  catch (error) { res.status(500).json(error) }
});



router.post('/', async (req, res) => {
  try {
    const getId = await Category.create(req.body) }
  catch (error) { res.status(400).json(error) }
});

router.put('/:id', async (req, res) => {
  try {
  const getId = await Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: { id: req.params.id },
    })
    res.json(getId)
  }
  catch (error) { res.status(400).json(error) }
});

router.delete('/:id', async (req, res) => {
  try { 
    const list = await Category.destroy({
    where: { id: req.params.id },
  })
  res.json(list)
}
  catch (error) { res.status(400).json(error) }
});

module.exports = router;

