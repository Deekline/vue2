<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCart v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page !== 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page
      </router-link>
    </template>
    <template v-if="hasNextPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
      >
        Next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCart from '../components/EventCart';
import { mapState } from 'vuex';
import store from '@/store';

const getPageEvents = (routerTo, next) => {
  const currentPage = parseInt(routerTo.query.page) || 1;
  store
    .dispatch('event/fetchEvents', {
      page: currentPage,
    })
    .then(() => {
      routerTo.params.page = currentPage;
      next();
    });
};

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: { EventCart },

  beforeRouteEnter(routerTo, routerFrom, next) {
    getPageEvents(routerTo, next);
  },
  beforeRouteUpdate(routerTo, routerFrom, next) {
    getPageEvents(routerTo, next);
  },

  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage;
    },
    ...mapState(['event', 'user']),
  },
};
</script>
