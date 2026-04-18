const STORAGE_KEY = 'resume_data'
const TEMPLATE_KEY = 'resume_template_id'

const DEFAULT_DATA = {
  basicInfo: {
    avatar: '',
    name: '',
    gender: '',
    age: '',
    birthday: '',
    phone: '',
    email: '',
    city: '',
    education: '',
    school: '',
    major: '',
    politicalStatus: '',
    workYears: ''
  },
  jobIntention: {
    position: '',
    location: '',
    salary: ''
  },
  selfEvaluation: '',
  education: [],
  schoolExperience: [],
  internship: [],
  workExperience: [],
  projects: [],
  skills: [],
  awards: [],
  hobbies: ''
}

function getResumeData() {
  try {
    const data = wx.getStorageSync(STORAGE_KEY)
    if (!data) return JSON.parse(JSON.stringify(DEFAULT_DATA))
    return {
      basicInfo: { ...DEFAULT_DATA.basicInfo, ...(data.basicInfo || {}) },
      jobIntention: { ...DEFAULT_DATA.jobIntention, ...(data.jobIntention || {}) },
      selfEvaluation: data.selfEvaluation || '',
      education: data.education || [],
      schoolExperience: data.schoolExperience || [],
      internship: data.internship || [],
      workExperience: data.workExperience || [],
      projects: data.projects || [],
      skills: data.skills || [],
      awards: data.awards || [],
      hobbies: data.hobbies || ''
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
  return data[sectionKey] !== undefined ? data[sectionKey] : null
}

function saveSectionData(sectionKey, value) {
  const data = getResumeData()
  data[sectionKey] = value
  saveResumeData(data)
}

function getTemplateId() {
  try {
    return wx.getStorageSync(TEMPLATE_KEY) || 'a'
  } catch (e) {
    return 'a'
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
