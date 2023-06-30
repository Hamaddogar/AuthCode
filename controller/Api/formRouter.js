const Form = require('../Database/model/formModel');

exports.saveFormData = (req, res) => {
  const formData = req.body;
  Form.findOne({ email: formData.email })
    .then((existingForm) => {
      if (existingForm) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      const newForm = new Form(formData);
      newForm
        .save()
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
