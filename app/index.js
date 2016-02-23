'use strict'
var generators = require('yeoman-generator')

var playbookVars = {}

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

  prompting: {
    askForPlaybookName: function () {
      function createInputPrompt (variableName, message, defaultValue, type) {
        return {
          'type': 'input',
          'message': message,
          'name': variableName,
          'default': defaultValue
        }
      }

      function createListInputPrompt (variableName, message) {
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

      var done = this.async()
      var prompts = [
        createInputPrompt('playbookName', "Specify the playbook's name?", this.appname),
        createListInputPrompt('groups', 'Specify the groups you intend to use'),
        createListInputPrompt('hosts', 'Specify the hosts you intend to provision'),
        createListInputPrompt('plays', 'Specify the plays you intend to write')
      ]
      this.prompt(prompts, function (answers) {
        playbookVars = answers
        done()
      })
    }
  },

  writing: {
    createDirectoryStructure: function () {
      var self = this
      var folders = [
        'host_vars',
        'group_vars'
      ]
      folders.forEach(function (folder) {
        self.fs.write(self.destinationPath(folder + '/.gitkeep'), '')
      })
    },

    createReadMeFile: function () {
      var self = this
      self._copyTemplateToDesination('README.md.ejs', 'README.md', playbookVars)
    },

    createSitePlaybook: function () {
      var self = this
      self._copyTemplateToDesination('site.yml', 'site.yml', playbookVars)
    },

    createHostVarsFiles: function () {
      var self = this
      playbookVars.hosts.forEach(function (host) {
        self._copyTemplateToDesination('host_vars/host_var.ejs', 'host_vars/' + host)
      })
    },

    createGroupVarsFiles: function () {
      var self = this
      playbookVars.groups.forEach(function (group) {
        self._copyTemplateToDesination('group_vars/group_var.ejs', 'group_vars/' + group)
      })
    },

    createPlayFiles: function () {
      var self = this
      playbookVars.plays.forEach(function (play) {
        self.fs.copyTpl(self.templatePath('site.yml'),
          self.destinationPath('plays/' + play + '.yml'),
          {
            playbookName: play,
            hosts: playbookVars.hosts
          })
      })
    }
  },

  install: {
  },
})
