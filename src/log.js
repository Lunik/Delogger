'use strict'

import fs from 'fs'
import path from 'path'
import colors from 'colors'

export default class Log {
  constructor (moduleName, path) {
    this.module = moduleName
    this.path = path
  }

  info (text) {
    var string = `[${getDate()}]${colors.green.bold(' [Info]\t')}`
    if (this.module) {
      string += `[${this.module}]`
    }
    string += ` ${text}`
    this.echo(string)
    this.save(colors.strip(string))
  }
  warning (text) {
    var string = `[${getDate()}]${colors.yellow.bold(' [Warning]\t')}`
    if (this.module) {
      string += `[${this.module}]`
    }
    string += ` ${text}`
    this.echo(string)
    this.save(colors.strip(string))
  }
  error (text) {
    var string = `[${getDate()}]${colors.red.bold(' [Error]\t')}`
    if (this.module) {
      string += `[${this.module}]`
    }
    string += ` ${text}`
    this.echo(string)
    this.save(colors.strip(string))
  }

  save (text) {
    if (this.path) {
      fs.appendFile(getFile(this.path, this.module), `${text}\n`, (err) => {
        if (err) {
          console.error(err)
        }
      })
    }
  }
  echo (text) {
    console.log(text)
  }
  trace (text) {
    console.log(text)
    console.trace()
  }
}

function getFile (savePath, moduleName) {
  var date = new Date()
  return path.join(savePath, `${moduleName}.log`)
}

function getDate () {
  var date = new Date()
  return formatDateNumbers(`${formatDateNumbers(date.getDate())}/${formatDateNumbers(date.getMonth() + 1)}/${formatDateNumbers(date.getFullYear())} ${formatDateNumbers(date.getHours())}:${formatDateNumbers(date.getMinutes())}:${formatDateNumbers(date.getSeconds())}`)
}

function formatDateNumbers (num) {
  num = num.toString()
  while (num.length < 2) {
    num = `0${num}`
  }
  return num
}