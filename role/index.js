'use strict'

var AnsibleBaseGenerator = require('../lib/BaseAnsibleGenerator')

var roleOptions

module.exports = AnsibleBaseGenerator.extend({
  prompting: {
    prompts: function () {
      var done = this.async()

      this._addInputPrompt('name', 'Role name?', this.appname),
      this._addInputPrompt('description', 'Description?'),
      this._addInputPrompt('author', 'Author?'),
      this._addInputPrompt('email', 'Email?'),

      this._optionOrPrompt(this._prompts, function (answers) {
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
