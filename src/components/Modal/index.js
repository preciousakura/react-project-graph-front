import React, { useContext } from 'react';
import './style.css'
import { Grafico, Informacoes, SelectGrafico } from '../'
import { AiFillCloseCircle } from "react-icons/ai";
import { Tooltip } from 'antd'
import { UtilContext } from '../../utils/context'
import { LoadingOutlined } from '@ant-design/icons';

export function Modal({loadingModal}) {
  const { setModal, modal, dados, selectEstado } = useContext(UtilContext)
  return(
  <>
    <div className="content-modal">
      <div className='modal'>
        <div className="close">
          <Tooltip color={'#202639'} placement="leftTop" title="Fechar">
            <AiFillCloseCircle onClick={()=>setModal(!modal)}/>
          </Tooltip>
        </div>
        {loadingModal ? 
        <div className="loading-data">
         <h1>Carregando</h1>
         <LoadingOutlined style={{ fontSize: 30 }} spin />
        </div>
        : dados && dados.length > 0 && selectEstado !== '' ? 
        <> 
          <div className="comp"> 
            <div class="title-grafico"><h2>Selecione o tipo de gráfico: </h2><SelectGrafico/></div>
            <Grafico/>
          </div>
          <div className="comp"><Informacoes/></div>
        </>
        : selectEstado === '' ?
        <div className="loading-data">
          <h1>NENHUMA COLUNA SELECIONADA</h1>
        </div>
        :   
        <div className="loading-data">
          <h1>NENHUM DADO ENCONTRADO</h1>
        </div>}
      </div>
    </div>
  </>
  )
}