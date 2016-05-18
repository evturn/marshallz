import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IntlProvider, FormattedRelative } from 'react-intl'
import { selectOption, runBot } from './actions';
import './ui/less/style.less'

const Src = ({ selectOption, src}) => (
  <div className='src' onClick={() => selectOption({ type: 'src', ...src })}>
    <span className={src.icon} />
  </div>
)

const Job = ({ selectOption, job}) => (
  <div className='job' onClick={() => selectOption({ type: 'job', ...job })}>
    <span className={job.icon} />
  </div>
)

const Bot = ({ selectOption, bot }) => (
  <div className='bot' onClick={() => selectOption({ type: 'bot', ...bot })}>
    <img src={bot.headshot} />
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

const Time = ({ date }) => (
  <IntlProvider locale="en">
    <div>
      <FormattedRelative value={date} />
    </div>
  </IntlProvider>
)

const Run = ({ ready, selected, runBot }) => (
  <div className="ctrls">
    <div className={`btn ${ready ? 'ready' : 'disabled'}`} onClick={() => runBot(selected)}>
      <span>Run</span>
    </div>
    <div className="btn">
      <span>Clr</span>
    </div>
  </div>
)

const Output = ({ ready, runBot, selected }) => (
  <div className="output">
    <div>Console</div>
    <Run ready={ready} selected={selected} runBot={runBot} />
    <div className="timeline">

      <div className="log">
        <span className="fa fa-check" />
        <span className="fa fa-hashtag" />
        <div className="name">Marshall</div>
        <div className="date">
          <Time date={Date.now()} />
        </div>
        <div className="result">
          Message to be displayed from content
        </div>
      </div>

      <div className="log error">
        <span className="fa fa-close" />
        <span className="fa fa-file-text-o" />
        <div className="name">b0rf</div>
        <div className="date">
          <Time date={Date.now()} />
        </div>
        <div className="result">
          Message to be displayed from content
        </div>
      </div>
    </div>
  </div>
)

const Robo = ({ SB, selectOption, runBot }) => (
  <div className="root">
    <div className="main">
      <div className="panel">
        <div className="bots">
          {SB.bots.map(x => <Bot key={x.name} selectOption={selectOption} bot={x} />)}
          {SB.selected && SB.selected.bot ? <BotSelection { ...SB.selected.bot } /> : null}
        </div>
        <div className="jobs">
          {SB.jobs.map(x => <Job key={x.name} selectOption={selectOption} job={x} />)}
          {SB.selected && SB.selected.job ? <JobSelection { ...SB.selected.job } /> : null}
        </div>
        <div className="srcs">
          {SB.srcs.map(x => <Src key={x.name} selectOption={selectOption} src={x} />)}
          {SB.selected && SB.selected.src ? <SrcSelection { ...SB.selected.src } /> : null}
        </div>
      </div>
      <Output ready={SB.ready} selected={SB.selected} runBot={runBot} />
    </div>
  </div>
)

const mapStateToProps = ({ SB }) => ({ SB })

const mapDispatchToProps = (dispatch) => ({
  selectOption: selection => dispatch(selectOption(selection)),
  runBot: selected => dispatch(runBot(selected))
})

export default connect(mapStateToProps, mapDispatchToProps)(Robo)