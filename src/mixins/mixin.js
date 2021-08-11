const mixin = {
  computed: {
    // 计算密码显示等级
    codeStrength() {
      return (value) => {
        let n = 0
        let pwd = value
        let content = ''
        if (/\d+/.test(pwd)) {
          n++
        }
        if (/[A-Za-z]+/.test(pwd)) {
          n++
        }
        if (/[^0-9A-Za-z]+/.test(pwd)) {
          n++
        }
        switch (n) {
          case 1:
            content = '弱'
            break
          case 2:
            content = '中'
            break
          case 3:
            content = '强'
            break
        }
        return content
      }
    },
  },
}

export default mixin
