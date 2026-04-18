const TEMPLATES = {
  classic: {
    id: 'classic',
    name: '经典专业',
    description: '传统商务风格，适合传统行业',
    color: '#07c160',
    preview: '/static/templates/classic.png'
  },
  minimal: {
    id: 'minimal',
    name: '简约现代',
    description: '简洁留白，适合互联网行业',
    color: '#333333',
    preview: '/static/templates/minimal.png'
  },
  elegant: {
    id: 'elegant',
    name: '优雅蓝调',
    description: '沉稳大气，适合金融/咨询',
    color: '#1a73e8',
    preview: '/static/templates/elegant.png'
  },
  creative: {
    id: 'creative',
    name: '创意活力',
    description: '个性鲜明，适合设计/创意行业',
    color: '#ff6b6b',
    preview: '/static/templates/creative.png'
  }
}

function getTemplateList() {
  return Object.values(TEMPLATES)
}

function getTemplate(id) {
  return TEMPLATES[id] || TEMPLATES.classic
}

module.exports = {
  TEMPLATES,
  getTemplateList,
  getTemplate
}
