import { createSlice } from '@reduxjs/toolkit'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    lang: ''
  },
  reducers: {
    setState: (state, action) => {
      return { ...state, ...action.payload }
    },
    setLang: (state, action) => {
      return { ...state, lang: action.payload }
    }
  }
})

export const { setState, setLang } = mainSlice.actions

export default mainSlice.reducer
