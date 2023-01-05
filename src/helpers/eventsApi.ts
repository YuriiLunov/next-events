import { API_URL } from '../constants/api';
import IEvent from '../interfaces/IEvent';
import IEventDateFilter from '../interfaces/IEventDateFilter';

export async function getAllEvents(queryParams?: string): Promise<IEvent[]> {
  const response = await fetch(
    `${API_URL}/events.json${queryParams ? `?${queryParams}` : ''}`
  );
  const data = await response.json();

  const events = Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));

  return events;
}

export async function getFeaturedEvents(): Promise<IEvent[]> {
  const featuredEvents = await getAllEvents(
    'orderBy="isFeatured"&startAt=true'
  );

  return featuredEvents;
}

export async function getEventById(eventId: string): Promise<IEvent> {
  const response = await fetch(`${API_URL}/events/${eventId}.json`);
  const data = await response.json();

  return {
    id: eventId,
    ...data,
  };
}

export async function getFilteredEvents(
  dateFilter: IEventDateFilter
): Promise<IEvent[]> {
  const { year, month } = dateFilter;
  const dateString = `${year}-${String(month).padStart(2, '0')}`

  const filteredEvents = await getAllEvents(
    'orderBy="date"'
    +`&startAt="${dateString}"`
    +`&endAt="${dateString}\uf8ff"`
    +'&once="value"'
  );

  return filteredEvents;
}