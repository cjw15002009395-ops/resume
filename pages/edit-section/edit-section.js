const storage = require('../../utils/storage')

const SECTION_CONFIG = {
  basicInfo: {
    title: '基本信息',
    fields: [
      { key: 'avatar', label: '个人头像', type: 'image' },
      { key: 'name', label: '姓名', type: 'text', placeholder: '请输入姓名' },
      { key: 'phone', label: '手机号', type: 'number', placeholder: '请输入手机号' },
      { key: 'email', label: '邮箱', type: 'text', placeholder: '请输入邮箱' },
      { key: 'summary', label: '个人简介', type: 'textarea', placeholder: '请输入个人简介' }
    ]
  },
  education: {
    title: '教育经历',
    fields: [
      { key: 'school', label: '学校', type: 'text', placeholder: '请输入学校名称' },
      { key: 'major', label: '专业', type: 'text', placeholder: '请输入专业' },
      { key: 'degree', label: '学历', type: 'picker', options: ['高中', '大专', '本科', '硕士', '博士'] },
      { key: 'startDate', label: '开始时间', type: 'date', placeholder: '请选择开始时间' },
      { key: 'endDate', label: '结束时间', type: 'date', placeholder: '请选择结束时间' }
    ]
  },
  workExperience: {
    title: '工作经历',
    fields: [
      { key: 'company', label: '公司', type: 'text', placeholder: '请输入公司名称' },
      { key: 'position', label: '职位', type: 'text', placeholder: '请输入职位' },
      { key: 'startDate', label: '开始时间', type: 'date', placeholder: '请选择开始时间' },
      { key: 'endDate', label: '结束时间', type: 'date', placeholder: '请选择结束时间' },
      { key: 'description', label: '工作描述', type: 'textarea', placeholder: '请输入工作描述' }
    ]
  },
  skills: {
    title: '专业技能',
    fields: [
      { key: 'name', label: '技能名称', type: 'text', placeholder: '请输入技能名称' },
      { key: 'level', label: '熟练度', type: 'slider', min: 0, max: 100 }
    ]
  },
  projects: {
    title: '项目经验',
    fields: [
      { key: 'name', label: '项目名称', type: 'text', placeholder: '请输入项目名称' },
      { key: 'role', label: '担任角色', type: 'text', placeholder: '请输入担任角色' },
      { key: 'startDate', label: '开始时间', type: 'date', placeholder: '请选择开始时间' },
      { key: 'endDate', label: '结束时间', type: 'date', placeholder: '请选择结束时间' },
      { key: 'description', label: '项目描述', type: 'textarea', placeholder: '请输入项目描述' }
    ]
  }
}

Page({
  data: {
    sectionKey: '',
    sectionConfig: null,
    fields: [],
    formData: {},
    degreeOptions: [],
    degreeIndex: 0,
    isNew: true
  },

  onLoad(options) {
    const sectionKey = options.section
    const index = options.index !== undefined ? parseInt(options.index) : -1
    const mode = options.mode || 'edit'
    const isNew = mode === 'add' || index === -1
    const config = SECTION_CONFIG[sectionKey]

    let formData = {}
    if (sectionKey === 'basicInfo') {
      const resumeData = storage.getResumeData()
      formData = { ...resumeData.basicInfo }
    } else if (!isNew) {
      const list = storage.getSectionData(sectionKey) || []
      formData = { ...list[index] }
    } else {
      config.fields.forEach(f => {
        formData[f.key] = f.type === 'slider' ? 50 : ''
      })
    }

    this.setData({
      sectionKey,
      sectionConfig: config,
      fields: config.fields,
      formData,
      isNew,
      editIndex: index,
      degreeOptions: config.fields.find(f => f.key === 'degree')?.options || []
    })

    wx.setNavigationBarTitle({ title: config.title })
  },

  onFieldInput(e) {
    const key = e.currentTarget.dataset.key
    const value = e.detail.value
    this.setData({ [`formData.${key}`]: value })
  },

  onDateChange(e) {
    const key = e.currentTarget.dataset.key
    this.setData({ [`formData.${key}`]: e.detail.value })
  },

  onSliderChange(e) {
    const key = e.currentTarget.dataset.key
    this.setData({ [`formData.${key}`]: e.detail.value })
  },

  onDegreeChange(e) {
    const index = e.detail.value
    this.setData({
      degreeIndex: index,
      'formData.degree': this.data.degreeOptions[index]
    })
  },

  save() {
    const { sectionKey, formData, isNew, editIndex } = this.data

    if (sectionKey === 'basicInfo') {
      storage.saveSectionData('basicInfo', formData)
    } else {
      const list = storage.getSectionData(sectionKey) || []
      if (isNew) {
        formData.id = storage.generateId()
        list.push(formData)
      } else {
        formData.id = formData.id || storage.generateId()
        list[editIndex] = formData
      }
      storage.saveSectionData(sectionKey, list)
    }

    wx.navigateBack()
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
                  wx.showToast({ title: '图片过大，请选择更小的图片', icon: 'none' })
                  return
                }
                this.setData({ 'formData.avatar': base64 })
              }
            })
          }
        })
      }
    })
  },

  onRemoveAvatar() {
    this.setData({ 'formData.avatar': '' })
  }
})