Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    count: {
      type: Number,
      value: 0
    },
    showAdd: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onAddTap() {
      this.triggerEvent('add')
    },

    onItemTap(e) {
      this.triggerEvent('itemtap', { index: e.currentTarget.dataset.index })
    },

    onDeleteTap(e) {
      this.triggerEvent('delete', { index: e.currentTarget.dataset.index })
    }
  }
})