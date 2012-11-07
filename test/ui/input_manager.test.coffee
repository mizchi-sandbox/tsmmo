describe 'InputManager', ->
  before: (done) ->
    window.game = new App.Main()
    initialize done

  describe '#isAnyButtonPushed', ->
    it 'should return false when all keys are not pushed', ->
      im = new App.UI.InputManager()
      refute im.isAnyButtonPushed()

    it 'should return true when any key is pushed', ->
      im = new App.UI.InputManager()
      game.input.a = true
      assert im.isAnyButtonPushed()
      game.input.a = false

  describe '#ready', ->
    beforeEach ->
      window.game = new App.Main()

    it 'should return false at first', ->
      im = new App.UI.InputManager()
      refute im.ready()
