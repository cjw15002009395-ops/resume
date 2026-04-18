const STORAGE_KEY = 'resume_data'
const TEMPLATE_KEY = 'resume_template_id'

const DEFAULT_DATA = {
  basicInfo: {
    name: '',
    phone: '',
    email: '',
    summary: '',
    avatar: ''
  },
  education: [],
  workExperience: [],
  skills: [],
  projects: []
}

function getResumeData() {
  try {
    const data = wx.getStorageSync(STORAGE_KEY)
    if (!data) return JSON.parse(JSON.stringify(DEFAULT_DATA))
    return {
      basicInfo: { ...DEFAULT_DATA.basicInfo, ...data.basicInfo },
      education: data.education || [],
      workExperience: data.workExperience || [],
      skills: data.skills || [],
      projects: data.projects || []
    }
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_DATA))
  }
}

function saveResumeData(data) {
  wx.setStorageSync(STORAGE_KEY, data)
}

function getSectionData(sectionKey) {
  const data = getResumeData()
  return data[sectionKey] || null
}

function saveSectionData(sectionKey, value) {
  const data = getResumeData()
  data[sectionKey] = value
  saveResumeData(data)
}

function getTemplateId() {
  try {
    return wx.getStorageSync(TEMPLATE_KEY) || 'classic'
  } catch (e) {
    return 'classic'
  }
}

function saveTemplateId(id) {
  wx.setStorageSync(TEMPLATE_KEY, id)
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
}

module.exports = {
  getResumeData,
  saveResumeData,
  getSectionData,
  saveSectionData,
  getTemplateId,
  saveTemplateId,
  generateId
}