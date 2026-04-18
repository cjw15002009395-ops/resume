const TEMPLATES = {
  a: {
    id: 'a',
    name: '经典蓝白',
    description: '专业简约，蓝色标题栏',
    color: '#007AFF',
    preview: '/static/templates/a.png'
  },
  b: {
    id: 'b',
    name: '深色优雅',
    description: '深色侧栏，高端质感',
    color: '#2C3E50',
    preview: '/static/templates/b.png'
  }
}

function getTemplateList() {
  return Object.values(TEMPLATES)
}

function getTemplate(id) {
  return TEMPLATES[id] || TEMPLATES.a
}

module.exports = {
  TEMPLATES,
  getTemplateList,
  getTemplate
}
