const { VUE_APP_API_URL, VUE_APP_NAV_URL, VUE_APP_WEB_URL, VUE_APP_OSS_URL, VUE_APP_SOCKET_URL } = process.env

export const NODE_ENV = process.env.NODE_ENV // 环境变量

export const NAV_URL = VUE_APP_NAV_URL // 导航url

export const WEB_URL = VUE_APP_WEB_URL // 网页url

export const API_URL = VUE_APP_API_URL // 接口url

export const OSS_URL = VUE_APP_OSS_URL // 阿里云上传域名

export const SOCKET_URL = VUE_APP_SOCKET_URL // socket url

export const LOGIN_STATUS = 'Login_Status' // 登录状态

export const ACCESS_TOKEN = 'Access_Token' // 登录token

export const USER_INFO = 'User_Info' // 用户信息

export const SELECT_PROPS = {
  allowClear: true,
  showSearch: true,
  optionFilterProp: 'children',
  filterOption: (input, option) => option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0,
  style: { width: '140px' }
}
