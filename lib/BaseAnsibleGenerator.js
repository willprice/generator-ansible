'use strict'

var generators = require('yeoman-generator')
var optionOrPrompt = require('yeoman-option-or-prompt')

module.exports = generators.Base.extend({
  _optionOrPrompt: optionOrPrompt,

  constructor: function () {
    generators.Base.apply(this, arguments)
    this._prompts = []
  },

  _copyTemplateToDesination: function (templatePath, destinationPath, context) {
    this.fs.copyTpl(this.templatePath(templatePath),
        this.destinationPath(destinationPath),
        context)
  },

  _createEmptyFile: function (destinationPath) {
    this.fs.write(this.destinationPath(destinationPath), '')
  },

  _addInputPrompt: function (name, message, defaultValue, type) {
    var prompt = {
      type: 'input',
      message: message,
      name: name,
      default: defaultValue
    }
    this._prompts.push(prompt)
  },

  _addListInputPrompt: function (name, message) {
    var prompt = {
      type: 'input',
      message: message,
      name: name,
      default: [],
      filter: function (answer) {
        if (typeof answer === 'string') {
          return answer.split(' ')
        }
        return []
      }
    }
    this._prompts.push(prompt)
  }
})
