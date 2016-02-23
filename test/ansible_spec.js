'use strict'
/* eslint-env mocha */
var path = require('path')
var helpers = require('yeoman-test')
var assert = require('yeoman-assert')
var util = require('util')

describe('yo ansible', function () {
  var playbookName = 'testPlaybookName'
  var groups = ['testGroupOne', 'testGroupTwo']
  var hosts = ['testHostOne.local', 'testHostTwo.local']
  var plays = ['testPlayOne', 'testPlayTwo']

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        playbookName: playbookName,
        groups: groups,
        hosts: hosts,
        plays: plays
      })
      .withGenerators([[helpers.createDummyGenerator(), 'license']])
      .on('end', done)
  })

  it('creates a site.yml file', function () {
    assert.file('site.yml')
  })

  describe('README.md', function () {
    it('is created', function () {
      assert.file('README.md')
    })

    it('has name of playbook in it', function () {
      assert.fileContent('README.md', playbookName)
    })
  })

  it('creates a play file for each play specified', function () {
    var playFiles = plays.map(function (play) { return util.format('plays/%s.yml', play) })
    assert.file(playFiles)
  })

  it('creates a playbook for each play', function () {
    var playFiles = plays.map(function (play) { return util.format('plays/%s.yml', play); })
    assert.file(playFiles)
  })

  it('creates a host var file for each host', function () {
    var hostVarFiles = hosts.map(function (host) { return util.format('host_vars/%s', host); })
    assert.file(hostVarFiles)
  })
})

