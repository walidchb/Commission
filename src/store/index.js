'use client'

import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './features/main/mainSlice'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    main: mainReducer
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)

export default store
