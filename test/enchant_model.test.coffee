buster.spec.expose()

describe 'enchant.Model', ->
  before: (done) ->
    initialize done

  describe '#new', ->
    it "should be called with set", (done) ->
      model = new enchant.Model
      model.on 'change', ->
        assert true
        done()
      model.set x:1

    it "should be called with implicit set", (done) ->
      class Model extends enchant.Model
        defaults:
          x: 0
          y: 0
        constructor: ->
          super
      model = new Model
      model.on 'change', ->
        assert model.x is 1
        done()
      model.x = 1

    it "should be called with implicit set with arguments", (done) ->
      class Model extends enchant.Model
        defaults:
          x: 0
          y: 0
        constructor: ->
          super

      model = new Model {y:3}
      model.on 'change', ->
        assert model.y is 3
        done()
      model.x = 1
