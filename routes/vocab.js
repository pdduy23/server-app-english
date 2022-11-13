const experss = require('express')
const router = experss.Router()

const Vocab = require('../models/Vocabulary')

router.post('/add', async (req, res) => {
    const { word, define } = req.body

    let minCount

    await Vocab.find().sort({ count: 1 }).then(res => minCount = res[0].count).catch(err => console.log(err))

    await Vocab.findOne({ word: word }).then(async exist => {
        if (exist) {
            try {
                await Vocab.findOneAndUpdate({ word: word, define: { $nin: [define] } }, { $push: { define: define } }, { new: true })
                return res.json({ success: true, message: 'Updated word.' })
            } catch (error) {
                return res.json({ success: false, message: 'Already have this define.' })
            }
        } else {
            const newVocab = new Vocab({
                word,
                define,
                count: minCount
            })
            await newVocab.save()

            return res.json({ success: true, message: 'Added new word.', newVocab })
        }
    }).catch(err => console.log(err))

})

router.get('/getword', async (req, res) => {

    await Vocab.find().sort({ count: 1 }).limit(1).then(response => {

        response.map(async (vocab) => {
            await Vocab.findOneAndUpdate({ _id: vocab._id }, { count: vocab.count + 1 }, { new: true })
        })

        return res.json({ success: true, vocab: response })
    }).catch(err => console.log(err))
})

module.exports = router