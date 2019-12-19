module.exports = {
  name: 'core',
  version: '0.0.2',
  description: 'Some basic core components',
  components: [
    require('./debug'),
    require('./design'),
    require('./filereader'),
    require('./httpresponse'),
    require('./httproute'),
    require('./input'),
    require('./label'),
    require('./output'),
    require('./restproxy'),
    require('./template'),
    require('./timeout'),
    require('./variable')
  ]
}
