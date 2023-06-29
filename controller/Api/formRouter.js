// controllers/formDataController.js

const Form = require('../Database/model/formModel');

exports.saveFormData = (req, res) => {
  const formData = req.body;
   

  const newForm = new Form(formData);

  newForm
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
};
