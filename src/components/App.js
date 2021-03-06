import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeartImage from '../images/onheart.png'
import { getExp2Lv } from '../reducers/input.js'
import './App.scss';
import axios from 'axios';
import {
  input, input_goal,
  input_item_s, input_item_m, input_item_l, input_money,
  input_juwel_end, input_juwel_all,
  button_change, check_itemflag,
  radio_juweltype, radio_table_hidden, radio_boost,
  select_cards, select_tunes, select_runs,
  button_play, button_moneyrun, button_credit_mode
  } from '../actions'

import {
  ITEM_S, ITEM_M, ITEM_L, MONEY, JUWEL_END, JUWEL_ALL,
  BUTTON_LV,  BUTTON_LV_GOAL,
  BUTTON_ITEM_S,  BUTTON_ITEM_M,  BUTTON_ITEM_L,  BUTTON_MONEY,
  BUTTON_JUWEL_END,  BUTTON_JUWEL_ALL,
  TABLE_HIDDEN_FLAG_360GP, TABLE_HIDDEN_FLAG_370GP, TABLE_HIDDEN_FLAG_BOTH,
  ONE_CREDIT, MONEYRUN_TIME, GAMEPLAY_TIME,
  MODE_360, MODE_370
  } from '../actions/'

const EXP_MONEY = 0.01
const EXP_ITEM_S = 6
const EXP_ITEM_M = 20
const EXP_ITEM_L = 200
const EXP_JUWEL_ALL = 0.5
const EXP_JUWEL_END = 0
const EXP_MONEYRUN_A = 55.5
const EXP_MONEYRUN_B = 54
const MONEYRUN_A = 5550
const MONEYRUN_B = 5400
const EXPEC_JUWEL = 7.5
const EXPEC_MONEY = 200
const SE = "SE"
const SP = "SP"
const TB = "TB"
const PC = "PC"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      simcon_flag: false,
      about_flag: false,
      table_hidden_flag: "TABLE_HIDDEN_FLAG_BOTH",
    }
  }
  simconHandleClick = () => {
    this.setState( {simcon_flag: !this.state.simcon_flag} )
  }
  updatedHandleClick = () => {
    this.setState( {updated_flag: !this.state.updated_flag} )
  }
  aboutHandleClick = () => {
    this.setState( {about_flag: !this.state.about_flag} )
  }

  render(){
    const props = this.props

    return (
      <div id="App">
        <div className="container">

          {/* スピリット・左側 */}
          <div id="Menubar" className="vis-pc">

            {/* シミュレート部 */}
            <div id="Simulate">
              <div className="row text-center">
                <h2 className="py-1">オンゲキ {props.tunes}曲プレイ</h2>
                <table>
                  <tbody>
                    <tr>
                      <th>推しデッキ</th>
                      <td>
                        <select value={props.cards} onChange={(e) => props.select_cards(e.target.value)}>
                          <option value={0}>編成なし</option>
                          <option value={1}>1枚編成</option>
                          <option value={2}>2枚編成</option>
                          <option value={3}>3枚編成</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>チャプター</th>
                      <td>
                        <select value={props.juweltype} onChange={(e) => props.radio_juweltype(e.target.value)}>
                          <option value={JUWEL_ALL}>1 / 2 章</option>
                          <option value={JUWEL_END}>3章</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>ジュエルブースト</th>
                      <td>
                        <select value={props.boost} onChange={(e) => props.radio_boost(e.target.value)}>
                          <option value={1}>×1</option>
                          <option value={2}>×2</option>
                          <option value={3}>×3</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>オンゲキ回数</th>
                      <td>
                        <select value={props.tunes} onChange={(e) => props.select_tunes(e.target.value)}>
                          <option value={1}>1曲</option>
                          <option value={3}>3曲</option>
                          <option value={9}>9曲</option>
                          <option value={30}>30曲</option>
                          <option value={90}>90曲</option>
                          <option value={300}>300曲</option>
                          <option value={900}>900曲</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>ゲームモード</th>
                    </tr>
                    <tr>
                      <td>
                        <input type="radio" name="mode_select" checked={props.credit_mode === MODE_370}
                               onChange={() => props.button_credit_mode(MODE_370)}/>
                        <label>A設定<br />(3クレ : 370GP)</label>
                      </td>
                      <td>
                        <input type="radio" name="mode_select" checked={props.credit_mode === MODE_360}
                               onChange={() => props.button_credit_mode(MODE_360)}/>
                        <label>B設定<br />(3クレ : 360GP)</label>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                <button onClick={ ()=> {props.button_play(props.cards)} }>この条件でオンゲキする({40 * props.tunes * props.boost}GP)
                  <br />({ONE_CREDIT * props.tunes * props.boost}円)
                </button>
                <div className="row">
                  <hr />
                  <h2 className="py-1">マニーラン</h2>
                  <table>
                    <tbody>
                      <tr>
                        <th>貢ぐ回数</th>
                        <td>
                          <select value={props.runs} onChange={(e) => props.select_runs(e.target.value)}>
                            <option value={1}>1回</option>
                            <option value={10}>10回</option>
                            <option value={100}>100回</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr />
                  {props.credit_mode === MODE_370 &&
                    <button onClick={ ()=> {props.button_moneyrun(MONEYRUN_A) } }>
                      マニーラン {MODE_370 * props.runs}GP
                      <br />({ONE_CREDIT * props.runs}円)
                    </button>
                  }
                  {props.credit_mode === MODE_360 &&
                    <button onClick={ ()=> {props.button_moneyrun(MONEYRUN_B)} }>
                      マニーラン {MODE_360 * props.runs}GP
                      <br />({ONE_CREDIT * props.runs}円)
                    </button>
                  }
                </div>
              </div>
              <hr />

              <div className="row text-center">
                 <div className="row">
                   <p>プレイ時間：{convertTime(props.playtime)}</p>
                   <p>消費GP：{props.gps} GP</p>
                   <p>リアルマネー：{props.credits} 円</p>
                 </div>
              </div>
            </div>

            {/* inputたち */}
            <div id="Menu">
              <div className="row">
                <h2 className="py-1">数値入力</h2>
              </div>
              {/* レベル */}
              {/* マニー */}
              <div className="row">
                <MoneyInput value={props.money} changed={props.changed.money} inputValue={props.input_money} max="3000000" min="0" step={100} />
              </div>
              <hr />
              {/* アイテム */}
              <div className="row">
                <ItemInput type={BUTTON_ITEM_S} value={props.item.s} changed={props.changed.items} inputValue={props.input_item_s}  max="99" min="0" step={1} />
              </div>
              <div className="row">
                <ItemInput type={BUTTON_ITEM_M} value={props.item.m} changed={props.changed.itemm} inputValue={props.input_item_m}  max="99" min="0" step={1} />
              </div>
              <div className="row">
                <ItemInput type={BUTTON_ITEM_L} value={props.item.l} changed={props.changed.iteml} inputValue={props.input_item_l}  max="99" min="0" step={1} />
              </div>
              <hr />
              <div className="row">
                <ItemInput type={BUTTON_JUWEL_ALL} value={props.juwel.all} changed={props.changed.jall} inputValue={props.input_juwel_all}  max="9999" min="0" step={1} />
              </div>
              <div className="row">
                <ItemInput type={BUTTON_JUWEL_END} value={props.juwel.end} changed={props.changed.jend} inputValue={props.input_juwel_end}  max="9999" min="0" step={1} />
              </div>
            </div>

          </div>

        {/* スピリット・右側 */}
        <div id="Contents" className="row">
        <header>
          <h1>オンゲキ親密度シミュレーター</h1>
          <hr />
        </header>

          <div className="row">
            <div className="btn-about">
              <button className="btn-toggle btn-about" onClick={ this.aboutHandleClick }>{ this.state.about_flag ? "戻る" : "About" }</button>
            </div>
          </div>
          <CSSTransition in={this.state.about_flag} classNames="sidedoor" timeout={1000}>
            <div className="sidedoor row mt-3">
              <div id="About">
                <About updated={props.updated}/>
              </div>

              <div id="Main">

                {/* 親密度Lv.入力 SE/SP/TB */}
                <div className="row">
                  <div className="col-2 mx-auto pl-1">
                    {/* 現在ハート */}
                    <div className="vis-se">
                      <Heart mode={SE} label="親密度Lv." lv={getExp2Lv( props.exp.now )} par={ getExp2Lvper( props.exp.now ) } />
                    </div>
                    <div className="vis-sp">
                      <Heart mode={SP} label="親密度Lv." lv={getExp2Lv( props.exp.now )} par={ getExp2Lvper( props.exp.now ) } />
                    </div>
                    <div className="vis-tb">
                      <Heart mode={TB} label="親密度Lv." lv={getExp2Lv( props.exp.now )} par={ getExp2Lvper( props.exp.now ) } />
                    </div>
                    <div className="vis-pc">
                      <Heart mode={PC} label="親密度Lv." lv={getExp2Lv( props.exp.now )} par={ getExp2Lvper( props.exp.now ) } />
                    </div>
                  </div>
                  <div className="col-2 mx-auto">
                    <p>EXP: <span className="bold">{props.exp.now}</span></p>
                    <p>目標EXP: <span className="bold">{props.exp.goal}</span></p>
                    <p>必要EXP: <span className="bold">{ Math.ceil(props.exp.goal - props.exp.now)}</span></p>
                    <p>到達度: <span className="bold">{ Math.round( (props.exp.now / props.exp.goal)*10000)/100}%</span></p>
                  </div>
                    </div>
                  <div className="row">
                    <RangeSlider label="現在の親密度Lv." max="800" min="0" value={props.lv.now} step={1} inputValue={props.input} changed={props.changed.lv} />
                  </div>
                  <div className="row">
                    <RangeSlider label="目標の親密度Lv." max="800" min="0" value={props.lv.goal} step={100} inputValue={props.input_goal} changed={props.changed.goal} />
                  </div>


                {/* 目安テーブル SE/SP/TB */}
                <div className="row">
                  <ExampleTable lv={props.lv.now} goal={props.lv.goal} nesexp={ Math.max(props.exp.goal - props.exp.now, 0 ) } tableflag={props.table_hidden}/>
                </div>
                <div className="row py-2 text-right">
                  <div className="col-2 pb-1">
                    <input type="radio" name="hidden_select" checked={props.table_hidden === TABLE_HIDDEN_FLAG_BOTH}
                           onChange={() => props.radio_table_hidden(TABLE_HIDDEN_FLAG_BOTH)}/>
                    <label>全て表示</label><br />
                    <input type="radio" name="hidden_select" checked={props.table_hidden === TABLE_HIDDEN_FLAG_360GP}
                           onChange={() => props.radio_table_hidden(TABLE_HIDDEN_FLAG_360GP)}/>
                   <label>370GPのみ</label><br />
                    <input type="radio" name="hidden_select" checked={props.table_hidden === TABLE_HIDDEN_FLAG_370GP}
                           onChange={() => props.radio_table_hidden(TABLE_HIDDEN_FLAG_370GP)}/>
                   <label>360GPのみ</label><br />
                  </div>
                  <div className="col-2">
                    <button className="btn-toggle" onClick={ this.simconHandleClick }>シミュレート条件{ this.state.simcon_flag ? "を閉じる" : "" }</button>
                  </div>
                  <div className="row">
                    <ExampleList flag={this.state.simcon_flag}/>
                  </div>
                </div>

                <hr />

                {/* アイテム数テーブル */}
                <div className="row pt-2">
                  <ItemTable props={props} />
                </div>

                {/* 使用後の親密度ハート */}
                <div className="row mt-2 pl-1">
                  <div className="col-2 pt-2 heart-with-item">
                    {/* 使用後ハート */}
                    <div className="vis-se">
                      <Heart mode={SE} label="全部貢いだ時の親密度Lv." lv={getExp2Lv( props.exp.now + props.itemexp)} par={ getExp2Lvper( props.exp.now + props.itemexp) } />
                    </div>
                    <div className="vis-sp">
                      <Heart mode={SP} label="全部貢いだ時の親密度Lv." lv={getExp2Lv( props.exp.now + props.itemexp)} par={ getExp2Lvper( props.exp.now + props.itemexp) } />
                    </div>
                    <div className="vis-tb">
                      <Heart mode={TB} label="全部貢いだ時の親密度Lv." lv={getExp2Lv( props.exp.now + props.itemexp)} par={ getExp2Lvper( props.exp.now + props.itemexp) } />
                    </div>
                    <div className="vis-pc">
                      <Heart mode={PC} label="全部貢いだ時の親密度Lv." lv={getExp2Lv( props.exp.now + props.itemexp)} par={ getExp2Lvper( props.exp.now + props.itemexp) } />
                    </div>
                  </div>
                  <div className="col-2 pos-rel mt-4 text-right mw-200">
                    <p>現在のEXP: <span className="bold">{props.exp.now}</span></p>
                    <p>アイテムのEXP: <span className="bold">{props.itemexp}</span></p>
                    <p>合計EXP: <span className="bold">{props.exp.now + props.itemexp}</span></p>
                    <p>目標レベルのEXP: <span className="bold">{props.exp.goal}</span></p>
                    <p>到達度: <span className="bold">{ Math.round( ((props.exp.now + props.itemexp) / props.exp.goal)*10000)/100}%</span></p>
                  </div>
                </div>

                {/* 使用後の親密度テーブル */}
                <div className="row table-progbar">
                  <div className="vis-se">
                    <ProgbarTable mode={SE} exp={props.exp.now} itemexp={props.itemexp} />
                  </div>
                  <div className="vis-sp">
                    <ProgbarTable mode={SP} exp={props.exp.now} itemexp={props.itemexp} />
                  </div>
                  <div className="vis-tb">
                    <ProgbarTable mode={TB} exp={props.exp.now} itemexp={props.itemexp} />
                  </div>
                  <div className="vis-pc">
                    <ProgbarTable mode={PC} exp={props.exp.now} itemexp={props.itemexp} />
                  </div>
                </div>

                <div className="message_box mx-auto mt-5 vis-pc">
                  <Messages messages={props.mes} />
                </div>

              </div>
            </div>
          </CSSTransition>
        </div>

      </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {}
  return errors
}

const mapStateToProps = state => ({
  updated: state.input.updated,
  mes: state.input.mes,
  lv: state.input.lv,
  exp: state.input.exp,
  item: state.input.item,
  money: state.input.money,
  juwel: state.input.juwel,
  juweltype: state.input.juweltype,
  table_hidden: state.input.table_hidden,
  changed: state.input.changed,
  itemflag: state.input.itemflag,
  gps: state.input.gps,
  credits: Math.floor(state.input.gps / state.input.credit_mode * ONE_CREDIT),
  credit_mode: state.input.credit_mode,
  playtime: state.input.playtime,
  boost: state.input.boost,
  cards: state.input.cards,
  tunes: state.input.tunes,
  runs: state.input.runs,
  itemexp: getItemExp(state.input),
 })

const mapDispatchToProps = ({
  input,
  input_goal,
  input_item_s,
  input_item_m,
  input_item_l,
  input_money,
  input_juwel_end,
  input_juwel_all,
  button_change,
  button_play,
  button_moneyrun,
  button_credit_mode,
  radio_juweltype,
  radio_table_hidden,
  radio_boost,
  select_tunes,
  select_cards,
  select_runs,
  check_itemflag
})

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updated_flag: false,
    }
  }
  updatedHandleClick = () => {
    this.setState( {updated_flag: !this.state.updated_flag} )
  }

  render(){
    return(
      <div className="about-content">
        <h2>このアプリについて</h2>
        <div className="mx-auto ">
          <div className="text-right">
            <button className="btn-toggle mt-2" onClick={ this.updatedHandleClick }>更新履歴{ this.state.updated_flag ? "を閉じる" : "" }</button>
          </div>
          <CSSTransition in={this.state.updated_flag} classNames="door" timeout={1000}>
            <div className="door mx-auto">
              <div className="message_box updated">
                <Messages messages={this.props.updated} />
              </div>
            </div>
          </CSSTransition>
        </div>
        <ul>
          <li>オンゲキ非公式の親密度シミュレータです。</li>
          <li>計算式は<a href="https://ongeki.gamerch.com/%E8%A6%AA%E5%AF%86%E5%BA%A6" rel="noopener noreferrer" target="_blank">wiki</a>の情報を元に作成しましたが、誤差があったらごめんなさい。</li>
          <li>必ずしも実機と同じ数値になる保証はありません、マニーラン等は自己責任でお願いします。</li>
          <li>あなたのオンゲキライフがより良い物となりますように。</li>
        </ul>
        <ul>
          <li>作者はプログラミング初心者で、Reactの勉強も兼ねて本アプリを制作しました。</li>
          <li>バグ報告や感想・要望など頂けたら励みになります。</li>
          <li>Twitter</li>
          <li>YouTube</li>
        </ul>
        <div className="mx-auto mt-2">
          <MailForm />
        </div>
      </div>
    )
  }
}

class MailForm extends Component {
  constructor(props) {
  super(props)
  this.state = {
    value: '',
    submit_button: true,
    submiting: false,
    submitted: false
  }
  this.handleChange = this.handleChange.bind(this)
  this.sendtoSlack = this.sendtoSlack.bind(this)
  }

  handleChange(event) {
  this.setState({value: event.target.value});
  }

  sendtoSlack = (event) => {
    if( !this.state.submitting ){
      this.setState({
        submit_button: false,
        submiting: true
      });

      const aws_endpoint = 'https://s3en248yra.execute-api.ap-northeast-1.amazonaws.com/slack/'
      const sendjson = {
        title: '【SIMGEKI 親密度】',
        content: this.state.value
      }

      axios.post(aws_endpoint, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify( sendjson ) })

      .then( (response) => {
        this.setState({
          submiting: false,
          submitted: true
        })
        return response
      })
      .catch( (error) => {
        alert(error)
        console.log('ERROR!! '+ error)
      });

    }
  }
  render(){
    return(
      <div className="mailform">
        {this.state.submit_button &&
          <React.Fragment>
            <textarea value={this.state.value} onChange={this.handleChange} placeholder="管理人にメッセージを送る&#13;&#10;返信をご希望の方はTwitterへどうぞ"></textarea>
            <button onClick={ this.sendtoSlack }>送信する</button>
          </React.Fragment>
        }
        {this.state.submiting &&
          <React.Fragment>
            <textarea value={this.state.value} disabled></textarea>
            <button disabled>送信しています...</button>
          </React.Fragment>
        }
        {this.state.submitted &&
          <React.Fragment>
            <textarea value={this.state.value} disabled></textarea>
            <button disabled>送信に成功しました</button>
            <h2>メッセージありがとうございます！</h2>
          </React.Fragment>
        }
      </div>
    )
  }
}

const InputMoney = props => {
  return(
    <div className="input-field input-money">
      <input
        type="tel"
        autoComplete="off"
        value={props.value} onChange={ (eve) => { props.inputValue(eve.target.value)} } />
      <ChangeValue value={props.changed} />
      <div>
        <button onClick={ ()=> {props.buttonChange(BUTTON_MONEY,10000) } }>+10k</button>
        <button onClick={ ()=> {props.buttonChange(BUTTON_MONEY,100000)} }>+100k</button>
        <button onClick={ ()=> {props.buttonChange(BUTTON_MONEY,1000000)} }>+1m</button>
      </div>
      <div>
        <button onClick={ ()=> {props.buttonChange(BUTTON_MONEY,-10000)} }>-10k</button>
        <button onClick={ ()=> {props.buttonChange(BUTTON_MONEY,-100000)} }>-100k</button>
        <button onClick={ ()=> {props.buttonChange(BUTTON_MONEY,-1000000)} }>-1m</button>
        <button onClick={ ()=> {props.buttonChange(BUTTON_MONEY,0)} } className="btn-reset">リセット</button>
      </div>
    </div>
  )
}
const MoneyInput = props => {
  return(
    <div className="input-field">
      <div className="input-money">
        <div className="f-left">
          <label >マニー</label>
        </div>
        <div className="f-right">
          <input
            type="tel"
            autoComplete="off"
            value={props.value} onChange={ (eve) => { props.inputValue(eve.target.value)} } />
          <ChangeValue value={props.changed} />
        </div>
      </div>

      <div className="range-slider row c-right">
        <span className="range-min">{0}</span>
        <input
          type="range"
          value={props.value}
          max={props.max}
          min={props.min}
          step={props.step}
          autoComplete="off"
          onChange={ (eve) => { props.inputValue(eve.target.value)} }/>
        <span className="range-max">{props.max}</span>
      </div>

    </div>
  )
}
const InputLv = props => {
  return(
    <React.Fragment>
      <label>{props.label}</label>
      <input
        type="tel"
        autoComplete="off"
        maxLength="3"
        size="3"
        value={props.value}
        onChange={ (eve) => { props.inputValue(eve.target.value)} } />
      <ChangeValue value={props.changed} />
    </React.Fragment>
  )
}
const InputItem = props => {
  const labeling = type => {
    switch(type){
      case BUTTON_ITEM_S: return "（小）"
      case BUTTON_ITEM_M: return "（中）"
      case BUTTON_ITEM_L: return "（大）"
      case BUTTON_JUWEL_END: return "3章 "
      case BUTTON_JUWEL_ALL: return "1/2章 "
      default: return "（？）→"
    }
  }
  const label = labeling( props.type)
  const isItem = type =>{
    switch(type){
      case BUTTON_ITEM_S:
      case BUTTON_ITEM_M:
      case BUTTON_ITEM_L:
        return true
      case BUTTON_JUWEL_END:
      case BUTTON_JUWEL_ALL:
      default:
        return false
    }
  }

  return(
    <div className="input-field">
      <label>{label}</label>
      <input
        type="tel"
        autoComplete="off"
        maxLength="4"
        size="4"
        value={props.value}
        onChange={ (eve) => { props.inputValue(eve.target.value)} } />
      <ChangeValue value={props.changed} />
      {isItem(props.type) &&
       <InputItemButtons buttonChange={props.buttonChange} type={props.type} />
       }
      {!isItem(props.type) &&
       <InputJuwelButtons buttonChange={props.buttonChange} type={props.type} />
       }
    </div>
  )
}
const ItemInput = props => {
  const labeling = type => {
    switch(type){
      case BUTTON_ITEM_S: return "プレゼント（小）"
      case BUTTON_ITEM_M: return "プレゼント（中）"
      case BUTTON_ITEM_L: return "プレゼント（大）"
      case BUTTON_JUWEL_END: return "3章ジュエル "
      case BUTTON_JUWEL_ALL: return "1/2章ジュエル"
      default: return "（？）→"
    }
  }
  const label = labeling( props.type)
  const isItem = type =>{
    switch(type){
      case BUTTON_ITEM_S:
      case BUTTON_ITEM_M:
      case BUTTON_ITEM_L:
        return true
      case BUTTON_JUWEL_END:
      case BUTTON_JUWEL_ALL:
      default:
        return false
    }
  }

  return(
    <div className="input-field">
      <div className="input-item">
        <div className="f-left">
          <label>{label}</label>
        </div>
        <div className="f-right">
          <input
            type="tel"
            autoComplete="off"
            maxLength="4"
            size="4"
            value={props.value}
            onChange={ (eve) => { props.inputValue(eve.target.value)} } />
          <ChangeValue value={props.changed} />
        </div>
      </div>
      <div className="range-slider row c-right">
        <span className="range-min">{0}</span>
        <input
          type="range"
          value={props.value}
          max={props.max}
          min={props.min}
          step={props.step}
          autoComplete="off"
          onChange={ (eve) => { props.inputValue(eve.target.value)} }/>
        <span className="range-max">{props.max}</span>
      </div>
    </div>
  )
}

const InputLvButtons = props => {
  return(
    <React.Fragment>
      <div>
        <button onClick={ ()=> {props.buttonChange(BUTTON_LV, 1)} }>+1</button>
        <button onClick={ ()=> {props.buttonChange(BUTTON_LV, 10)} }>+10</button>
        <button onClick={ ()=> {props.buttonChange(BUTTON_LV, 100)} }>+100</button>
      </div>
      <div>
        <button onClick={ ()=> {props.buttonChange(BUTTON_LV, -1)} }>-1</button>
        <button onClick={ ()=> {props.buttonChange(BUTTON_LV, -10)} }>-10</button>
        <button onClick={ ()=> {props.buttonChange(BUTTON_LV, -100)} }>-100</button><br />
        <button onClick={ ()=> {props.buttonChange(BUTTON_LV, 0)} } className="btn-reset" >リセット</button>
      </div>
    </React.Fragment>
  )
}
const InputGoalButtons = props => {
  return(
    <React.Fragment>
      <div>
        <button onClick={ ()=> {props.buttonChange(BUTTON_LV_GOAL, -100)} }>-100</button>
        <button onClick={ ()=> {props.buttonChange(BUTTON_LV_GOAL, 100)} }>+100</button><br />
        <button onClick={ ()=> {props.buttonChange(BUTTON_LV_GOAL, 0)} } className="btn-reset" >リセット</button>
      </div>
    </React.Fragment>
  )
}
const InputItemButtons = props => {
  return(
    <React.Fragment>
      <div>
      <button onClick={ ()=> {props.buttonChange(props.type,1)} }>+1</button>
      <button onClick={ ()=> {props.buttonChange(props.type,10)} }>+10</button>
    </div>
    <div>
      <button onClick={ ()=> {props.buttonChange(props.type,-1)} }>-1</button>
      <button onClick={ ()=> {props.buttonChange(props.type,-10)} }>-10</button><br />
      <button onClick={ ()=> {props.buttonChange(props.type,0)} } className="btn-reset">リセット</button>
    </div>
  </React.Fragment>
  )
}
const InputJuwelButtons = props => {
  return(
    <React.Fragment>
      <div>
      <button onClick={ ()=> {props.buttonChange(props.type,10)} }>+10</button>
      <button onClick={ ()=> {props.buttonChange(props.type,100)} }>+100</button>
      <button onClick={ ()=> {props.buttonChange(props.type,1000)} }>+1000</button>
    </div>
    <div>
      <button onClick={ ()=> {props.buttonChange(props.type,-10)} }>-10</button>
      <button onClick={ ()=> {props.buttonChange(props.type,-100)} }>-100</button>
      <button onClick={ ()=> {props.buttonChange(props.type,-1000)} }>-1000</button><br />
      <button onClick={ ()=> {props.buttonChange(props.type,0)} } className="btn-reset">リセット</button>
    </div>
  </React.Fragment>
  )
}

const ChangeValue = props => {
  const classname = "changed-value"
  const blue = { color: "rgb(40,40,240)"}
  const red = { color: "rgb(240,40,40)"}

  return(
    <TransitionGroup>
      {props.value.map((value, index) => (
        <CSSTransition
          key={index}
          classNames={classname}
          timeout={1000}
          unmountOnExit
          >
            <span className={classname} style={value >= 0 ? blue : red}>{value >= 0 ? "+"+value : value}</span>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

const RangeSlider = props => {
  return(
    <div className="range-slider">
      <span className="range-label">{props.label}</span>
      <span className="range-min">{0}</span>
      <input
        type="range"
        value={props.value}
        max={props.max}
        min={props.min}
        step={props.step}
        autoComplete="off"
        onChange={ (eve) => { props.inputValue(eve.target.value)} }/>
      { props.changed &&
        <React.Fragment>
          <input
            type="tel"
            autoComplete="off"
            maxLength="3"
            size="3"
            className="range-textfield"
            value={props.value}
            onChange={ (eve) => { props.inputValue(eve.target.value)} } />
          <ChangeValue value={props.changed} />
        </React.Fragment>
      }
      <span className="range-max">{props.max}</span>
    </div>
  )
}

const Messages = props => {
  const messages = props.messages
  const ListItems = messages.map((mes,index) =>
    <li key={index}>{ mes }</li>
  )
  return (
    <ul>{ ListItems }</ul>
  )
}

const Heart = props => {
  let max_size = 0
  let option_top = 0
  switch(props.mode){
    case TB:
    case PC:
      max_size = 184
      option_top = 36
      break
    case SE:
    case SP:
    default:
      max_size = 120
      option_top = 20
      break
  }
  const lv = props.lv >= 800 ? 800 : props.lv
  const par = lv === 800 ? 100 : props.par
  const barheight = par * max_size/100
  const bartop = max_size + option_top - barheight
  const barstyle = { height: barheight, top: bartop}
  const backheight = max_size - barheight
  const backtop = bartop - backheight
  const backstyle = { height: backheight, top: backtop}

  return(
    <div className="heart-block">
      <div className="heart">
        <span className="heart-label">{props.label}</span>
        <span className="heart-lv">{ lv }</span>
        <img src={HeartImage} className="heart-img" alt="親密度ハート"/>

        <div className="">
          <div className="heart-bar" style={ barstyle }></div>
          <div className="heart-back" style={ backstyle }></div>
        </div>
      </div>
    </div>
  )
}

const ExampleTable = props => {
  return(
    <div className="table-example">
      <table>
        <thead>
          <tr className=""><td colSpan="4">
            Lv.{props.lv}からLv.{props.goal}までの目安
          </td></tr>
        </thead>
        <tbody>
          <tr>
            <th className="w-150 text-center">プレゼント (大)</th>
            <td className="w-50">{ Math.ceil(props.nesexp / EXP_ITEM_L) }個</td>
            <td className="w-70 text-center">＝</td>
            <td className="text-left">{ Math.ceil(props.nesexp / EXP_ITEM_L) * 20000 }マニー</td>
          </tr>
            <ExampleTableRecord flag={props.tableflag !== TABLE_HIDDEN_FLAG_370GP} label="マニーラン (370GP)" nesexp={props.nesexp} oneexp={EXP_MONEYRUN_A} cost={ONE_CREDIT} onetime={MONEYRUN_TIME} onejuwel={0} />
            <ExampleTableRecord flag={props.tableflag !== TABLE_HIDDEN_FLAG_360GP} label="マニーラン (360GP)" nesexp={props.nesexp} oneexp={EXP_MONEYRUN_B} cost={ONE_CREDIT} onetime={MONEYRUN_TIME} onejuwel={0}/>
            <ExampleTableRecord flag={props.tableflag !== TABLE_HIDDEN_FLAG_370GP} label="オンゲキ9曲 (370GP)" nesexp={props.nesexp} oneexp={ (3 + EXPEC_MONEY /100) *9 +1.5 } cost={ONE_CREDIT} onetime={GAMEPLAY_TIME *9} onejuwel={EXPEC_JUWEL *9}/>
            <ExampleTableRecord flag={props.tableflag !== TABLE_HIDDEN_FLAG_360GP} label="オンゲキ9曲 (360GP)" nesexp={props.nesexp} oneexp={ (3 + EXPEC_MONEY /100) *9 } cost={ONE_CREDIT} onetime={GAMEPLAY_TIME *9} onejuwel={EXPEC_JUWEL *9}/>
            <ExampleTableRecord flag={props.tableflag !== TABLE_HIDDEN_FLAG_370GP} label="オンゲキ3曲3倍 (370GP)" nesexp={props.nesexp} oneexp={ (3 + EXPEC_MONEY /100) *3 +1.5 } cost={ONE_CREDIT} onetime={GAMEPLAY_TIME *3} onejuwel={EXPEC_JUWEL *3 *3 }/>
            <ExampleTableRecord flag={props.tableflag !== TABLE_HIDDEN_FLAG_360GP} label="オンゲキ3曲3倍 (360GP)" nesexp={props.nesexp} oneexp={ (3 + EXPEC_MONEY /100) *3 } cost={ONE_CREDIT} onetime={GAMEPLAY_TIME *3} onejuwel={EXPEC_JUWEL *3 *3 }/>
        </tbody>
      </table>
    </div>
  );
}
const ExampleTableRecord = props => {
  const nes_count = Math.ceil(props.nesexp / props.oneexp)
  const cost = props.cost ? props.cost : 0
  const realtime = props.onetime ? props.onetime : 0
  const trstyle = props.flag ? {} : {padding: 0, borderBottom: "none"}
  return(
    <tr>
      <th className="w-150 text-center"  style={trstyle}>
        <CSSTransition in={props.flag} classNames="hidden-table" timeout={1000}>
          <div className="hidden-table">
            {props.label}
          </div>
        </CSSTransition>
      </th>

      <td className="w-50" style={trstyle}>
        <CSSTransition in={props.flag} classNames="hidden-table" timeout={1000}>
          <div className="hidden-table">
            { nes_count }回
          </div>
        </CSSTransition>
      </td>

      <td className="w-70" style={trstyle}>
        <CSSTransition in={props.flag} classNames="hidden-table" timeout={1000}>
          <div className="hidden-table">
            { nes_count * cost }円
          </div>
        </CSSTransition>
      </td>

      <td className="w-120" style={trstyle}>
        <CSSTransition in={props.flag} classNames="hidden-table" timeout={1000}>
          <div className="hidden-table">
            { convertTime(nes_count * realtime) }<br />
            ジュエル：{ Math.floor(nes_count * props.onejuwel) }
          </div>
        </CSSTransition>
      </td>
    </tr>
  );
}
const ExampleList = props => {
  return(
    <CSSTransition in={props.flag} classNames="door" timeout={1000}>
      <div className="door mx-auto">
        <ul className="example-list">
          <li>マニーラン1セットにつき{MONEYRUN_TIME}秒</li>
          <li>オンゲキ1曲につき{GAMEPLAY_TIME}秒</li>
          <li>1曲で獲得するマニーは{EXPEC_MONEY}マニー、全て親密度に使う</li>
          <li>デッキ編成は親密度を上げるキャラクター3枚編成</li>
          <li>獲得ジュエルは1曲あたり{EXPEC_JUWEL}個</li>
          <li>獲得したジュエルは親密度に使わず、計算に影響しない</li>
          <li>370GPはコンテニューなし(余る10GP→150マニーに変換)</li>
          <li>ログインボーナス、ミッション等は計算外</li>
        </ul>
      </div>
    </CSSTransition>
  );
}

const ItemTable = stat => {
  const props = stat.props
  return(
    <div className="table-item">
      <table>
        <thead>
          <tr><td colSpan="5">
            <span className="table-title">アイテム使用後のレベルを計算</span>
          </td></tr>
          <tr>
            <td>アイテム</td>
            <td>EXP</td>
            <td>所持数</td>
            <td>獲得EXP</td>
            <td>献上</td>
          </tr>
        </thead>
        <tbody>
          <ItemTableRecord item={MONEY} stock={props.money} flag={props.itemflag.money} itemFlag={props.check_itemflag} inputValue={props.input_money} changed={props.changed.money}/>
          <ItemTableRecord item={ITEM_S} stock={props.item.s} flag={props.itemflag.s} itemFlag={props.check_itemflag} inputValue={props.input_item_s} changed={props.changed.items}/>
          <ItemTableRecord item={ITEM_M} stock={props.item.m} flag={props.itemflag.m} itemFlag={props.check_itemflag} inputValue={props.input_item_m} changed={props.changed.itemm}/>
          <ItemTableRecord item={ITEM_L} stock={props.item.l} flag={props.itemflag.l} itemFlag={props.check_itemflag} inputValue={props.input_item_l} changed={props.changed.iteml}/>
          <ItemTableRecord item={JUWEL_ALL} stock={props.juwel.all} flag={props.itemflag.jall} itemFlag={props.check_itemflag} inputValue={props.input_juwel_all} changed={props.changed.jall}/>
          <ItemTableRecord item={JUWEL_END} stock={props.juwel.end} flag={props.itemflag.jend} itemFlag={props.check_itemflag} inputValue={props.input_juwel_end} changed={props.changed.jend}/>
        </tbody>
      </table>
    </div>
  );
}
const ItemTableRecord = props => {
  let item_name = ""
  let item_exp = 0
  switch(props.item){
    case MONEY:
      item_name = "マニー"
      item_exp = EXP_MONEY
      break
    case ITEM_S:
      item_name = "プレゼント（小）"
      item_exp = EXP_ITEM_S
      break
    case ITEM_M:
      item_name = "プレゼント（中）"
      item_exp = EXP_ITEM_M
      break
    case ITEM_L:
      item_name = "プレゼント（大）"
      item_exp = EXP_ITEM_L
      break
    case JUWEL_ALL:
      item_name = "1章 & 2章ジュエル"
      item_exp = EXP_JUWEL_ALL
      break
    case JUWEL_END:
      item_name = "3章ジュエル"
      item_exp = EXP_JUWEL_END
      break
    default:
      break
  }
  return(
    <tr>
      <th className="w-130">{item_name}</th>
      <td className="w-20 text-right">{item_exp}</td>
      <td className="w-100 text-right">
        <input className="table-input"
          type="tel"
          autoComplete="off"
          value={props.stock}
          onChange={ (eve) => { props.inputValue(eve.target.value)} } />
      </td>
      <td className="w-40 text-right">{ Math.floor(item_exp * props.stock) }</td>
      <td className="w-15 text-center">
        <input type="checkbox" name="itemcheck" checked={props.flag}
           onChange={() => props.itemFlag(props.item)}/>
      </td>
    </tr>
  )
}

const ProgbarTable = props => {
  return(
    <table>
      <ProgbarTableHead />
      <tbody>
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={100} expg={3300} />
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={200} expg={7260} />
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={300} expg={11880} />
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={400} expg={17160} />
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={500} expg={23100} />
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={600} expg={29700} />
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={700} expg={42240} />
        <ProgbarRecord mode={props.mode} exp={props.exp} itemexp={props.itemexp} lv={800} expg={59400} />
        <ProgbarTableSamplebar />
      </tbody>
    </table>
  );
}
const ProgbarRecord = props => {
  let table_width = 0
  switch(props.mode){
    case SE:
      table_width = 308; break
    case TB:
    case PC:
      table_width = 474; break
    case SP:
    default:
      table_width = 360; break
  }

  const parse = Math.floor((props.exp / props.expg )*100)
  const parse_i = Math.floor((props.itemexp / props.expg )*100)
  let parsebar = 0
  let parsebar_i = 0

  if(parse >= 100){
    parsebar = table_width
  }else if(parse + parse_i >= 100){
    parsebar = parse * table_width / 100
    parsebar_i = (100 - parse) / 100 * table_width
  }else{
    parsebar = parse * table_width / 100
    parsebar_i = parse_i * table_width / 100
  }

  const barstyle = { width: parsebar }
  const barstyle_i = { width: parsebar_i, left: parsebar}

  return(
    <tr>
      <th className="column-lv">
        <span className="goal-lv">{props.lv}</span>
        <div className="progbar progbar-lv" style={barstyle}></div>
        <div className="progbar progbar-item" style={barstyle_i}></div>
      </th>
      <td className="column-exp">{props.expg}</td>
      <td className="column-exp">{Math.round((props.expg - props.exp - props.itemexp) * 100) / 100 }</td>
      <td className="column-exp">{ parse + parse_i } %</td>
    </tr>
  )
}
const ProgbarTableHead = () => {
  return(
    <thead>
      <tr><td colSpan="4">
        <span className="table_title">アイテム使用後のレベル</span>
      </td></tr>
      <tr>
        <td>目標の親密度</td>
        <td>必要EXP</td>
        <td>残りEXP</td>
        <td>到達度</td>
      </tr>
    </thead>
  )
}
const ProgbarTableSamplebar = () => {
  return(
    <tr>
      <td className="text-center" colSpan="2">
        <span className="graph-text color-red">現在EXP</span>
        <div className="progbar progbar-lv" ></div>
        <div className="progbar progbar-item" ></div>
      </td>
      <td className="text-center" colSpan="2">
        <span className="graph-text color-yellow">アイテムEXP</span>
      </td>
    </tr>
  )
}

//計算系メソッド
const convertTime = time => {
  let mes = ""
  if(time /60/60 >= 1){
    mes += Math.floor(time /60/60) + "時間"
  }
  if(time %3600 /60 >= 1){
    mes += Math.floor(time %3600 /60) + "分"
  }
  if(time%60 > 0){
    mes += Math.floor(time %60) + "秒"
  }
  return mes === "" ? "-" : mes
}

const getItemExp = props => {
  let exp = 0
  if(props.itemflag.money){ exp += Math.floor(props.money * EXP_MONEY) }
  if(props.itemflag.s){ exp += props.item.s * EXP_ITEM_S }
  if(props.itemflag.m){ exp += props.item.m * EXP_ITEM_M }
  if(props.itemflag.l){ exp += props.item.l * EXP_ITEM_L }
  if(props.itemflag.jall){ exp += props.juwel.all * EXP_JUWEL_ALL }
  return exp
}

const getExp2Lvper = exp => {
  let parse = 0
  let count = exp * 10
  let next_exp = 0
  let i = 0

  if(exp >= 59400){ return 100}

  for( i = 0; count > 0; i++ ){
    next_exp = 0
    if(i < 100){
      for( let j = Math.floor(i/10); j*10 <= i ; j++){
        next_exp += 60 + (( j - 1 ) * 60)
      }
      next_exp +=  60
    }
    else if(i >= 100 ){
      let h = Math.floor(i/100)
      const hi = i - h * 100;

      if(       i >= 700){ h = 21 }
      else if(  i >= 600){ h = 14 }

      for( let j = Math.floor(hi/10); j*10 <= hi ; j++){
        next_exp += (6 + ( j - 1 ) * 6) * (10 + 2 * h )
      }
      next_exp +=  6 *  (10 + 2 * h )
    }

    if(count === next_exp){
      parse = 0
      i++
      break
    }else if(count < next_exp){
      parse = Math.floor( (count / next_exp) * 100 ) / 10
      break
    }
  count -= next_exp
  }

  return parse * 10
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm( {validate, form: 'loveform'})(App))
