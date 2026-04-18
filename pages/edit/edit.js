const storage = require('../../utils/storage')
const templates = require('../../utils/templates')

Page({
  data: {
    basicInfo: null,
    education: [],
    workExperience: [],
    skills: [],
    projects: [],
    templateName: '经典专业',
    templateColor: '#07c160',
    sections: [
      { key: 'basicInfo', title: '基本信息', type: 'single' },
      { key: 'education', title: '教育经历', type: 'list' },
      { key: 'workExperience', title: '工作经历', type: 'list' },
      { key: 'skills', title: '专业技能', type: 'list' },
      { key: 'projects', title: '项目经验', type: 'list' }
    ]
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const data = storage.getResumeData()
    const tpl = templates.getTemplate(storage.getTemplateId())
    this.setData({
      basicInfo: data.basicInfo,
      education: data.education,
      workExperience: data.workExperience,
      skills: data.skills,
      projects: data.projects,
      templateName: tpl.name,
      templateColor: tpl.color
    })
  },

  goBack() {
    wx.navigateBack()
  },

  goToTemplates() {
    wx.navigateTo({ url: '/pages/templates/templates' })
  },

  editSection(e) {
    const key = e.currentTarget.dataset.key
    wx.navigateTo({
      url: `/pages/edit-section/edit-section?section=${key}`
    })
  },

  editItem(e) {
    const { key, index } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/edit-section/edit-section?section=${key}&index=${index}`
    })
  },

  addItem(e) {
    const key = e.currentTarget.dataset.key
    wx.navigateTo({
      url: `/pages/edit-section/edit-section?section=${key}&mode=add`
    })
  },

  deleteItem(e) {
    const { key, index } = e.currentTarget.dataset
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      success: (res) => {
        if (res.confirm) {
          const list = this.data[key]
          list.splice(index, 1)
          storage.saveSectionData(key, list)
          this.loadData()
        }
      }
    })
  }
})