'use strict'

const Model = use('Model')

class Post extends Model {
  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Post
