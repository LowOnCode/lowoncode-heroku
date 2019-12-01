module.exports = {
  name: 'core',
  description: 'Some basic core components',
  components: [
    require('./debug'),
    require('./filereader'),
    require('./httpresponse'),
    require('./httproute'),
    require('./input'),
    require('./restproxy'),
    require('./template'),
    require('./timeout')
  ]
}
