const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Policy = require('../models/Policy');

// @route     GET api/policies
// @desc      Get all policies
// @access    Public
router.get('/', async (req, res) => {
  try {
    const policies = await Policy.find().sort({ date: -1 });
    res.json(policies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/policies/:number
// @desc      Get policy
// @access    Public
router.get('/:number', async (req, res) => {
  try {
    const policy = await Policy.find({ number: req.params.number });

    if (!policy) return res.status(404).json({ msg: 'Policy not found' });

    res.json(policy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/policies
// @desc      Add new policy
// @access    Public
router.post(
  '/',
  [
    check('number', 'Number is required').not().isEmpty(),
    check('startDate', 'Start date is required').not().isEmpty(),
    check('endDate', 'End date is required').not().isEmpty(),
    check('firstName', 'First name is required').not().isEmpty(),
    check('surName', 'Sur name is required').not().isEmpty(),
    check('dob', 'DOB is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { number, startDate, endDate, description, firstName, surName, dob } =
      req.body;

    try {
      const newPolicy = new Policy({
        number,
        startDate,
        endDate,
        description,
        firstName,
        surName,
        dob,
      });

      const policy = await newPolicy.save();

      res.json(policy);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/policies/:number
// @desc      Update policy
// @access    Public
router.put('/:number', async (req, res) => {
  const { startDate, endDate, description, firstName, surName, dob } = req.body;

  // Build policy object
  const policyFields = {};
  if (startDate) policyFields.startDate = startDate;
  if (endDate) policyFields.endDate = endDate;
  if (description) policyFields.description = description;
  if (firstName) policyFields.firstName = firstName;
  if (surName) policyFields.surName = surName;
  if (dob) policyFields.dob = dob;

  try {
    let policy = await Policy.find({ number: req.params.number });

    if (!policy) return res.status(404).json({ msg: 'Policy not found' });

    policy = await Policy.findOneAndUpdate(
      { number: req.params.number },
      { $set: policyFields },
      { new: true }
    );

    res.json(policy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/policies/:number
// @desc      Delete policy
// @access    Public
router.delete('/:number', async (req, res) => {
  try {
    let policy = await Policy.find({ number: req.params.number });

    if (!policy) return res.status(404).json({ msg: 'Policy not found' });

    await Policy.findOneAndRemove({ number: req.params.number });

    res.json({ msg: 'Policy removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
