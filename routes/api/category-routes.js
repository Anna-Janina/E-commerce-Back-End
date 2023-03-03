const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
      // be sure to include its associated Products
    include: [Product],
  })
  .then((categories) => res.json(categories))
  .catch((error) => res.status(500).json(error))
});

router.get('/:id', (req, res) => {
  Category.findOne({
  where: {
    id: req.params.id,
  },
  include: [Product],
})
.then((categories) => res.json(categories))
.catch((error) => res.status(500).json(error))
});


router.post('/', (req, res) => {
  Category.create(req.body) 
  .then((category) => res.status(200).json(category))
  .catch((error) => res.status(400).json(error))
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((category) => res.status(200).json(category))
  .catch((error) => res.status(400).json(error))
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((category) => res.status(200).json(category))
  .catch((error) => res.status(400).json(error))
});

module.exports = router;
