import React from 'react'
import GameCarousel from './GameCarousel';
import GameCard from './GameCardMain'
import NavFooter from './NavFooter';
import Copyright from './CopyRight';
import Helper from './Helper';

export default function Main() {
  return (
    <div style={{backgroundColor:'#101014' }}>
        <Helper/>
        <div style={{marginTop: '65px' }}>
        <GameCarousel/>
        <GameCard/>
        <footer>
        <NavFooter />
        <Copyright />
      </footer>
      </div>
    </div>
  )
}
