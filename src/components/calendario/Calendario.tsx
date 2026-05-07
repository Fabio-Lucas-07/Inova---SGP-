import React, { useState } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendario.css'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

moment.locale('pt-br')

const withDragAndDropFunc =
  typeof withDragAndDrop === 'function'
    ? withDragAndDrop
    : (withDragAndDrop as any).default

const DragAndDropCalendar = withDragAndDropFunc(Calendar)
const localizer = momentLocalizer(moment)

const mensagensCalendario = {
  allDay: 'Dia Inteiro',
  previous: 'Anterior',
  next: 'Próximo',
  today: 'Hoje',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'Não há agendamentos neste período.',
}

const Calendario = ({ events, setEvents }) => {
  const [nome, setNome] = useState('')
  const [dia, setDia] = useState('')
  const [horario, setHorario] = useState('')
  const [descricao, setDescricao] = useState('')

  const [dialog, OpenDialog] = useState(false)
  const [dialogMB, OpenDialogMB] = useState(false)

  const [dialogDetalhes, setDialogDetalhes] = useState(false)
  const [eventoSelecionado, setEventoSelecionado] = useState(null)

  const [dataAtual, setDataAtual] = useState(moment().toDate())
  const [visualizacaoAtual, setVisualizacaoAtual] = useState(Views.MONTH)

  const agendar = (e) => {
    e.preventDefault();

    if (!nome || !dia || !horario) {
      alert("Preencha o nome, dia e horário!");
      return;
    }

    const dataInicio = moment(`${dia} ${horario}`, 'YYYY-MM-DD HH:mm').toDate();
    const dataFim = moment(dataInicio).add(1, 'hours').toDate();

    setEvents((eventosAnteriores) => {
      const proximoId = eventosAnteriores.length > 0
        ? Math.max(...eventosAnteriores.map(e => e.id)) + 1
        : 1;

      const novoEvento = {
        id: proximoId,
        title: nome,
        start: dataInicio,
        end: dataFim,
        desc: descricao,
        color: 'blue',
        tipo: 'Novo Agendamento'
      };

      return [...eventosAnteriores, novoEvento];
    });

    setNome('');
    setDia('');
    setHorario('');
    setDescricao('');
    OpenDialog(false);
    OpenDialogMB(false);
  }

  const aoMoverEvento = ({ event, start, end }) => {
    const eventosAtualizados = events.map((ev) =>
      ev.id === event.id ? { ...ev, start, end } : ev
    )
    setEvents(eventosAtualizados)
  }

  const aoRedimensionarEvento = ({ event, start, end }) => {
    const eventosAtualizados = events.map((ev) =>
      ev.id === event.id ? { ...ev, start, end } : ev
    )
    setEvents(eventosAtualizados)
  }

  const aoClicarNoEvento = (evento) => {
    setEventoSelecionado(evento)
    setDialogDetalhes(true)
  }

  return (
    <div>
      <div className='calendar hidden md:block'>
        <div className='grid grid-cols-2 pb-8 h-20'>
          <h1>Agenda de hoje</h1>
          <div className='flex justify-end '>
            <Dialog open={dialog} onOpenChange={OpenDialog}>
              <DialogTrigger asChild>
                <Button className='bg-[#5B2814] rounded-md h-10 text-[20px] hover:cursor-pointer '>
                  <Plus />Novo Agendamento
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-sm bg-[#261810] text-[#F2E0C9] scale-120">
                <form onSubmit={agendar}>
                  <DialogHeader>
                    <DialogTitle>Novo Agendamento</DialogTitle>
                    <DialogDescription className='text-[#F2E0C9]'>
                      Preencha as informações para adicionar um novo agendamento.
                    </DialogDescription>
                  </DialogHeader>
                  <FieldGroup>
                    <Field>
                      <Label htmlFor="nome">Nome</Label>
                      <Input id="nome" onChange={(e) => setNome(e.target.value)} value={nome} placeholder="Ex: Joao da Silva" className='border-[#F2E0C9] bg-[#F2E0C9] text-black' />
                    </Field>
                    <Field>
                      <Label htmlFor="dia">Dia</Label>
                      <Input id="dia" type="date" onChange={(e) => setDia(e.target.value)} value={dia} className='border-[#F2E0C9] bg-[#F2E0C9] text-black' />
                    </Field>
                    <Field>
                      <Label htmlFor="horario">Horário de Início</Label>
                      <Input id="horario" type="time" onChange={(e) => setHorario(e.target.value)} value={horario} className='border-[#F2E0C9] bg-[#F2E0C9] text-black' />
                    </Field>
                    <Field>
                      <Label htmlFor="descricao">Descrição</Label>
                      <Input id="descricao" onChange={(e) => setDescricao(e.target.value)} value={descricao} className='border-[#F2E0C9] bg-[#F2E0C9] text-black' />
                    </Field>
                  </FieldGroup>
                  <DialogFooter className="mt-4">
                    <DialogClose asChild>
                      <Button type="button" className='hover:cursor-pointer'>Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" className='hover:cursor-pointer'>Agendar</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div style={{ height: '70vh' }}>
          <DragAndDropCalendar
            localizer={localizer}
            events={events}
            date={dataAtual}
            view={visualizacaoAtual}
            onNavigate={(novaData) => setDataAtual(novaData)}
            onView={(novaView) => setVisualizacaoAtual(novaView)}
            resizable={true}
            messages={mensagensCalendario}
            onEventDrop={aoMoverEvento}
            onEventResize={aoRedimensionarEvento}
            selectable={true}
            onSelectEvent={aoClicarNoEvento}
          />
        </div>
      </div>

      <div className='md:hidden'>
        <Dialog open={dialogMB} onOpenChange={OpenDialogMB}>
          <DialogTrigger asChild>
            <Button className='fixed bottom-8 right-8 z-50 bg-[#5B2814] rounded-full h-14 w-14 p-4 text-[20px] hover:cursor-pointer shadow-lg'>
              <Plus />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-sm bg-[#261810] text-[#F2E0C9] ">
            <form onSubmit={agendar}>
              <DialogHeader>
                <DialogTitle>Novo Agendamento</DialogTitle>
                <DialogDescription className='text-[#F2E0C9]'>
                  Preencha as informações para adicionar um novo agendamento.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" onChange={(e) => setNome(e.target.value)} value={nome} placeholder="Ex: Joao da Silva" className='border-[#F2E0C9] bg-[#F2E0C9] text-black' />
                </Field>
                <Field>
                  <Label htmlFor="dia">Dia</Label>
                  <Input id="dia" type="date" onChange={(e) => setDia(e.target.value)} value={dia} className='border-[#F2E0C9] bg-[#F2E0C9] text-black' />
                </Field>
                <Field>
                  <Label htmlFor="horario">Horário de Início</Label>
                  <Input id="horario" type="time" onChange={(e) => setHorario(e.target.value)} value={horario} className='border-[#F2E0C9] bg-[#F2E0C9] text-black' />
                </Field>
                <Field>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Input id="descricao" onChange={(e) => setDescricao(e.target.value)} value={descricao} className='border-[#F2E0C9] bg-[#F2E0C9] text-black' />
                </Field>
              </FieldGroup>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button type="button" className='hover:cursor-pointer'>Cancelar</Button>
                </DialogClose>
                <Button type="submit" className='hover:cursor-pointer'>Agendar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        <div style={{ height: '80vh', marginTop: '20px' }}>
          <DragAndDropCalendar
            localizer={localizer}
            events={events}
            date={dataAtual}
            view={visualizacaoAtual}
            onNavigate={(novaData) => setDataAtual(novaData)}
            onView={(novaView) => setVisualizacaoAtual(novaView)}
            resizable={true}
            messages={mensagensCalendario}
            onEventDrop={aoMoverEvento}
            onEventResize={aoRedimensionarEvento}
            onSelectEvent={aoClicarNoEvento}
          />
        </div>
      </div>

      <Dialog open={dialogDetalhes} onOpenChange={setDialogDetalhes}>
        <DialogContent className="sm:max-w-sm bg-[#261810] text-[#F2E0C9]">
          <DialogHeader>
            <DialogTitle>Detalhes da Consulta</DialogTitle>
          </DialogHeader>
          
          {eventoSelecionado && (
            <div className="flex flex-col gap-3 mt-4">
              <div>
                <span className="font-bold text-gray-300">Paciente/Nome:</span>
                <p className="text-lg">{eventoSelecionado.title}</p>
              </div>
              
              <div>
                <span className="font-bold text-gray-300">Data:</span>
                <p>{moment(eventoSelecionado.start).format('DD/MM/YYYY')}</p>
              </div>

              <div>
                <span className="font-bold text-gray-300">Horário:</span>
                <p>
                  {moment(eventoSelecionado.start).format('HH:mm')} às {moment(eventoSelecionado.end).format('HH:mm')}
                </p>
              </div>

              <div>
                <span className="font-bold text-gray-300">Descrição:</span>
                <p className="p-2 mt-1 bg-[#1a100b] rounded-md min-h-[60px]">
                  {eventoSelecionado.desc ? eventoSelecionado.desc : 'Nenhuma descrição fornecida.'}
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" className='bg-[#5B2814] hover:bg-[#4a1f0f] hover:cursor-pointer'>
                Fechar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Calendario