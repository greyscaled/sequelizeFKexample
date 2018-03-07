const httpMocks = require('node-mocks-http')
const assert = require('assert')
const db = require('../models')

// Mocking your route /addChild
async function AddChild (req, res, next) {
  const child = await db.Child.create({
    name: req.body.childName,
    parent_id: req.body.parent_id
  })

  res.send(child.toJSON())
}

describe('test', function () {
  before(function () {
    return require('../models').sequelize.sync({ force: true })
  })

  after(async function () {
    await db.Child.truncate({ cascade: true })
    await db.Parent.truncate({ cascade: true })
  })

  describe('Test Case', function () {
    it('Associates', async function () {
      const parent = await db.Parent.create({
        name: 'Parent'
      })

      const req = httpMocks.createRequest({
        body: {
          childName: 'child',
          parent_id: parent.id
        }
      })

      let res = httpMocks.createResponse()

      await AddChild(req, res)
      assert(res._getData().parent_id === parent.id)

      await parent.reload({
        include: [{
          model: db.Child
        }]
      })

      assert(parent.Children[0].name === 'child')
    })
  })
})
