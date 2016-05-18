import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectBot, selectJob, selectSrc } from './actions';
import './ui/less/style.less'

const Src = ({ selectSrc, src}) => (
  <div className='src' onClick={() => selectSrc(src)}>
    <span className={src.icon} />
  </div>
)

const Job = ({ selectJob, job}) => (
  <div className='job' onClick={() => selectJob(job)}>
    <span className={job.icon} />
  </div>
)

const BotSelection = ({ avatar, displayName }) => (
  <div className="selection">
    <img src={avatar} />
    <div>{displayName}</div>
  </div>
)

const JobSelection = ({ icon, name }) => (
  <div className="selection">
    <span className={icon} />
    <div>{name}</div>
  </div>
)

const SrcSelection = ({ icon, name }) => (
  <div className="selection">
    <span className={icon} />
    <div>{name}</div>
  </div>
)

const Bot = ({ selectBot, bot }) => (
  <div className='bot' onClick={() => selectBot(bot)}>
    <img src={bot.headshot} />
  </div>
)

const Robo = ({ SB, selectBot, selectJob, selectSrc }) => (
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
        {SB.selected && SB.selected.bot ? <BotSelection { ...SB.selected.bot } /> : null}
      </div>
      <div className="jobs">
        {SB.jobs.map(x => <Job key={x.name} selectJob={selectJob} job={x} />)}
        {SB.selected && SB.selected.job ? <JobSelection { ...SB.selected.job } /> : null}
      </div>
      <div className="srcs">
        {SB.srcs.map(x => <Src key={x.name} selectSrc={selectSrc} src={x} />)}
        {SB.selected && SB.selected.src ? <SrcSelection { ...SB.selected.src } /> : null}
      </div>
    </div>
  </div>
)

const mapStateToProps = ({ SB }) => ({ SB });

const mapDispatchToProps = (dispatch) => ({
  selectBot: bot => dispatch(selectBot(bot)),
  selectJob: job => dispatch(selectJob(job)),
  selectSrc: src => dispatch(selectSrc(src)),
  fetchBot: () => dispatch(fetchBot()),
  abortFetchBot: () => dispatch(abortFetchBot())
})

export default connect(mapStateToProps, mapDispatchToProps)(Robo)