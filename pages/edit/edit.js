const storage = require('../../utils/storage')
const templates = require('../../utils/templates')

Page({
  data: {
    basicInfo: null,
    jobIntention: null,
    selfEvaluation: '',
    templateName: '经典蓝白',
    templateColor: '#007AFF',
    // 模块配置
    moduleConfig: [
      { key: 'education', title: '教育经历', icon: '🎓', type: 'list' },
      { key: 'schoolExperience', title: '在校经历', icon: '📖', type: 'list' },
      { key: 'internship', title: '实习经历', icon: '💼', type: 'list' },
      { key: 'workExperience', title: '工作经历', icon: '🏢', type: 'list' },
      { key: 'projects', title: '项目经历', icon: '📁', type: 'list' },
      { key: 'skills', title: '职业技能', icon: '⚙️', type: 'list' },
      { key: 'awards', title: '获奖证书', icon: '🏆', type: 'list' },
      { key: 'hobbies', title: '兴趣爱好', icon: '🔥', type: 'text' }
    ],
    // 已有数据的模块
    activeModules: []
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const data = storage.getResumeData()
    const tpl = templates.getTemplate(storage.getTemplateId())

    // 计算哪些模块有数据
    const activeModules = []
    this.data.moduleConfig.forEach(m => {
      const sectionData = data[m.key]
      const items = Array.isArray(sectionData) ? sectionData : []
      if (items.length > 0) {
        activeModules.push({ ...m, items })
      }
    })

    this.setData({
      basicInfo: data.basicInfo,
      jobIntention: data.jobIntention,
      selfEvaluation: data.selfEvaluation,
      activeModules,
      templateName: tpl.name,
      templateColor: tpl.color
    })
  },

  goToTemplates() {
    wx.navigateTo({ url: '/pages/templates/templates' })
  },

  editBasicInfo() {
    wx.navigateTo({ url: '/pages/edit-section/edit-section?section=basicInfo' })
  },

  editJobIntention() {
    wx.navigateTo({ url: '/pages/edit-section/edit-section?section=jobIntention' })
  },

  editSelfEvaluation() {
    wx.navigateTo({ url: '/pages/edit-section/edit-section?section=selfEvaluation' })
  },

  addModuleItem(e) {
    const key = e.currentTarget.dataset.key
    if (key === 'hobbies') {
      wx.navigateTo({ url: '/pages/edit-section/edit-section?section=hobbies' })
    } else {
      wx.navigateTo({ url: `/pages/edit-section/edit-section?section=${key}&mode=add` })
    }
  },

  editModuleItem(e) {
    const { key, index } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/edit-section/edit-section?section=${key}&index=${index}` })
  },

  deleteModuleItem(e) {
    const { key, index } = e.currentTarget.dataset
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      success: (res) => {
        if (res.confirm) {
          const list = storage.getSectionData(key) || []
          list.splice(index, 1)
          storage.saveSectionData(key, list)
          this.loadData()
        }
      }
    })
  },

  onChooseAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempPath = res.tempFiles[0].tempFilePath
        wx.compressImage({
          src: tempPath,
          quality: 50,
          success: (compRes) => {
            const fs = wx.getFileSystemManager()
            fs.readFile({
              filePath: compRes.tempFilePath,
              encoding: 'base64',
              success: (readRes) => {
                const base64 = 'data:image/jpeg;base64,' + readRes.data
                if (base64.length > 200 * 1024) {
                  wx.showToast({ title: '图片过大', icon: 'none' })
                  return
                }
                const data = storage.getResumeData()
                data.basicInfo.avatar = base64
                storage.saveResumeData(data)
                this.loadData()
              }
            })
          }
        })
      }
    })
  }
})
