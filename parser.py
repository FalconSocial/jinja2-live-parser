# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, Markup
from jinja2 import Template, Environment, meta, FileSystemLoader
from random import choice
import json
import os


app = Flask(__name__)


def _load_template(channel, prefix, name):
    env = Environment(
        loader=FileSystemLoader(os.path.join('/opt', channel, prefix)))
    return env.get_template(name)


@app.route('/render/<channel>/<prefix>/<name>', methods=['GET'])
def render(channel, prefix, name):
    template = _load_template(channel, prefix, name)
    rendered_tpl = template.render()
    return render_template('index.html', output=Markup(rendered_tpl))


@app.route('/render/<channel>/<prefix>/<name>', methods=['POST'])
def render_post(channel, prefix, name):
    template = _load_template(channel, prefix, name)
    values = request.form.get('values')
    try:
        values = json.loads(values) if values else {}
    except:
        return 'Invalid JSON!'
    rendered_tpl = template.render(values)

    if bool(int(request.form['showwhitespaces'])):
        rendered_tpl = rendered_tpl.replace(' ', u'•')

    return Markup(rendered_tpl)


if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0')