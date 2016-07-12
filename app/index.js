'use strict'
var AnsibleBaseGenerator = require('../lib/BaseAnsibleGenerator')

var playbookOptions = {}

module.exports = AnsibleBaseGenerator.extend({
  prompting: {
    prompt: function () {
      var done = this.async()
      this._addInputPrompt('author', "Author?")
      this._addInputPrompt('playbookName', "Specify the playbook's name?", this.appname)
      this._addListInputPrompt('groups', 'Groups you intend to use (space separated)')
      this._addListInputPrompt('hosts', 'Hosts you intend to provision (space separated)')
      this._addListInputPrompt('plays', 'Plays you intend to write (space separated) (e.g. site)')
      this._optionOrPrompt(this._prompts, function (answers) {
        playbookOptions = answers
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
      this._copyTemplateToDesination('README.md.ejs', 'README.md', playbookOptions)
    },

    createSitePlaybook: function () {
      this._copyTemplateToDesination('site.yml', 'site.yml', playbookOptions)
    },

    createRolesDirectory: function () {
      this._createEmptyFile('roles/.gitkeep')
    },

    createHostVarsFiles: function () {
      playbookOptions.hosts.forEach(function (host) {
        this._copyTemplateToDesination('host_vars/host_var.ejs', 'host_vars/' + host)
      }.bind(this))
    },

    createGroupVarsFiles: function () {
      playbookOptions.groups.forEach(function (group) {
        this._copyTemplateToDesination('group_vars/group_var.ejs', 'group_vars/' + group)
      }.bind(this))
    },

    createPlayFiles: function () {
      playbookOptions.plays.forEach(function (play) {
        this.fs.copyTpl(this.templatePath('site.yml'),
          this.destinationPath('plays/' + play + '.yml'),
          {
            playbookName: play,
            hosts: playbookOptions.hosts
          })
      }.bind(this))
    }
  },

  install: {
  }
})
