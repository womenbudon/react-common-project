/**
 * @flow
 */
import React from 'react';


const header = () => {
  const logout = () => {
    sessionStorage.removeItem('loginStatus');
    window.location.href = '/login';
  }

  return (
    <div className="header">
      <span className="logo" >新农通平台管理</span>
      <span className="exit">
        <i className="icon iconfont icon-tuichu" onClick={logout} />
      </span>
    </div>
  )
}

export default header

