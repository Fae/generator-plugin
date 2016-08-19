/* eslint-env node */
'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({
    prompting()
    {
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the badass ' + chalk.red('generator-plugin') + ' generator!'
        ));

        const prompts = [{
            type: 'confirm',
            name: 'someAnswer',
            message: 'Would you like to enable this option?',
            default: true,
        }];

        return this.prompt(prompts).then((props) =>
        {
            // To access props later use this.props.someAnswer;
            this.props = props;
        });
    },

    writing()
    {
        this.fs.copy(
            this.templatePath('dummyfile.txt'),
            this.destinationPath('dummyfile.txt')
        );
    },

    install()
    {
        this.installDependencies();
    },
});
