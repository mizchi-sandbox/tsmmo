describe 'App.UI.Pane', ->
  before: (done) ->
    initialize done

  describe '#new', ->
    it 'should create pane', ->
      pane = new App.UI.Pane null, 0, 0, 320, 160
      assert.equals pane.x, 0
      assert.equals pane.y, 0
      assert.equals pane.width, 320
      assert.equals pane.height, 160

  describe '#splitVerticaly', ->
    it 'should split pane with 0.5', ->
      pane = new App.UI.Pane null, 0, 0, 320, 160
      [left, right] = pane.splitVerticaly 0.5
      assert.equals left.width, 160
      assert.equals left.x, 0
      assert.equals left.y, 0

      assert.equals right.width, 160
      assert.equals right.x, 160
      assert.equals right.y, 0

    it 'should split pane with 0.2', ->
      pane = new App.UI.Pane null, 0, 0, 320, 160
      [left, right] = pane.splitVerticaly 0.2
      assert.equals left.width, 64
      assert.equals left.x, 0

      assert.equals right.width, 256
      assert.equals right.x, 64

  describe '#splitHorizontaly', ->
    it 'should split pane with 0.5', ->
      pane = new App.UI.Pane null, 0, 0, 320, 160
      [upper, bottom] = pane.splitHorizontaly 0.5
      assert.equals upper.width, 320
      assert.equals upper.height, 80
      assert.equals upper.x, 0
      assert.equals upper.y, 0

      assert.equals bottom.width, 320
      assert.equals bottom.height, 80
      assert.equals bottom.x, 0
      assert.equals bottom.y, 80

    it 'should split pane with 0.2', ->
      pane = new App.UI.Pane null, 0, 0, 320, 160
      [upper, bottom] = pane.splitHorizontaly 0.2
      assert.equals upper.width, 320
      assert.equals upper.height, 32
      assert.equals upper.x, 0
      assert.equals upper.y, 0

      assert.equals bottom.width, 320
      assert.equals bottom.height, 128
      assert.equals bottom.x, 0
      assert.equals bottom.y, 32
