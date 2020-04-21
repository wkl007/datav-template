module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'camelcase': 0,// 强制驼峰法命名
    'comma-dangle': [0, 'never'],// 对象字面量项尾不能有逗号
    'handle-callback-err': 0,// nodejs 处理错误
    'no-console': 0,// 禁止使用console
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': [0, {
      // 允许声明未使用变量
      'vars': 'local',
      // 参数不检查
      'args': 'none'
    }],
    'no-undef': 0,// 不能有未定义的变量
    'no-async-promise-executor': 0, // 将异步功能用作Promise执行器
    'object-curly-spacing': [0, 'never'],// 大括号内是否允许不必要的空格
    'space-before-function-paren': 0,// 函数定义时括号前面要不要有空格
    'spaced-comment': 2,// 注释空格
    'vue/no-unused-vars': 0
  }
}
