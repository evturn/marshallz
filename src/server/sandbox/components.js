import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectBot, fetchBot, abortFetchBot } from './actions';
import './ui/less/style.less'

const BotSelection = ({ avatar, displayName }) => (
  <div className="selection">
    <img src={avatar} />
    <div>{displayName}</div>
  </div>
)

const Bot = ({ selectBot, bot }) => (
  <div className='bot' onClick={() => selectBot(bot)}>
    <img src={bot.headshot} />
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
    <div className="main">
      <div className="bots">
        {SB.bots.map(x => <Bot key={x.name} selectBot={selectBot} bot={x} />)}
        {SB.selected ? <BotSelection { ...SB.selected } /> : null}
      </div>
    </div>
  </div>
)



const mapStateToProps = ({ SB }) => ({ SB });

const mapDispatchToProps = (dispatch) => ({
  selectBot: bot => dispatch(selectBot(bot)),
  fetchBot: () => dispatch(fetchBot()),
  abortFetchBot: () => dispatch(abortFetchBot())
})

export default connect(mapStateToProps, mapDispatchToProps)(Robo)