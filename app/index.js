var generators = require('yeoman-generator');

playbookName = "";
playbookVars = {};

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
        this.composeWith('license', {}, {
            link: 'weak'
        });
    },

    prompting: {
        askForPlaybookName: function() {
            function createInputPrompt(variableName, message, defaultValue, type) {
                return {
                    'type': 'input',
                    'message': message,
                    'name': variableName,
                    'default': defaultValue,
                };
            };

            function createListInputPrompt(variableName, message) {
                return {
                    'type': 'input',
                    'message': message,
                    'name': variableName,
                    'default': [],
                    'filter': function(answers) {
                        return answers.split(" ")
                    },
                }
            };

            var done = this.async();
            prompts = [
                createInputPrompt('playbookName', 'Specify the playbook\'s name?', this.appname),
                createListInputPrompt('groups', 'Specify the groups you intend to use'),
                createListInputPrompt('hosts', 'Specify the hosts you intend to provision'),
                createListInputPrompt('plays', 'Specify the plays you intend to write'),
            ];
            this.prompt(prompts, function(answers) {
                playbookVars = answers;
                done()
            }.bind(this));
        }
    },

    writing: {
        createDirectoryStructure: function() {
            var self = this;
            var folders = [
                'host_vars',
                'group_vars',
                'group_vars',
            ]
            folders.forEach(function(folder) {
                self.fs.write(self.destinationPath(folder + "/.gitkeep"), '');
            });
        },

        createReadMeFile: function() {
            this.fs.copyTpl(this.templatePath('README.md.ejs'),
                    this.destinationPath('README.md'), 
                    playbookVars
            );
        },

        createSitePlaybook: function() {
            this.fs.copyTpl(this.templatePath('site.yml'),
                    this.destinationPath('site.yml'),
                    playbookVars
            );
        },

        createHostVarsFiles: function() {
            var self = this;
            playbookVars.hosts.forEach(function(host) {
                self.fs.copyTpl(self.templatePath('host_vars/host_var.ejs'),
                        self.destinationPath('host_vars/' + host), {});
            });
        },

        createGroupVarsFiles: function() {
            var self = this;
            playbookVars.groups.forEach(function(group) {
                self.fs.copyTpl(self.templatePath('group_vars/group_var.ejs'),
                        self.destinationPath('group_vars/' + group), {});
            });
        },

        createPlayFiles: function() {
            var self = this;
            playbookVars.plays.forEach(function(play) {
                self.fs.copyTpl(self.templatePath('site.yml'),
                        self.destinationPath('plays/' + play + ".yml"),
                        {
                            playbookName: play,
                            hosts: playbookVars.hosts
                        });
            });
        }
    },

    install: {
    },
});
