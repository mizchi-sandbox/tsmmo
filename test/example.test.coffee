buster.spec.expose()

describe 'Example', ->
  before: (done) ->
    initialize done

  it "1", ->
    refute false
    assert !! enchant

  it "2", ->
    label = new enchant.Label()
    refute false

  it "dom", ->
    $('body').html("<div id='x'>hogehoge</div>")
    $x = $('#x')
    assert $x.text() is 'hogehoge'

  it "stubbing", ->
    obj = {hoge: ->}
    @stub obj, "hoge"
    obj.hoge()
    assert.calledOnce obj.hoge

  it "deferred"
