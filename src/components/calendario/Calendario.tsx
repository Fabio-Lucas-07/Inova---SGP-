import React, { useState } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendario.css'

const withDragAndDropFunc = 
  typeof withDragAndDrop === 'function' 
    ? withDragAndDrop 
    : (withDragAndDrop as any).default

const DragAndDropCalendar = withDragAndDropFunc(Calendar)
const localizer = momentLocalizer(moment)

const Calendario = () => {
  const [events, setEvents] = useState([{
    id: 1,
    title: 'Atividade 1',
    start: new Date(2026, 2, 24, 10, 0),
    end: new Date(2026, 2, 31, 15, 0),
    desc: 'Nossa primeira atividade',
    color: 'red',
    tipo: 'Atividade'
  }])

  // 1. Criamos estados para controlar a Data e a Visualização (Mês, Semana, etc)
  const [dataAtual, setDataAtual] = useState(moment().toDate())
  const [visualizacaoAtual, setVisualizacaoAtual] = useState(Views.MONTH)

  return (
    // Adicionei um padding-top (pt-16) assumindo que você usa Tailwind, 
    // para afastar os botões da sua Navbar!
    <div className='calendar pt-16'>
        <DragAndDropCalendar
          localizer={localizer}
          events={events}
          
          // 2. Trocamos os "default" pelas props controladas
          date={dataAtual}
          view={visualizacaoAtual}
          
          // 3. Dizemos aos botões o que fazer quando forem clicados
          onNavigate={(novaData) => setDataAtual(novaData)}
          onView={(novaView) => setVisualizacaoAtual(novaView)}
          
          // 4. CORREÇÃO CRÍTICA: resizable deve ser true (booleano)
          resizable={true} 
        />
    </div>
  )
}

export default Calendario