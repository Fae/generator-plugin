'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-plugin:app', () =>
{
    before(() => helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
            name: 'test',
            description: 'test desc',
            isOfficial: true,
        })
        .toPromise());

    it('creates files', () =>
    {
        assert.file([
            'package.json',
            'src/index.js',
            'test/.eslintrc.json',
        ]);
    });
});
