const storage = require('../../utils/storage')

Page({
  data: {
    resumeData: null,
    isEmpty: true,
    templateId: 'classic'
  },

  onShow() {
    this.loadResumeData()
  },

  loadResumeData() {
    const resumeData = storage.getResumeData()
    const hasBasicInfo = resumeData.basicInfo && resumeData.basicInfo.name
    const templateId = storage.getTemplateId()
    this.setData({
      resumeData,
      isEmpty: !hasBasicInfo,
      templateId
    })
  },

  goToEdit() {
    wx.navigateTo({ url: '/pages/edit/edit' })
  }
})
