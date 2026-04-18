const templates = require('../../utils/templates')
const storage = require('../../utils/storage')

Page({
  data: {
    templateList: [],
    currentId: 'classic'
  },

  onLoad() {
    const templateList = templates.getTemplateList()
    const currentId = storage.getTemplateId()
    this.setData({ templateList, currentId })
  },

  selectTemplate(e) {
    const id = e.currentTarget.dataset.id
    storage.saveTemplateId(id)
    this.setData({ currentId: id })
    wx.showToast({ title: '已切换模板', icon: 'success' })
  },

  goPreview() {
    wx.navigateBack()
  }
})
