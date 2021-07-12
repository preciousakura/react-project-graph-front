import React from 'react'
import { Tabela, Selects, Grafico } from '../../components'
import './style.css'

export function Home() {
  return(
    <div className='content'>
      <div className='content-left'><Tabela/></div>
      <div className='content-right'><Selects/><Grafico/></div>
    </div>
  )
}