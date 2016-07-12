'use strict'

var AnsibleBaseGenerator = require('../lib/BaseAnsibleGenerator')
var optionOrPrompt = require('yeoman-option-or-prompt')

var roleOptions

module.exports = AnsibleBaseGenerator.extend({
  _optionOrPrompt: optionOrPrompt,

  prompting: {
    prompts: function () {
      var done = this.async()

      var prompts = [
        this._createInputPrompt('name', 'Role name?', this.appname),
        this._createInputPrompt('description', 'Description?'),
        this._createInputPrompt('author', 'Author?'),
        this._createInputPrompt('email', 'Email?'),
      ]

      this._optionOrPrompt(prompts, function (answers) {
        roleOptions = answers
        done()
      }.bind(this))
    }
  },

  writing: {
    createReadme: function () {
      this._copyTemplateToDesination('README.md.ejs', 'README.md',
              roleOptions)
    },

    createTasks: function () {
      this._copyTemplateToDesination('tasks/main.yml.ejs', 'tasks/main.yml')
    },

    createMeta: function () {
      this._copyTemplateToDesination('meta/main.yml.ejs', 'meta/main.yml', roleOptions)
    },

    createHandlers: function () {
      this._copyTemplateToDesination('handlers/main.yml.ejs', 'handlers/main.yml')
    },

    createFiles: function () {
      this._createEmptyFile('files/.gitkeep')
    },

    createTemplates: function () {
      this._createEmptyFile('templates/.gitkeep')
    },

    createVars: function () {
      this._copyTemplateToDesination('vars/main.yml.ejs', 'vars/main.yml')
    },

    createDefaults: function () {
      this._copyTemplateToDesination('defaults/main.yml.ejs', 'defaults/main.yml')
    }
  }
})
