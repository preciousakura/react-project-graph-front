import React, { useContext, useState, useCallback } from 'react'
import { TabelaResponsiva, Tabela, Selects, Modal } from '../../components'
import { getSingleData, getExcelFile } from '../../data/services'
import { AiOutlineBorderlessTable } from "react-icons/ai";
import { Success, Upload, Error, SureDownload } from '../../components/ModalContent'
import { Tooltip } from 'antd'
import { UtilContext } from '../../utils/context'
import { AiOutlineUpload, AiOutlineDownload } from "react-icons/ai";
import './style.css'

export function Home() {

  const { setModal, modal, width, setDado, selectEstado, dados, isDownload, setIsDownload } = useContext(UtilContext)
  const [upTable, setUpTable] = useState(false)
  const [sucessUpTable, setSucessUpTable] = useState(false)
  const [errosUpTable, setErrosUpTable] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [sucessDown, setSucessDown] = useState(false)

  const [modalDownload, setModalDownload] = useState(false)
  
  const attDataSingle = useCallback(() => {
    const response = async () => {
      setLoadingModal(true)
      const data = await getSingleData(selectEstado);
      setDado(data)
      setLoadingModal(false)
    };
    response();
  }, [selectEstado, setDado])
  
  
  function current() {
    attDataSingle()
    setModal(!modal)
  }
  
  return (
  <>
    <div className="content-max">
      <div className='content'>
        <div className='header'>
          <div>
            <h1> <AiOutlineBorderlessTable/> INFORME-SE</h1>
            <p>Casos de COVID-19 confirmados no ano de 2020. </p>
          </div> 
          <div className="menu">
            <span className="title" onClick={() => current()}>INFORMAÇÕES DETALHADAS</span>
            <Selects/>
          </div>
        </div>
        {width > 500 && (
          <div className="b-icons">
            <span className='title'>
              <Tooltip color={'#202639'} placement="top" title="Carregar Arquivo">
                <AiOutlineUpload onClick={() => setUpTable(true)}/>
              </Tooltip>
            </span>
            
            {dados?.length > 0 && (<span className='title'>
              <Tooltip color={'#202639'} placement="top" title="Baixar Arquivo">
                <AiOutlineDownload onClick={() => {
                  if(isDownload === false) 
                    setModalDownload(true)
                  else {
                    getExcelFile()
                    setSucessDown(true)
                    setIsDownload(false)
                  } 
                }
                } />
              </Tooltip>
            </span>)}
          </div>
        )}
        <div className='content-left'>
          {width > 500 ? <Tabela /> : <TabelaResponsiva />}
        </div>
      </div>
      {modal && (<Modal loadingModal={loadingModal}/>)}
      {upTable && (<Upload setError={setErrosUpTable} setSucess={setSucessUpTable} setUpTable={setUpTable}/>)}
      {sucessUpTable && (<Success setVisible={setSucessUpTable} text="Tabela carregada com sucesso!"/>)}
      {errosUpTable && (<Error setVisible={setErrosUpTable} text="Erro ao carregar tabela!"/>)}
      {sucessDown && (<Success setVisible={setSucessDown} text="Tabela baixada com sucesso!"/>)}
      {modalDownload && (<SureDownload label={"Tem certeza que seja baixar a tabela? Nenhuma alteração foi salva"} setSuccessVisible={setSucessDown} setVisible={setModalDownload}/>)}
    </div>
  </>
  )
}