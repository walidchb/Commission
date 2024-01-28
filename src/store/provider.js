'use client'

import { Provider } from 'react-redux'
import store from '.'
import Page from '@/app/[locale]/page'

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>
}
