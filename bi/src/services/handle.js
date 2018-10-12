export function datetoidx(m) {
  var h = parseInt(m.slice(0,2))
  var m = parseInt(m.slice(3))
  return h*60+m
}