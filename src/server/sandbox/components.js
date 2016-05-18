import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectBot, fetchBot, abortFetchBot } from './actions';
import './ui/less/style.less'

const Bot = ({ selectBot, bot }) => (
  <div className='bot' onClick={() => selectBot(bot)}>
    <img src={bot.headshot} />
    <div>{bot.displayName}</div>
  </div>
)

const Robo = ({ SB, selectBot }) => (
  <div className="root">
    <header>
      <div className="header">
        <div className="logo">
          <div className="top">Run</div>
          <div className="bottom">Bot</div>
        </div>
      </div>
    </header>
    <div>{SB.bots.map(x => <Bot key={x.name} selectBot={selectBot} bot={x} />)}</div>
    {SB.selected ? (
      <div className="bot">
        <div>{SB.selected.displayName}</div>
        <img src={SB.selected.avatar} />
      </div>)
    : null}
  </div>
)



const mapStateToProps = ({ SB }) => ({ SB });

const mapDispatchToProps = (dispatch) => ({
  selectBot: bot => dispatch(selectBot(bot)),
  fetchBot: () => dispatch(fetchBot()),
  abortFetchBot: () => dispatch(abortFetchBot())
})

export default connect(mapStateToProps, mapDispatchToProps)(Robo)