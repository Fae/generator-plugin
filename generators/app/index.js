/* eslint-env node */
'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({
    prompting()
    {
        // Have Yeoman greet the user.
        this.log(yosay(`${chalk.red('Fae Plugin')} generator:`));

        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the plugin\'s name:',
            },
            {
                type: 'input',
                name: 'description',
                message: 'Enter a short description of this plugin:',
            },
            {
                type: 'confirm',
                name: 'isOfficial',
                message: 'Is this an official plugin?',
                default: false,
            },
            {
                type: 'input',
                name: 'githubUrl',
                message: 'Enter the URL for the github page:',
                when: (props) => !props.isOfficial,
            },
            {
                type: 'input',
                name: 'authorName',
                message: 'Author Name:',
                when: (props) => !props.isOfficial,
            },
            {
                type: 'input',
                name: 'authorEmail',
                message: 'Author Email:',
                when: (props) => !props.isOfficial,
            },
        ])
        .then((props) =>
        {
            if (props.isOfficial)
            {
                props.githubUrl = 'https://github.com/Fae/fae';
                props.authorName = 'Chad Engler';
                props.authorEmail = 'chad@pantherdev.com';
            }

            // To access props later use this.props.someAnswer;
            this.props = props;
        });
    },

    writing()
    {
        // root files
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            this.props
        );

        // src files
        this.fs.copy(
            this.templatePath('src/index.js'),
            this.destinationPath('src/index.js')
        );

        // test files
        this.fs.copy(
            this.templatePath('test/_eslintrc.json'),
            this.destinationPath('test/.eslintrc.json')
        );
    },

    install()
    {
        this.installDependencies();
    },
});
