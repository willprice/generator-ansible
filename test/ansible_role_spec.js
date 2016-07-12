/* eslint-env mocha */
'use strict'

var path = require('path')
var helpers = require('yeoman-test')
var assert = require('yeoman-assert')

describe('yo ansible:role', function () {
  var name = "Test-Role"
  var author = "Will Price";
  var email = "will.price94@gmail.com";
  var description = "I am a test role";

  before(function (done) {
    helpers.run(require.resolve('../role'))
      .withPrompts({
        name: name,
        description: description,
        author: author,
        email: email
      })
      .on('end', done)
  })

  describe('README.md', function () {
    var readme_path = 'README.md'

    it('is created', function () {
      assert.file(readme_path)
    })

    it('has the role name', function () {
      assert.fileContent(readme_path, name)
    })

    it('has the role description', function () {
      assert.fileContent(readme_path, description)
    })

    it('has the author', function () {
      assert.fileContent(readme_path, author)
    })

    it('has the author email', function () {
      assert.fileContent(readme_path, email)
    })
  })

  describe('meta/', function () {
    var meta_main_path = 'meta/main.yml'

    it('has a main.yml', function () {
      assert.file(meta_main_path)
    })

    it('has author in main.yml', function () {
      assert.fileContent(meta_main_path, author)
    })

    it('has the description in main.yml', function () {
      assert.fileContent(meta_main_path, description)
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
