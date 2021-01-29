import React from 'react'
import { Calendar,  momentLocalizer} from 'react-big-calendar'
import moment from 'moment';


import { Navbar } from '../ui/Navbar'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helpers/calendar-messages-espa'

//Esto es para cambiarle el idioma a español pero se debe tener en
// cuenta que se debe de importar la libreria de moment como esta arriba
import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeletedEventFab } from '../ui/DeletedEventFab';
import { useEffect } from 'react';
moment.locale('es');

const localizer = momentLocalizer(moment) // or globalizeLocalizer

// const events = [{
//     title: 'Cumpple',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Comprar',
//     user: {
//         _id: '1234',
//         name: 'Daniel'
//     }
// }]

export const CalendarScreem = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { uid } = useSelector(state => state.auth);

// Guardo el estado de la pagina actual o el evento en donde esta el calendario
    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    useEffect(() => {

        dispatch( eventStartLoading() );
        
    }, [dispatch])

    /**
     * Estos son las funciones para los eventos personalizados
     * para el calendario
     *  
     */

    const onDoubleClick = (e) => {
        // console.log(e)
        // console.log('abrir modal')
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e) );

    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() );
    }

    /** 
     * Este evento devolvera los estilos que le queremos dar al
     * calendario
    */
    const eventStyleGetter = ( event, start, end, isSelected ) => {


        
        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    };

    return (
        <div className="calendar-screem">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                view={ lastView } // es para traer la vista y que no se pierda
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            {
                activeEvent &&
                <DeletedEventFab />
            }

            <CalendarModal />

        </div>
    )
}
