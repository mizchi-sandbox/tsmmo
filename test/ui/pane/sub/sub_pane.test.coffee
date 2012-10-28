describe 'IterCursor', ->
  before: (done) ->
    initialize done

  describe '#constructor', ->
    it 'should be idx is 0 at first', ->
      cursor = new App.UI.IterCursor []
      assert cursor.idx is 0

  describe '#next', ->
    it 'should go 0 to 1', ->
      cursor = new App.UI.IterCursor _.range(10)
      cursor.idx = 0
      cursor.next()
      assert cursor.idx is 1

    it 'should be reset at overflow', ->
      cursor = new App.UI.IterCursor _.range(10)
      cursor.idx = 9
      cursor.next()
      assert cursor.idx is 0

  describe '#prev', ->
    it 'should go 1 to 0', ->
      cursor = new App.UI.IterCursor _.range(10)
      cursor.idx = 1
      cursor.prev()
      assert cursor.idx is 0

    it 'should be reset at overflow', ->
      cursor = new App.UI.IterCursor _.range(10)
      cursor.idx = 0
      cursor.prev()
      assert cursor.idx is 9
