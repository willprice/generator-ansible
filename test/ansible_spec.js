'use strict'
/* eslint-env mocha */
var path = require('path')
var helpers = require('yeoman-test')
var assert = require('yeoman-assert')
var util = require('util')

describe('yo ansible', function () {
  var playbookName = 'test-playbook-name'
  var groups = ['testGroupOne', 'testGroupTwo']
  var hosts = ['testHostOne.local', 'testHostTwo.local']
  var plays = ['testPlayOne', 'testPlayTwo']
  var author = 'Will Price'

  before(function (done) {
    helpers
      .run(require.resolve('../app'))
      .withPrompts({
        author: author,
        playbookName: playbookName,
        groups: groups,
        hosts: hosts,
        plays: plays
      })
      .on('end', done)
  })

  it('creates a site.yml file', function () {
    assert.file('site.yml')
  })

  describe('README.md', function () {
    var readme_path = 'README.md'
    it('is created', function () {
      assert.file(readme_path)
    })

    it('has name of playbook in it', function () {
      assert.fileContent(readme_path, playbookName)
    })

    it('has author in it', function () {
      assert.fileContent(readme_path, author)
    })
  })

  it('creates a playbook for each play', function () {
    var playFiles = plays.map(function (play) { return util.format('plays/%s.yml', play) })
    assert.file(playFiles)
  })

  describe('inventory', function () {
    it('creates a section for each group', function () {
      groups.map(function (group) { assert.fileContent('inventory', '[' + group + ']') })
    })

    it('creates a host var file for each host', function () {
      var hostVarFiles = hosts.map(function (host) { return util.format('host_vars/%s', host) })
        assert.file(hostVarFiles)
    })
  })

  it('creates a deploy.sh', function() {
    assert.file('deploy.sh')
  })

  it('creates a roles directory', function () {
    assert.file('roles/.gitkeep')
  })
})
