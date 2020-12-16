<template>
  <div class="week-view">
    <div
      class="week-view-inner"
      @scroll="setOffset"
    >
      <div
        class="d-flex flex-column week-view-left-side"
        :style="{left: offsetPx}"
      >
        <div style="flex: 0 0 30px; border-bottom: 1px solid black" />
        <div
          class="flex-grow-1 d-flex flex-column"
        >
          <div
            v-for="i of 7"
            :key="i"
            class="flex-grow-1 d-flex align-items-center justify-content-center week-view-row"
          >
            {{ days[i-1] }}
          </div>
        </div>
      </div>
      <div
        class="d-flex flex-column week-view-right-side"
      >
        <div
          style="flex: 0 0 30px; border-bottom: 1px solid black"
          class="d-flex flex-row"
        >
          <div
            v-for="i of 24"
            :key="i"
            class="week-view-cell week-view-cell--header"
            style="flex: 0 0 100px"
          >
            {{ time1(i-1) }}
          </div>
        </div>
        <div
          ref="usernameInput"
          class="flex-grow-1 d-flex flex-column"
        >
          <div
            v-for="i of 7"
            :key="i"
            class="flex-grow-1 d-flex flex-row week-view-row"
          >
            <div
              v-for="i of 24"
              :key="i"
              class="week-view-cell"
              style="flex: 0 0 100px"
            />
            <div
              v-for="(event, i) of eventsMap[i]"
              :key="i"
              style="position: absolute"
              :style="{ left: event.timeOffset + 'px' }"
              class="event"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import mo from 'moment'

  export default {
    name: 'WeekView',
    components: {

    },
    data() {
      return {
        weekStart: '2020-12-13T00:00:00+04:00',
        offset: 0,
        days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        events: [{ date: '2020-12-16T13:39:06+04:00' }],
        eventsMap: {}
      }
    },
    computed: {
      offsetPx() {
        return `${this.offset}px`
      }
    },
    mounted() {
      const f = 2400 / 86400
      for (let i = 0 ; i < 7 ; i++) {
        this.$set(this.eventsMap, 'i',[])
        const curDay = mo(this.weekStart).add(i, 'day')
        const filtered = this.events.filter(({ date }) => mo(date) >= curDay && mo(date) < mo(this.weekStart).add(i+1, 'day'))
        if (filtered.length) {
          this.eventsMap[i] = filtered.map(({ date })=>({
            date,
            timeOffset: mo(date).diff(curDay, 'seconds') * f
          }))
        }
      }
    },
    methods: {
      time1(i) {
        return `${i < 9 ? '0' + i : i}:00`
      },
      setOffset({ target }) {
        this.offset = target.scrollLeft
      }
    }
  }
</script>

<style lang="sass" scoped>
  .week-view
    width: 100%
    height:100%
    &-inner
      position: relative
      height: 100%
      overflow: auto
      padding: 0 0 0 100px
    &-left-side
      position: absolute
      top: 0
      height: 100%
      width: 100px
      border-right: 1px solid black
      background: white
      z-index: 1
    &-right-side
      height: 100%
      width: 2400px
    .event
      height: 100%
      width: 1px
      background: red
    .week-view-cell
      &:not(:first-child)
        border-left: 1px solid black
      &--header
        display: flex
        align-items: center
        padding: 0 0 0 10px


    &-row
      position: relative
      &:not(:last-child)
        border-bottom: 1px solid black

</style>
