#! /usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, Markup, send_from_directory
from jinja2 import Template, Environment, meta, FileSystemLoader
from random import choice
from dronte import Objector
import json
import os
import premailer


app = Flask(__name__)


def _load_template(channel, prefix, name):
    env = Environment(
        loader=FileSystemLoader(os.path.join(app.config['templates_path'], channel, prefix)))
    print(env)
    return env.get_template(name)

@app.route('/<path:p>')
def get_static(p):
    return send_from_directory(app.config['base_url'], p)

@app.route('/render/<channel>/<prefix>/<name>', methods=['GET'])
def render(channel, prefix, name):
    template = _load_template(channel, prefix, name)
    rendered_tpl = template.render()
    return render_template('index.html', output=Markup(rendered_tpl))


@app.route('/render/<channel>/<prefix>/<name>', methods=['POST'])
def render_post(channel, prefix, name):
    template = _load_template(channel, prefix, name)
    values = request.get_json()
    rendered_tpl = template.render(values.get('data'))
    if values.get('show_whitespaces'):
        rendered_tpl = rendered_tpl.replace(' ', u'•')

    return Markup(rendered_tpl)


@app.route('/inline', methods=['POST'])
def inline_css():
    values = request.get_json()
    return premailer.transform(values.get('html'), base_url=app.config.get('base_url', None))


@app.route('/inline/<channel>/<prefix>/<name>', methods=['POST'])
def inline_css_from_file(channel, prefix, name):
    template = _load_template(channel, prefix, name)
    values = request.get_json()
    rendered_tpl = template.render(values.get('data'))
    return premailer.transform(rendered_tpl, base_url=app.config.get('base_url', None))

if __name__ == "__main__":
    config = Objector.from_argv()
    app.config.update(config)
    app.run(host='0.0.0.0', debug=True)
