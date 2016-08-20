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

        const prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter the plugin\'s name:',
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
                default: 'https://github.com/Fae/fae',
                when: (props) => !props.isOfficial,
            },
        ];

        return this.prompt(prompts).then((props) =>
        {
            // To access props later use this.props.someAnswer;
            this.props = props;
        });
    },

    writing()
    {
        // root files
        this.fs.copyTpl(
            this.templatePath('package.json'),
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
            this.templatePath('test/_.eslintrc.json'),
            this.destinationPath('test/.eslintrc.json')
        );
    },

    install()
    {
        this.installDependencies();
    },
});
