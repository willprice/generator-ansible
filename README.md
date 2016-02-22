# [generator-ansible](https://github.com/willprice/generator-ansible)

[![Build Status](https://travis-ci.org/willprice/generator-ansible.svg?branch=master)](https://travis-ci.org/willprice/generator-ansible)
[![codecov.io](https://codecov.io/github/willprice/generator-ansible/coverage.svg?branch=master)](https://codecov.io/github/willprice/generator-ansible?branch=master)
[![Code
Climate](https://codeclimate.com/github/willprice/generator-ansible/badges/gpa.svg)](https://codeclimate.com/github/willprice/generator-ansible)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![devDependencies](https://david-dm.org/willprice/generator-ansible.svg)](https://david-dm.org/willprice/generator-ansible)

A [Yeoman](http://yeoman.io) generator for [Ansible](https://www.ansible.com/)
playbooks and roles.

## Usage

Note, this generator conflicts with the [existing generator](https://www.npmjs.com/package/generator-ansible)
on npm.

```sh
$ npm install git+https://git@github.com/will.price/generator-ansible
$ yo ansible         # generate a playbook
$ yo ansible:role    # generate a role
```

## Developer Usage

1. Clone the repository
2. Link the library: `sudo npm link`
3. Develop and test


## Contributing

- Fork the code
- Make your changes (with tests)
- Don't break existing tests
- Submit a pull request
