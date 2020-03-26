import {
  INPUT,
  INPUT_GOALLV,
  INPUT_ITEM_S,
  INPUT_ITEM_M,
  INPUT_ITEM_L,
  BUTTON_LV,
  BUTTON_ITEM_S,
  BUTTON_ITEM_M,
  BUTTON_ITEM_L
} from '../actions'

const initialState = {  lv:  {now: 0, goal: 600},
                        exp: {now: 0, goal: 29700},
                        item: {s: 0, m: 0, l: 0 },
                      }

const lovelv2exp2 = lv => {

  let count = 0

  for( let i = 0; i < lv; i++ ){
    if(i < 100){
      for( let j = Math.floor(i/10); j*10 <= i ; j++){
        count += 6 + (( j - 1 ) * 6)
      }
      count +=  6
    }

    else if(i >= 100 ){
      let h = Math.floor(i/100)
      const hi = i - h * 100;

      if( i >= 700){
        h = 21
      }
      else if( i >= 600){
        h = 14
      }

      for( let j = Math.floor(hi/10); j*10 <= hi ; j++){
        count += (6 + ( j - 1 ) * 6) * (1 + 0.2 * h )
      }
      count +=  6 *  (1 + 0.2 * h )
    }
  }
  return Math.round(count * 100) / 100
}

const validate = (value, max) => {
  if( value >= 0 && value <= max){
    return Math.floor(value)
  }else if( value > max){
    return max
  }else{
    return 0
  }
}

export default (state = initialState, action) => {
  let new_item = validate(action.item, 9999)
  let new_lv = validate(action.lv, 800)

  switch(action.type){
    case INPUT:
      return {
        exp: { now: lovelv2exp2(new_lv),
              goal: state.exp.goal},
        lv: {  now: new_lv,
              goal: state.lv.goal },
        item: state.item,
      }

    case INPUT_GOALLV:
      return {
         exp: { now: state.exp.now,
                goal: lovelv2exp2(new_lv) },
          lv: { now: state.lv.now,
                goal: new_lv },
        item: state.item
      }

    case INPUT_ITEM_S:
      return {
        exp: state.exp,
        lv:  state.lv,
        item: { s: new_item, m: state.item.m, l: state.item.l }
      }

    case INPUT_ITEM_M:
    return {
      exp: state.exp,
      lv:  state.lv,
      item: { s: state.item.s, m: new_item, l: state.item.l }
    }

    case INPUT_ITEM_L:
      return {
        exp: state.exp,
        lv:  state.lv,
        item: { s: state.item.s, m: state.item.m, l: new_item }
      }

    case BUTTON_LV:
    new_lv = action.change === 0 ? 0 : validate(state.lv.now + action.change, 800)
      return {
        exp: { now: lovelv2exp2(new_lv),
              goal: state.exp.goal},
        lv: {  now: new_lv,
              goal: state.lv.goal },
        item: state.item,
      }

    case BUTTON_ITEM_S:
      new_item = action.change === 0 ? 0 : validate(state.item.s + action.change, 9999)
      return {
        exp: state.exp,
        lv:  state.lv,
        item: { s: new_item, m: state.item.m, l: state.item.l }
      }
    case BUTTON_ITEM_M:
      new_item = action.change === 0 ? 0 : validate(state.item.m + action.change, 9999)
      return {
        exp: state.exp,
        lv:  state.lv,
        item: { s: state.item.s, m: new_item, l: state.item.l },
      }
    case BUTTON_ITEM_L:
      new_item = action.change === 0 ? 0 : validate(state.item.l + action.change, 9999)
      return {
        exp: state.exp,
        lv:  state.lv,
        item: { s: state.item.s, m: state.item.m, l: new_item }
      }

    default:
      return state
  }
}
