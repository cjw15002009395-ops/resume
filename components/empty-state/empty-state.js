Component({
  properties: {
    message: {
      type: String,
      value: '暂无内容'
    },
    buttonText: {
      type: String,
      value: '添加'
    },
    showButton: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onAction() {
      this.triggerEvent('action')
    }
  }
})