'use strict'

var generators = require('yeoman-generator')

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
      this.composeWith('license', {}, {
        link: 'weak'
      })
  },

  _copyTemplateToDesination: function (templatePath, destinationPath, context) {
    this.fs.copyTpl(this.templatePath(templatePath),
        this.destinationPath(destinationPath),
        context)
  },

  _createEmptyFile: function(destinationPath) {
    this.fs.write(this.destinationPath(destinationPath), '')
  },

  _createInputPrompt: function (variableName, message, defaultValue, type) {
    return {
      'type': 'input',
      'message': message,
      'name': variableName,
      'default': defaultValue
    }
  },

  _createListInputPrompt: function (variableName, message) {
    return {
      'type': 'input',
      'message': message,
      'name': variableName,
      'default': [],
      'filter': function (answers) {
        return answers.split(' ')
      }
    }
  }
})
