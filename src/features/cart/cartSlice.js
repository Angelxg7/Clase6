import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    user:"gabriel",
    items:[],
    total:null,
    updateAt:"",
  }
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem:(state,action)=>{

        const foundItem = state.value.items.find(item => item.id === action.payload.id)

        if(foundItem) foundItem.quantity++
        else state.value.items.push({...action.payload,quantity:1})

        state.value.total = state.value.items.reduce((acc,item)=> acc + (item.price * item.quantity),0)
        state.value.updateAt = new Date().toLocaleString()
    },
    removeItem:(state,action)=>{
      state.value.items = state.value.items.filter(item => item.id !== action.payload.id)
    },
    clearCart:(state)=>{
      state.value.items = []
    },
    increase:(state,action)=>{
      const foundItem = state.value.items.find(item => item.id === action.payload.id)

        if(foundItem) foundItem.quantity++

        state.value.total = state.value.items.reduce((acc,item)=> acc + (item.price * item.quantity),0)
        state.value.updateAt = new Date().toLocaleString()
    },
    decrease:(state,action)=>{
      const foundItem = state.value.items.find(item => item.id === action.payload.id)

        if(foundItem) foundItem.quantity--
        
        state.value.total = state.value.items.reduce((acc,item)=> acc + (item.price * item.quantity),0)
        state.value.updateAt = new Date().toLocaleString()
    },
    calculateTotal:(state)=>{
        let quantity = 0
        let total = 0
        state.value.items.forEach((item) => {
          quantity += item.quantity
          total += item.quantity * item.price
        });
        state.value.quantity = quantity
        state.value.total = total
    }
  },
})

export const { addItem, removeItem, increase, decrease, clearCart, calculateTotal } = cartSlice.actions

export default cartSlice.reducer