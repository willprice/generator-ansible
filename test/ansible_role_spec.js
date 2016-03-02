/* eslint-env mocha */
'use strict'

var path = require('path')
var helpers = require('yeoman-test')
var assert = require('yeoman-assert')

describe('yo ansible:role', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../role'))
      .withPrompts({
        name: 'TEST-ROLE'
      })
      .withGenerators([[helpers.createDummyGenerator(), 'license']])
      .on('end', done)
  })

  describe('README.md', function () {
    it('is created', function () {
      assert.file('README.md')
    })

    it('has the role name in it', function () {
      assert.fileContent('README.md', 'TEST-ROLE')
    })
  })

  describe('meta/', function () {
    it('has a main.yml', function () {
      assert.file('meta/main.yml')
    })
  })

  describe('tasks/', function () {
    it('has a main.yml', function () {
      assert.file('tasks/main.yml')
    })
  })

  describe('vars/', function () {
    it('has a main.yml', function () {
      assert.file('vars/main.yml')
    })
  })

  describe('handlers/', function () {
    it('has a main.yml', function () {
      assert.file('handlers/main.yml')
    })
  })

  describe('files/', function () {
    it('has a .gitkeep', function () {
      assert.file('files/.gitkeep')
    })
  })

  describe('templates/', function () {
    it('has a .gitkeep', function () {
      assert.file('templates/.gitkeep')
    })
  })

  describe('defaults/', function () {
    it('has a main.yml', function () {
      assert.file('defaults/main.yml')
    })
  })
})
