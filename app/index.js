'use strict'
var AnsibleBaseGenerator = require('../lib/BaseAnsibleGenerator')

var playbookVars = {}

module.exports = AnsibleBaseGenerator.extend({
  prompting: {
    askForPlaybookName: function () {
      var done = this.async()
      var prompts = [
        this._createInputPrompt('playbookName', "Specify the playbook's name?", this.appname),
        this._createListInputPrompt('groups', 'Specify the groups you intend to use'),
        this._createListInputPrompt('hosts', 'Specify the hosts you intend to provision'),
        this._createListInputPrompt('plays', 'Specify the plays you intend to write')
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
  }
})
