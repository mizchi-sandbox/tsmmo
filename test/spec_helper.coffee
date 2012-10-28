_initialized = false
buster.spec.expose()
window.p = buster.log
window.initialize = (done) ->
  return setTimeout(0, done) if _initialized
  $ =>
    enchant()
    window.game = new App.Game()
    window._initialized = true
    done()

