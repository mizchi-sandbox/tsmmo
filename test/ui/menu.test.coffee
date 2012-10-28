describe 'Menu', ->
  before: (done) ->
    initialize done

  it 'should be written', ->
    menu = new App.UI.Menu
    assert menu.x is 0
