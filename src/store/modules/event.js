import EventService from '@/services/EventService';

const namespaced = true;

const state = {
  events: [],
  event: {},
  eventsTotal: 0,
  perPage: 3,
};

const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  ADD_TOTAL_EVENTS(state, totalEvents) {
    state.eventsTotal = totalEvents;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
};

const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT');
        const notification = {
          type: 'success',
          message: 'Your event has been created',
        };
        dispatch('notification/add', notification, { root: true });
      })
      .catch((e) => {
        const notification = {
          type: 'error',
          message: `Problem  ${e.message}`,
        };
        dispatch('notification/add', notification, { root: true });
        throw e;
      });
  },

  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then((resp) => {
        const totalEvents = resp.headers['x-total-count'];
        commit('ADD_TOTAL_EVENTS', totalEvents);
        commit('SET_EVENTS', resp.data);
        return resp.data;
      })
      .catch((e) => {
        const notification = {
          type: 'error',
          message: `There was a problem fetching events ${e.message}`,
        };
        dispatch('notification/add', notification, { root: true });
      });
  },

  fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id);
    if (event) {
      commit('SET_EVENT', event);
      return event;
    } else {
      return EventService.getEvent(id).then((resp) => {
        commit('SET_EVENT', resp.data);
        return resp.data;
      });
    }
  },
};

const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event?.id === id);
  },
};

export default {
  namespaced,
  getters,
  actions,
  state,
  mutations,
};
