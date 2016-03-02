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
      var folders = [
        'host_vars',
        'group_vars'
      ]
      folders.forEach(function (folder) {
        this.fs.write(this.destinationPath(folder + '/.gitkeep'), '')
      }.bind(this))
    },

    createReadMeFile: function () {
      this._copyTemplateToDesination('README.md.ejs', 'README.md', playbookVars)
    },

    createSitePlaybook: function () {
      this._copyTemplateToDesination('site.yml', 'site.yml', playbookVars)
    },

    createRolesDirectory: function () {
      this._createEmptyFile('roles/.gitkeep')
    },

    createHostVarsFiles: function () {
      playbookVars.hosts.forEach(function (host) {
        this._copyTemplateToDesination('host_vars/host_var.ejs', 'host_vars/' + host)
      }.bind(this))
    },

    createGroupVarsFiles: function () {
      playbookVars.groups.forEach(function (group) {
        this._copyTemplateToDesination('group_vars/group_var.ejs', 'group_vars/' + group)
      }.bind(this))
    },

    createPlayFiles: function () {
      playbookVars.plays.forEach(function (play) {
        this.fs.copyTpl(this.templatePath('site.yml'),
          this.destinationPath('plays/' + play + '.yml'),
          {
            playbookName: play,
            hosts: playbookVars.hosts
          })
      }.bind(this))
    }
  },

  install: {
  }
})
