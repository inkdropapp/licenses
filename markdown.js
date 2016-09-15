const fs = require('fs')
const template = fs.readFileSync('./template.html', 'utf-8')
const json = require('./licenses.json')
const items = Object.keys(json).map(function (key) {
  const item = json[key]
  let licenseText
  let licenseUrl
  if (item.licenseFile) {
    licenseText = fs.readFileSync(item.licenseFile, 'utf-8')
  } else {
    if (item.licenses === 'MIT') {
      licenseUrl = 'https://opensource.org/licenses/MIT'
    }
    if (['Apache', 'Apache-2.0', 'Apache 2'].indexOf(item.licenses) >= 0) {
      licenseUrl = 'https://www.apache.org/licenses/LICENSE-2.0'
    }
    if (item.licenses === 'BSD-3-Clause') {
      licenseUrl = 'https://opensource.org/licenses/BSD-3-Clause'
    }
  }
  let content = ''
  if (item.repository) {
    content += '## [' + key + '](' + item.repository + ')\n'
  } else {
    content += '## ' + key + '\n'
  }
  if (item.publisher) {
    content += '### by ' + item.publisher + '\n'
  }
  if (licenseText) {
    content += '\n```\n' + licenseText + '\n```\n'
  } else if (licenseUrl) {
    content += '\n[' + item.licenses + ' License](' + licenseUrl + ')\n'
  } else {
    content += '\n' + item.licenses + '\n'
  }
  return content
})
const body = items.join('\n')
const output = '# Credits\n' + body
console.log(output)
