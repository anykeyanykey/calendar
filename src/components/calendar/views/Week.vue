<template>
  <div class="week-view">
    <div
      class="week-view-inner d-flex flex-column"
    >
      <div class="week-view-header d-flex">
        <div
          v-for="i of 7"
          :key="i"
          class="week-view-header-cell"
        >
          <div class="cell-inner">
            {{ days[i-1] }}
          </div>
        </div>
      </div>
      <div class="week-view-content d-flex flex-grow-1">
        <div
          v-for="i of 7"
          :key="i"
          class="week-view-content-cell"
        >
          <div class="cell-inner d-flex align-center justify-center">
            <div class="text-center">
              <week-point
                v-for="(post,k) of eventsMap[i]"
                :key="k"
                :post="post"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import moment from 'moment'
  import WeekPoint from '../previews/WeekPoint';

  export default {
    name: 'WeekView1',
    components: {
      WeekPoint
    },
    props: {
      start: {
        type: String,
        required: true
      },
      events: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        eventsMap: {}
      }
    },
    watch: {
      events() {
        this.buildEventsMap()
      }
    },
    created() {
      this.buildEventsMap()
    },
    methods: {
      buildEventsMap() {
        for (let i = 1; i < 8; i++) {
          this.$set(this.eventsMap, 'i', [])
          const startOfDay = moment(this.start).add(i - 1, 'day').startOf('day')
          const endOfDay = moment(this.start).add(i - 1, 'day').endOf('day')
          this.eventsMap[i] = this.events.filter(({ date }) => {
            const d = moment(date)
            return d >= startOfDay && d <= endOfDay
          })
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
    .week-view
        width: 100%
        height: 100%

        .cell-inner
            height: 100%
            border-left: 1px solid black

        &-inner
            width: 100%
            height: 100%

        &-header
            border-bottom: 1px solid black

            &-cell
                flex-grow: 1
                flex-basis: 0

        &-content
            &-cell

                flex-grow: 1
                flex-basis: 0

</style>
