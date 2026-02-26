    const express = require('express');
    const router = express.Router();
    const auth = require('../middleware/authMiddleware');
    const DiaryEntry = require('../models/DiaryEntry');

    // @route   POST api/entries
    // @desc    Create a new diary entry
    // @access  Private
    router.post('/', auth, async (req, res) => {
        const { content, date } = req.body;
        try {
            const newEntry = new DiaryEntry({
                user: req.user.id,
                content: content,
                date: new Date(date)
            });
            const entry = await newEntry.save();
            res.json(entry);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
    // @route   GET api/entries
    // @desc    Get all diary entries for a user
    // @access  Private
    router.get('/', auth, async (req, res) => {
        try {
            // Find entries and sort by date descending
            const entries = await DiaryEntry.find({ user: req.user.id }).sort({ date: -1 });
            res.json(entries);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    // @route   PUT api/entries/:id
    // @desc    Update a diary entry
    // @access  Private
    router.put('/:id', auth, async (req, res) => {
        const { content } = req.body;

        try {
            let entry = await DiaryEntry.findById(req.params.id);

            if (!entry) {
                return res.status(404).json({ msg: 'Entry not found' });
            }

            // Make sure user owns the entry
            if (entry.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'Not authorized' });
            }

            entry = await DiaryEntry.findByIdAndUpdate(
                req.params.id,
                { $set: { content } },
                { new: true } // Return the updated document
            );

            res.json(entry);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    router.delete('/:id', auth, async (req, res) => {
  try {
    const entry = await DiaryEntry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ msg: 'Entry not found' });
    }

    // Check ownership
    if (entry.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await DiaryEntry.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Entry removed', id: req.params.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    let entry = await DiaryEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ msg: 'Entry not found' });

    if (entry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    entry.content = req.body.content;
    await entry.save();

    res.json(entry);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

    module.exports = router;
    
