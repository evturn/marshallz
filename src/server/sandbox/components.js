import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectBot, fetchBot, abortFetchBot } from './actions';
import './ui/less/style.less'

const Robo = ({ bot, selectBot, fetchBot, abortFetchBot }) => (
  <div>
    <header>
      <div className="header">
        <div className="logo">
          <div className="top">Run</div>
          <div className="bottom">Bot</div>
        </div>
      </div>
    </header>
    <div>{bot.bots.map(x =>
      <div key={x.name} onClick={() => selectBot(x)} className='bot'>
        <img src={x.headshot} />
        <div>{x.displayName}</div>
      </div>)
    }</div>
    {bot.selected ? (
      <div>
        <div>{bot.selected.displayName}</div>
        <img src={bot.selected.avatar} />
      </div>)
    : null}
  </div>
)



const mapStateToProps = ({ bot }) => ({ bot });

const mapDispatchToProps = (dispatch) => ({
  selectBot: bot => dispatch(selectBot(bot)),
  fetchBot: () => dispatch(fetchBot()),
  abortFetchBot: () => dispatch(abortFetchBot())
})

export default connect(mapStateToProps, mapDispatchToProps)(Robo)