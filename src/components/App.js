import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeartImage from '../image/onheart.png'
import './App.scss';

import { input, input_goal, input_item_s, input_item_m, input_item_l, input_money, input_juwel_end, input_juwel_all,
   button_change, button_play, radio_juweltype, check_itemflag } from '../actions'
import { JUWEL_END, JUWEL_ALL, ITEM_S, ITEM_M, ITEM_L, MONEY,
  BUTTON_LV,
  BUTTON_LV_GOAL,
  BUTTON_ITEM_S,
  BUTTON_ITEM_M,
  BUTTON_ITEM_L,
  BUTTON_MONEY,
  BUTTON_JUWEL_END,
  BUTTON_JUWEL_ALL } from '../actions'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {kore: false}
  }
  handleClick = () => {
    this.setState( {kore: !this.state.kore})
  }
  render(){
    const props = this.props

    return (
      <div className="App">

        <h1 className="signboard">オンゲキ親密度シミュレーター</h1>
        <div id="section1">
          <div className="row">
            <div className="col">
              <Heart label="親密度Lv." lv={getExp2Lv( props.exp.now )} par={ getExp2Lvper( props.exp.now ) } />
            </div>
            <div className="col pos-rel w-200 text-right">
              <InputLv className="" value={props.lv.now} changed={props.changed.lv} buttonChange={props.button_change} inputValue={props.input_lv}/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Heart label="目標の親密度Lv." lv={getExp2Lv( props.exp.goal )} par={ getExp2Lvper( props.exp.goal ) } />
            </div>
            <div className="col pos-rel w-200 text-right">
              <InputLvGoal  value={props.lv.goal} changed={props.changed.goal} buttonChange={props.button_change} inputValue={props.input_goal}/>
            </div>
          </div>

          <div className="row pos-rel w-450 text-center">
            <InputMoney value={props.money} changed={props.changed.money} buttonChange={props.button_change} inputValue={props.input_money}/>
          </div>

          <div id="Items" className="row pos_rel w-450 input_field">
            <p className="text-center">親密度上昇プレゼント</p>

            <div className="col w-150 pos_rel input_item">
              <InputItem type={BUTTON_ITEM_S} value={props.item.s} changed={props.changed.items} buttonChange={props.button_change} inputValue={props.input_item_s}/>
              <div>
                <button onClick={ ()=> {props.button_change(BUTTON_ITEM_S,1) } }>+1</button>
                <button onClick={ ()=> {props.button_change(BUTTON_ITEM_S,10)} }>+10</button>
              </div>
              <div>
                <button onClick={ ()=> {props.button_change(BUTTON_ITEM_S,-1)} }>-1</button>
                <button onClick={ ()=> {props.button_change(BUTTON_ITEM_S,-10)} }>-10</button>
                <button onClick={ ()=> {props.button_change(BUTTON_ITEM_S,0)} } className="btn-reset">Clear</button>
              </div>
            </div>
            <div className="col w-150 pos_rel input_item">
              <InputItem type={BUTTON_ITEM_M} value={props.item.m} changed={props.changed.itemm} buttonChange={props.button_change} inputValue={props.input_item_m}/>
              <div>
                <button onClick={ ()=> {props.button_change(BUTTON_ITEM_M,1) } }>+1</button>
                <button onClick={ ()=> {props.button_change(BUTTON_ITEM_M,10)} }>+10</button>
              </div>
              <div>
                <button onClick={ ()=> {props.button_change(BUTTON_ITEM_M,-1)} }>-1</button>
                <button onClick={ ()=> {props.button_change(BUTTON_ITEM_M,-10)} }>-10</button>
                <button onClick={ ()=> {props.button_change(BUTTON_ITEM_M,0)} } className="btn-reset">Clear</button>
              </div>
            </div>
            <div className="col w-150 pos_rel input_item">
              <InputItem type={BUTTON_ITEM_L} value={props.item.l} changed={props.changed.iteml} buttonChange={props.button_change} inputValue={props.input_item_l}/>
              <div>
                <button onClick={ ()=> {props.button_change(BUTTON_ITEM_L,1) } }>+1</button>
                <button onClick={ ()=> {props.button_change(BUTTON_ITEM_L,10)} }>+10</button>
              </div>
              <div>
                <button onClick={ ()=> {props.button_change(BUTTON_ITEM_L,-1)} }>-1</button>
                <button onClick={ ()=> {props.button_change(BUTTON_ITEM_L,-10)} }>-10</button>
                <button onClick={ ()=> {props.button_change(BUTTON_ITEM_L,0)} } className="btn-reset">Clear</button>
              </div>
            </div>
          </div>

          <div className="row pos-rel w-450 text-center input_field">
            <div className="col w-200 pos_rel input_juwel">
              <InputItem type={BUTTON_JUWEL_END} value={props.juwel.end} changed={props.changed.jend} buttonChange={props.button_change} inputValue={props.input_juwel_end}/>
              <div>
                <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_END,1) } }>+1</button>
                <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_END,10)} }>+10</button>
              </div>
              <div>
                <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_END,-1)} }>-1</button>
                <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_END,-10)} }>-10</button>
                <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_END,0)} } className="btn-reset">Clear</button>
              </div>
            </div>
            <div className="col w-200 pos_rel input_juwel">
              <InputItem type={BUTTON_JUWEL_ALL} value={props.juwel.all} changed={props.changed.jall} buttonChange={props.button_change} inputValue={props.input_juwel_all}/>
              <div>
                <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_ALL,1) } }>+1</button>
                <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_ALL,10)} }>+10</button>
              </div>
              <div>
                <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_ALL,-1)} }>-1</button>
                <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_ALL,-10)} }>-10</button>
                <button onClick={ ()=> {props.button_change(BUTTON_JUWEL_ALL,0)} } className="btn-reset">Clear</button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="table_money">
              <table>
                <thead>
                  <tr>
                    <td>アイテム</td>
                    <td>EXP</td>
                    <td>所持数</td>
                    <td>獲得EXP</td>
                  </tr>
                </thead>
                <tbody>
                  <MoneyTableRecord item="マニー" exp={0.01} stock={props.money} />
                  <MoneyTableRecord item="プレゼント（小）" exp={6} stock={props.item.s} />
                  <MoneyTableRecord item="プレゼント（中）" exp={20} stock={props.item.m} />
                  <MoneyTableRecord item="プレゼント（大）" exp={200} stock={props.item.l} />
                  <MoneyTableRecord item="1/2章ジュエル" exp={0.5} stock={props.juwel.all} />
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <Heart label="全部貢いだ時の親密度Lv."
              lv={getExp2Lv( props.exp.now + getItemExp(props.money, props.item, props.itemflag))}
                par={ getExp2Lvper( props.exp.now + getItemExp(props.money, props.item, props.itemflag)) } />
          </div>

          <div className="table_lv">
            <table>
              <thead>
                <tr>
                  <td>目標の親密度</td>
                  <td>必要EXP</td>
                  <td>残りEXP</td>
                  <td>到達度</td>
                </tr>
              </thead>
              <tbody>
                <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item, props.itemflag )} lv={100} expg={3300} />
                <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item, props.itemflag )} lv={200} expg={7260} />
                <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item, props.itemflag )} lv={300} expg={11880} />
                <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item, props.itemflag )} lv={400} expg={17160} />
                <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item, props.itemflag )} lv={500} expg={23100} />
                <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item, props.itemflag )} lv={600} expg={29700} />
                <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item, props.itemflag )} lv={700} expg={42240} />
                <LoveTableWithItem exp={props.exp.now} itemexp={getItemExp( props.money, props.item, props.itemflag )} lv={800} expg={59400} />
              </tbody>
            </table>
          </div>


          <button className="btn-toggle" onClick={ this.handleClick }>{ this.state.kore ? "閉じ" : "開け" }まーす</button>
            <CSSTransition in={this.state.kore} classNames="door" timeout={1000}>
              <div className="door">
                <div id="Money">
                  <p>でしてー</p>
                </div>
              </div>
            </CSSTransition>

        <div>
          オンゲキ 1曲プレイ
          <br /><button onClick={ ()=> {props.button_play("play",0)} }>40 GP(デッキ0枚) でLet'sオンゲキ</button>
          <br /><button onClick={ ()=> {props.button_play("play",1)} }>40 GP(デッキ1枚)  でLet'sオンゲキ</button>
          <br /><button onClick={ ()=> {props.button_play("play",2)} }>40 GP(デッキ2枚)  でLet'sオンゲキ</button>
          <br /><button onClick={ ()=> {props.button_play("play",3)} }>40 GP(デッキ3枚)  でLet'sオンゲキ</button>
        </div>
        <div>
          <label>End Juwel</label>
          <input type="radio" name="aradio" checked={props.juweltype === JUWEL_END}
                 onChange={() => props.radio_juweltype(JUWEL_END)}/> <br />
          <label>All Juwel</label>
          <input type="radio" name="aradio" checked={props.juweltype === JUWEL_ALL}
                 onChange={() => props.radio_juweltype(JUWEL_ALL)}/>
          <div>
            <label>貢ぐ(item s)</label>
            <input type="checkbox" name="acheck" checked={props.itemflag.s}
                 onChange={() => props.check_itemflag(ITEM_S)}/>
            <label>貢ぐ(item m)</label>
            <input type="checkbox" name="acheck" checked={props.itemflag.m}
                 onChange={() => props.check_itemflag(ITEM_M)}/>
            <label>貢ぐ(item l)</label>
            <input type="checkbox" name="acheck" checked={props.itemflag.l}
                 onChange={() => props.check_itemflag(ITEM_L)}/>
            <label>貢ぐ(money)</label>
            <input type="checkbox" name="acheck" checked={props.itemflag.money}
                 onChange={() => props.check_itemflag(MONEY)}/>
            <label>貢ぐ(jalll)</label>
            <input type="checkbox" name="acheck" checked={props.itemflag.jall}
                 onChange={() => props.check_itemflag(JUWEL_ALL)}/>
          </div>
          <div>
            <Returntf flag={props.itemflag.s} />
          </div>
        </div>
      </div>
      <div className="lovelv">
        <h4>親密度</h4>
        <div className="lovelv_number">
          <h1>{ props.lv.now }</h1>
        </div>
        <h5>EXP　{ props.exp.now } </h5>
      </div>
      <div className="lovelv">
        <h4>future</h4>
        <div className="lovelv_number">
          <h1>{ getExp2Lv( props.exp.now + getItemExp(props.money, props.item, props.itemflag)) }</h1>
          <h6>({ getExp2Lvper( props.exp.now + getItemExp(props.money, props.item, props.itemflag)) } %)</h6>
        </div>
        <h5>貢げるEXP　{ getItemExp(props.money, props.item, props.itemflag) } </h5>
        <h5>全捧げしたEXP　{ props.exp.now + getItemExp(props.money, props.item, props.itemflag) } </h5>
      </div>



      <div className="lovelv">
        <h4>目標値</h4>
        <div className="lovelv_number">
          <h1>{ props.lv.goal }</h1>
        </div>
        <h5>EXP　{ props.exp.goal }
        <br />残り　{ props.exp.goal - props.exp.now } ({ Math.floor((props.exp.now / props.exp.goal)*100) } %)</h5>
      </div>

      <div className="message_box">
        <Messages messages={props.mes} />
      </div>



    </div>
    );
  }
}
const validate = values => {
  const errors = {}

  if( !values.lovep ) errors.lovep = "This is Err"
  return errors
}

const mapStateToProps = state => ({
  openflag: {menu1: false},
  mes: state.input.mes,
  lv: state.input.lv,
  exp: state.input.exp,
  item: state.input.item,
  money: state.input.money,
  juwel: state.input.juwel,
  juweltype: state.input.juweltype,
  changed: state.input.changed,
  itemflag: state.input.itemflag
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
  radio_juweltype,
  check_itemflag
})

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {kore: true}
  }
  handleClick = () => {
    this.setState( {kore: !this.state.kore})
  }

  render(){
    return(
      <div>
        <button onClick={ this.handleClick }>{ this.state.kore ? "閉じ" : "開け" }まーす</button>
        <CSSTransition
          in={this.state.kore}
          classNames="door"
          timeout={1000}
          >
          <div className="door">
            <p >でしてー</p>
          </div>
        </CSSTransition>
      </div>
      )
  }
}

class InputMoney extends Component {
  constructor(props) {
    super(props)
  }
  render(){
  return(
    <div className="input_field input_money">
      <label>所持マニー→</label>
      <input type='text' className="" value={this.props.value} onChange={ (eve) => { this.props.inputValue(eve.target.value)} } />
      <ChangeValue value={this.props.changed} />
      <div>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,1000) } }>+1,000</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,10000)} }>+10,000</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,100000)} }>+100,000</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,5400)} }>+360 GP</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,5550)} }>+370 GP</button>
      </div>
      <div>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,-1000)} }>-1,000</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,-10000)} }>-10,000</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,-100000)} }>-100,000</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_MONEY,0)} } className="btn-reset">Clear</button>
      </div>
    </div>
  )}
}

class InputLv extends Component {
  constructor(props) {
    super(props)
  }
  render(){
  return(
    <div className="input_field">
      <label>現在レベル→</label>
      <input className="input_lv" type='text' value={this.props.value} onChange={ (eve) => { this.props.inputValue(eve.target.value)} } />
      <ChangeValue value={this.props.changed} />
      <div>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, 1)} }>+1</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, 10)} }>+10</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, 100)} }>+100</button>
      </div>
      <div>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, -1)} }>-1</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, -10)} }>-10</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, -100)} }>-100</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV, 0)} } className="btn-reset" >Clear</button>
      </div>
    </div>
  )}
}
class InputLvGoal extends Component {
  constructor(props) {
    super(props)
  }
  render(){
  return(
    <div className="input_field">
      <label>目標レベル→</label>
      <input className="input_lv" type='text' className="input_lv" value={this.props.value} onChange={ (eve) => { this.props.inputValue(eve.target.value)} } />
      <ChangeValue value={this.props.changed} />
      <div>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV_GOAL, -100)} }>-100</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV_GOAL, 100)} }>+100</button>
        <button onClick={ ()=> {this.props.buttonChange(BUTTON_LV_GOAL, 0)} } className="btn-reset" >Clear</button>
      </div>
    </div>
  )}
}
class InputItem extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    const labeled = type => {
      switch(type){
        case BUTTON_ITEM_S: return "（小）→"
        case BUTTON_ITEM_M: return "（中）→"
        case BUTTON_ITEM_L: return "（大）→"
        case BUTTON_JUWEL_END: return "3章ジュエル"
        case BUTTON_JUWEL_ALL: return "1/2章ジュエル"
      }
    }
    const label = labeled( this.props.type)
  return(
    <div className="input_field">
      <label>{label}</label>
      <input type='text' value={this.props.value} onChange={ (eve) => { this.props.inputValue(eve.target.value)} } />
      <ChangeValue value={this.props.changed} />
    </div>
  )}
}


const Returntf = flag =>{
  const mes = flag.flag ? "True" : "False"
  return(
    <p>{mes}</p>
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
  const lv = props.lv >= 800 ? 800 : props.lv
  const par = lv === 800 ? 100 : props.par
  const barheight = par * 1.6
  const bartop = 180 - barheight
  const barstyle = { height: barheight, top: bartop}
  const backheight = 160 - barheight
  const backtop = bartop - backheight
  const backstyle = { height: backheight, top: backtop}

  return(
    <React.Fragment>
      <div className="heart" >
        <span className="heart_lovep">{props.label}</span>
        <span className="heart_lv">{ lv }</span>
        <img src={HeartImage} className="heart_out"/>

        <div className="heart_bar" style={ barstyle }></div>
        <div className="heart_back" style={ backstyle }></div>
      </div>
    </React.Fragment>
  );
}

const ChangeValue = props => {
  const classname = "changed_value"
  const blue = { color: "rgb(40,40,240)"}
  const red = { color: "rgb(240,40,40)"}
  return(
    <React.Fragment>

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
    </React.Fragment>
  );
}

const LoveTableWithItem = props => {

  const parse = Math.floor((props.exp / props.expg )*100)
  const parse_i = Math.floor((props.itemexp / props.expg )*100)

  let parsebar = 0
  let parsebar_i = 0

  if(parse >= 100){
    parsebar = 450
  }else if(parse + parse_i >= 100){
    parsebar = parse * 4.5
    parsebar_i = (100 - parse) / 100 * 450
  }else{
    parsebar = parse * 4.5
    parsebar_i = parse_i * 4.5
  }

  const barstyle = { width: parsebar }
  const barstyle_i = { width: parsebar_i, left: parsebar}

  return(
    <React.Fragment>

      <tr>
        <th className="column_lv">
          <span className="goal_lv">{props.lv}</span>
          <div className="progbar" style={barstyle}></div>
          <div className="progbar_i" style={barstyle_i}></div>
        </th>
        <td className="column_exp">{props.expg}</td>
        <td className="column_exp">{Math.round((props.expg - props.exp - props.itemexp) * 100) / 100 }</td>
        <td className="column_exp">{ parse + parse_i } %</td>
      </tr>
    </React.Fragment>
  );
}

const MoneyTableRecord = props => {
  return(
    <React.Fragment>
      <tr>
        <th className="column_name">{props.item}</th>
        <td className="column_exp">{props.exp}</td>
        <td className="column_stock">{props.stock }</td>
        <td className="column_exp">{ props.exp * props.stock }</td>
      </tr>
    </React.Fragment>
  );
}

const getItemExp = (money, item, flag) => {
  let exp = 0

  if(flag.money){ exp += Math.floor(money * 0.01) }
  if(flag.s){ exp += item.s * 6 }
  if(flag.m){ exp += item.m * 20 }
  if(flag.l){ exp += item.l * 200 }
  return exp
}

const getExp2Lv = exp => {
  let count = exp * 10
  let next_exp = 0
  let i = 0

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
    if(count - next_exp === 0){
      i++
      break
    }else if(count - next_exp < 0){
      break
    }
  count -= next_exp
  }
  return i
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
