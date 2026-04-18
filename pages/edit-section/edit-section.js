const storage = require('../../utils/storage')

const SECTION_CONFIG = {
  basicInfo: {
    title: '基础信息',
    type: 'single',
    fields: [
      { key: 'avatar', label: '个人头像', type: 'image' },
      { key: 'name', label: '姓名', type: 'text', placeholder: '请输入姓名' },
      { key: 'gender', label: '性别', type: 'picker', options: ['男', '女'] },
      { key: 'age', label: '年龄', type: 'number', placeholder: '请输入年龄' },
      { key: 'birthday', label: '出生日期', type: 'date', placeholder: '请选择出生日期' },
      { key: 'phone', label: '手机号', type: 'number', placeholder: '请输入手机号' },
      { key: 'email', label: '邮箱', type: 'text', placeholder: '请输入邮箱' },
      { key: 'city', label: '所在城市', type: 'text', placeholder: '请输入所在城市' },
      { key: 'education', label: '学历', type: 'picker', options: ['高中', '大专', '本科', '硕士', '博士'] },
      { key: 'school', label: '毕业院校', type: 'text', placeholder: '请输入毕业院校' },
      { key: 'major', label: '毕业专业', type: 'text', placeholder: '请输入毕业专业' },
      { key: 'politicalStatus', label: '政治面貌', type: 'picker', options: ['群众', '共青团员', '中共党员', '民主党派'] },
      { key: 'workYears', label: '工作年限', type: 'number', placeholder: '请输入工作年限' }
    ]
  },
  jobIntention: {
    title: '求职意向',
    type: 'single',
    fields: [
      { key: 'position', label: '期望职位', type: 'text', placeholder: '请输入期望职位' },
      { key: 'location', label: '期望地点', type: 'text', placeholder: '请输入期望城市' },
      { key: 'salary', label: '期望薪资', type: 'text', placeholder: '如: 15K-20K' }
    ]
  },
  selfEvaluation: {
    title: '自我评价',
    type: 'single',
    fields: [
      { key: 'content', label: '自我评价', type: 'textarea', placeholder: '总结你的优势和亮点' }
    ]
  },
  education: {
    title: '教育经历',
    type: 'list',
    fields: [
      { key: 'school', label: '学校', type: 'text', placeholder: '请输入学校名称' },
      { key: 'major', label: '专业', type: 'text', placeholder: '请输入专业' },
      { key: 'degree', label: '学历', type: 'picker', options: ['高中', '大专', '本科', '硕士', '博士'] },
      { key: 'startDate', label: '开始时间', type: 'date', placeholder: '请选择开始时间' },
      { key: 'endDate', label: '结束时间', type: 'date', placeholder: '请选择结束时间' }
    ]
  },
  schoolExperience: {
    title: '在校经历',
    type: 'list',
    fields: [
      { key: 'title', label: '经历名称', type: 'text', placeholder: '如: 学生会主席' },
      { key: 'role', label: '担任角色', type: 'text', placeholder: '请输入担任角色' },
      { key: 'startDate', label: '开始时间', type: 'date', placeholder: '请选择开始时间' },
      { key: 'endDate', label: '结束时间', type: 'date', placeholder: '请选择结束时间' },
      { key: 'description', label: '详细描述', type: 'textarea', placeholder: '请输入详细描述' }
    ]
  },
  internship: {
    title: '实习经历',
    type: 'list',
    fields: [
      { key: 'company', label: '公司名称', type: 'text', placeholder: '请输入公司名称' },
      { key: 'position', label: '实习岗位', type: 'text', placeholder: '请输入实习岗位' },
      { key: 'startDate', label: '开始时间', type: 'date', placeholder: '请选择开始时间' },
      { key: 'endDate', label: '结束时间', type: 'date', placeholder: '请选择结束时间' },
      { key: 'description', label: '工作描述', type: 'textarea', placeholder: '请输入工作描述' }
    ]
  },
  workExperience: {
    title: '工作经历',
    type: 'list',
    fields: [
      { key: 'company', label: '公司', type: 'text', placeholder: '请输入公司名称' },
      { key: 'position', label: '职位', type: 'text', placeholder: '请输入职位' },
      { key: 'startDate', label: '开始时间', type: 'date', placeholder: '请选择开始时间' },
      { key: 'endDate', label: '结束时间', type: 'date', placeholder: '请选择结束时间' },
      { key: 'description', label: '工作描述', type: 'textarea', placeholder: '请输入工作描述' }
    ]
  },
  projects: {
    title: '项目经历',
    type: 'list',
    fields: [
      { key: 'name', label: '项目名称', type: 'text', placeholder: '请输入项目名称' },
      { key: 'role', label: '担任角色', type: 'text', placeholder: '请输入担任角色' },
      { key: 'startDate', label: '开始时间', type: 'date', placeholder: '请选择开始时间' },
      { key: 'endDate', label: '结束时间', type: 'date', placeholder: '请选择结束时间' },
      { key: 'description', label: '项目描述', type: 'textarea', placeholder: '请输入项目描述' }
    ]
  },
  skills: {
    title: '职业技能',
    type: 'list',
    fields: [
      { key: 'name', label: '技能名称', type: 'text', placeholder: '请输入技能名称' },
      { key: 'level', label: '熟练度', type: 'slider', min: 0, max: 100 }
    ]
  },
  awards: {
    title: '获奖证书',
    type: 'list',
    fields: [
      { key: 'title', label: '奖项/证书名称', type: 'text', placeholder: '请输入名称' },
      { key: 'date', label: '获得时间', type: 'date', placeholder: '请选择时间' },
      { key: 'description', label: '详细说明', type: 'textarea', placeholder: '请输入说明' }
    ]
  },
  hobbies: {
    title: '兴趣爱好',
    type: 'single',
    fields: [
      { key: 'content', label: '兴趣爱好', type: 'textarea', placeholder: '描述你的兴趣爱好' }
    ]
  }
}

Page({
  data: {
    sectionKey: '',
    sectionConfig: null,
    fields: [],
    formData: {},
    pickerOptions: [],
    pickerIndex: 0,
    isNew: true
  },

  onLoad(options) {
    const sectionKey = options.section
    const index = options.index !== undefined ? parseInt(options.index) : -1
    const mode = options.mode || 'edit'
    const config = SECTION_CONFIG[sectionKey]
    const isNew = mode === 'add' || index === -1

    let formData = {}
    if (config.type === 'single') {
      const resumeData = storage.getResumeData()
      if (sectionKey === 'selfEvaluation' || sectionKey === 'hobbies') {
        formData = { content: resumeData[sectionKey] || '' }
      } else {
        formData = { ...resumeData[sectionKey] }
      }
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
      pickerOptions: config.fields.filter(f => f.type === 'picker'),
      pickerIndex: 0
    })

    wx.setNavigationBarTitle({ title: config.title })
  },

  onFieldInput(e) {
    const key = e.currentTarget.dataset.key
    this.setData({ [`formData.${key}`]: e.detail.value })
  },

  onDateChange(e) {
    const key = e.currentTarget.dataset.key
    this.setData({ [`formData.${key}`]: e.detail.value })
  },

  onSliderChange(e) {
    const key = e.currentTarget.dataset.key
    this.setData({ [`formData.${key}`]: e.detail.value })
  },

  onPickerChange(e) {
    const key = e.currentTarget.dataset.key
    const idx = e.detail.value
    const field = this.data.fields.find(f => f.key === key)
    if (field && field.options) {
      this.setData({
        [`formData.${key}`]: field.options[idx]
      })
    }
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
  },

  save() {
    const { sectionKey, formData, isNew, editIndex } = this.data

    if (sectionKey === 'selfEvaluation' || sectionKey === 'hobbies') {
      storage.saveSectionData(sectionKey, formData.content || '')
    } else if (sectionKey === 'basicInfo' || sectionKey === 'jobIntention') {
      storage.saveSectionData(sectionKey, formData)
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
  }
})
