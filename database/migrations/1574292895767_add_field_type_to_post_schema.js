'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFieldTypeToPostSchema extends Schema {
  up () {
    this.alter('posts', (table) => {
      table.string('type')
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = AddFieldTypeToPostSchema
