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
  let content = '<article>'
  if (item.repository) {
    content += '<h3><a href="' + item.repository + '">' + key + '</a></h3>'
  } else {
    content += '<h3>' + key + '</h3>'
  }
  if (item.publisher) {
    content += '<h4>by ' + item.publisher + '</h4>'
  }
  content += '<section>'
  if (licenseText) {
    content += '<pre class="license-text">' + licenseText + '</pre>'
  } else if (licenseUrl) {
    content += '<div><a href="' + licenseUrl + '">' + item.licenses + ' License</a></div>'
  } else {
    content += '<div>' + item.licenses + '</div>'
  }
  content += '</section>'
  content += '</article>'
  return content
})
const body = items.join('')
const output = template.replace('<% body %>', body)
console.log(output)
