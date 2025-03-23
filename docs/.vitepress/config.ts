import { getThemeConfig, defineConfig } from '@sugarat/theme/node'

// 主题独有配置
// 详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  // 文章默认作者
  author: 'paidaxing',
  recommend: {
    showSelf: true
  },
  // 开启离线的全文搜索支持（如构建报错可注释下面的配置再次尝试）
  // search: 'pagefind',
})

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: blogTheme,
  lang: 'zh-cn',
  title: 'paidaxing',
  description: '粥里有勺糖的博客主题，基于 vitepress 实现',
  vite: {
    optimizeDeps: {
      include: ['element-plus'],
      exclude: ['@sugarat/theme']
    }
  },
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: '上次更新于',
    footer: {
      message:'',
      copyright:
        'MIT Licensed | <a target="_blank" href="https://theme.sugarat.top/"> @sugarat/theme </a>'
    },
    logo: '/0806_2.jpg',
    nav: [
      { text: '首页', link: '/' },
      { text: '我', link: '/me.html'},
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/'
      }
    ]
  }
})
