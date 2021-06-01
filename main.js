const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'B', url: 'https://bytedance.feishu.cn/base/app8Ok6k9qafpMkgyRbfgxeEnet?table=tblEnSV2PNAajtWE&view=vewTe1iz28' },
    { logo: 'I', url: 'https://www.iconfont.cn/' },
    { logo: 'W', url: 'https://wangdoc.com' },
    { logo: 'L', url: 'https://leetcode-cn.com/' },
    { logo: 'Z', url: 'https://www.zhangxinxu.com/wordpress/' },
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
    .replace( 'http://', '' )
    .replace( 'www.', '' )
    .replace( /\/.*/, '' )
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(
            `<li>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-close1"></use>
                        </svg>
                    </div>
                </div>
            </li>`
        ).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })        
    })
}

render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是啥？')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            logoType: 'text',
            url: url
        })
        render()
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const {key} = e
    for(let i = 0; i < hashMap.length; i++) {
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }        
    }
})