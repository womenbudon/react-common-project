
import React from 'react'
/* eslint import/no-extraneous-dependencies: 0 */
import { createDevTools } from 'redux-devtools'
// 额外的显示包
/* eslint import/no-extraneous-dependencies: 0 */
import LogMonitor from 'redux-devtools-log-monitor'
/* eslint import/no-extraneous-dependencies: 0 */
import DockMonitor from 'redux-devtools-dock-monitor'

// 创建DevTools组件
/* eslint function-paren-newline:0 */
const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    defaultIsVisible={false}
    changePositionKey="ctrl-q"
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>)

export default DevTools
