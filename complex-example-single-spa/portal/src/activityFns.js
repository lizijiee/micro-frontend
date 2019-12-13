// 利用single-spa构建路由分发系统
export function prefix(location, ...prefixes) {
  return prefixes.some(
    prefix => (
      location.href.indexOf(`${location.origin}/${prefix}`) !== -1
    )
  )
}
// return true 则加载 false则不加载
// 这里的menu是菜单，按理应该一直加载出来的，因此return true
export function menu(location) {
  return true
}

export function project1(location) {
  return prefix(location, '', 'page1', 'page2', 'page5')
}

export function project2(location) {
  return prefix(location, 'page3', 'page4')
}