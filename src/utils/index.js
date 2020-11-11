import Moment from 'moment'
import 'moment/locale/zh-cn'
import store from '@/store'
import { DEFAULT_TITLE } from '@/utils/constants'

Moment.locale('zh-cn')

/**
 * moment实例
 */
export const moment = Moment

/**
 * 判断url
 * @param path
 * @returns {boolean}
 */
export const isUrl = path => {
  /* eslint no-useless-escape:0 */
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

/**
 * 外部url
 * @param path
 * @returns {boolean}
 */
export const isExternalUrl = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 防抖
 * @param func
 * @param delay
 * @returns {Function}
 */
export const debounce = (func, delay) => {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 截流
 * @param func
 * @param gapTime
 * @returns {Function}
 */
export const throttle = (func, gapTime) => {
  let _lastTime = null

  return function () {
    const _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      func()
      _lastTime = _nowTime
    }
  }
}

/**
 * 冒泡排序
 * @param arr
 * @param fn 升序(a, b) => a - b) 降序 (a, b) => b - a)
 * @returns {*}
 */
export const bubbleSort = (arr, fn) => {
  let len = arr.length
  while (len--) {
    for (let i = 0;
      i < len;
      i++
    ) {
      if (fn(arr[i], arr[i + 1]) > 0) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
    }
  }
  return arr
}

/**
 * 是否拥有类名
 * @param el
 * @param className
 * @returns {boolean}
 */
export const hasClass = (el, className) => {
  return !!el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * 添加类名
 * @param el
 * @param className
 */
export const addClass = (el, className) => {
  if (!hasClass(el, className)) el.className += ' ' + className
}

/**
 * 移除类名
 * @param el
 * @param className
 */
export const removeClass = (el, className) => {
  if (hasClass(el, className)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    el.className = el.className.replace(reg, ' ')
  }
}

/**
 * 切换类名
 * @param el
 * @param className
 */
export const toggleClass = (el, className) => {
  if (!el || !className) return
  let classString = el.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  el.className = classString
}

/**
 * 获取值
 * @param el
 * @param name
 * @param val
 * @returns {*}
 */
export const getData = (el, name, val) => {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

/**
 * 获取距离
 * @param el
 * @returns {{top: number, left: number, width: number, height: number}}
 */
export const getRect = el => {
  if (el instanceof window.SVGElement) {
    const rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

/**
 * 是否是空对象
 * @param object
 * @returns {boolean}
 */
export const isEmptyObj = object => {
  return Object.keys(object).length === 0
}

/**
 * 检查timestamp是否在有效期内
 * @param timestamp 项目更新时间
 * @param validityPeriod 项目有效期
 * @returns {boolean}  true 不需要更新,false需要更新
 */
export const checkTimestampValid = (timestamp, validityPeriod = 24) => {
  const currentDate = new Date()
  const targetDate = new Date()
  targetDate.setTime(timestamp)
  if (currentDate.getMonth() !== targetDate.getMonth()) return false
  if (currentDate.getDate() !== targetDate.getDate()) return false
  if (currentDate.getHours() - targetDate.getHours() > validityPeriod) return false
  // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
  return true
}

/**
 * 触发 window.resize
 */
export const triggerWindowResizeEvent = () => {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export const setPageTitle = (pageTitle = '') => {
  const title = DEFAULT_TITLE
  return pageTitle ? `${pageTitle} - ${title}` : title
}

/**
 * 使用meta.role确定当前用户是否具有权限
 * @param roles 角色数组
 * @param route 路由信息
 * @returns {boolean}
 */
export const hasPermission = (roles, route) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 通过递归过滤异步路由表
 * @param routes 异步路由
 * @param roles 角色数组
 * @returns {[]}
 */
export const filterAsyncRoutes = (routes, roles) => {
  const result = []
  routes.forEach(route => {
    const temp = { ...route }
    if (hasPermission(roles, temp)) {
      if (temp.children) {
        temp.children = filterAsyncRoutes(temp.children, roles)
      }
      result.push(temp)
    }
  })
  return result
}

/**
 * 判断权限
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export const checkPermission = (value) => {
  if (value && value instanceof Array && value.length > 0) {
    const { userInfo: { roles } } = store.getters
    const permissionRoles = value
    return roles.some(role => { return permissionRoles.includes(role) })
  } else {
    console.error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    return false
  }
}

/**
 * 数组转树形结构
 * @param list
 * @param tree
 * @param parentId
 */
export const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    if (item.parendId === parentId) {
      const child = {
        ...item,
        children: []
      }
      listToTree(list, child.children, item.id)
      if (!child.children.length) delete child.children
      tree.push(child)
    }
  })
}

/**
 * 树节点添加标识
 * @param data
 * @param init
 */
export const treeAddLevel = (data = [], init = -1) => {
  for (let i = 0; i < data.length; i++) {
    data[i].level = init + 1
    if (data[i].children && data[i].children.length) {
      treeAddLevel(data[i].children, data[i].level)
    }
  }
}

/**
 * 对象删除 null undefined值
 * @param obj
 */
export const removeEmptyObj = (obj = {}) => {
  Object.keys(obj).forEach(i => {
    if (obj[i] === undefined || obj[i] === null) {
      delete obj[i]
    }
    if (obj[i] && typeof obj[i] === 'object') {
      removeEmptyObj(obj[i])
    }
  })
}

/**
 * 对象 value 去除首尾空格
 * @param obj
 */
export const trimObjValue = (obj = {}) => {
  Object.keys(obj).forEach(i => {
    if (typeof obj[i] === 'string') {
      obj[i] = obj[i].trim()
    }
    if (obj[i] && typeof obj[i] === 'object') {
      trimObjValue(obj[i])
    }
  })
}

/**
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)

/**
 * 截取字符串，根据 maxLength 截取后返回
 * @param {*} str
 * @param {*} maxLength
 */
export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}
