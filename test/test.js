/**
 * Created by lunik on 28/06/2017.
 */

import Log from '../src/log'

var log = new Log('My module', '/tmp')

log.info('This is some info')
log.warning('This is some warning')
log.error('This is some error')
