<template>
  <div class="calendar">
    <div class="calendar-header d-flex">
      <div><span @click="decreaseMonth">@</span></div>
      <div>Декабрь 2020</div>
      <div><span @click="increaseMonth">@</span></div>
    </div>
    <div class="calendar-content">
      <div class="week-days d-flex">
        <div class="flex-grow-1">
          Пн
        </div>
        <div class="flex-grow-1">
          Вт
        </div>
        <div class="flex-grow-1">
          Ср
        </div>
        <div class="flex-grow-1">
          Чт
        </div>
        <div class="flex-grow-1">
          Пт
        </div>
        <div class="flex-grow-1">
          Сб
        </div>
        <div class="flex-grow-1">
          Вс
        </div>
      </div>
      <div
        v-for="(week, k) of weeks"
        :key="k"
        class="week-row d-flex"
      >
        <div
          v-for="(d, i) of week"
          :key="i"
          class="flex-grow-1"
        >
          {{ d.day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import c from 'calendar'
  export default {
    name: 'Calendar',
    props: {
      msg: String
    },
    data() {
      return {
        // date: new Date(2020, 11, 1),
        year: null,
        month: null,
        // weeks: []
      }
    },
    computed: {
      weeks() {
        console.log(this.year, this.month)
        return this.getMonthData(this.year, this.month)
      }
    },
    created() {
      const d = new Date()
      this.year = d.getFullYear()
      this.month = d.getMonth()

      // / this.weeks =

    },
    methods: {
      decreaseMonth() {
        const pret = this.month - 1;
        if (pret < 0) {
          this.year--
          this.month = 11
        } else {
          this.month--
        }
        //   this.month = this.month
      },
      increaseMonth() {
        const pret = this.month + 1;
        if (pret > 11) {
          this.year++
          this.month = 0
        } else {
          this.month++
        }
        //   this.month = this.month
      },
      getMonthData(year, month) {
        const totalDays = this.getTotalDays(year);

        const cal = new c.Calendar(1);

        const m = cal.monthDays(year, month)
        const weeks = []
        for (let i=0; i < m.length; i++) {
          const week = m[i].map((day) => {
            return  { day }
          })
          weeks.push(week)
        }

        const first = weeks[0]
        const last = weeks[weeks.length-1]
        let leadingCount = totalDays[month-1] ? totalDays[month-1] : this.getTotalDays(year-1).pop()

        for (let i = first.length - 1; i >= 0; i--) {
          if (first[i].day === 0) {
            first[i].day = leadingCount--
          }
        }
        let trailing = 1
        for (let i = 0; i < last.length; i++) {
          if (last[i].day === 0) {
            last[i].day = trailing++
          }
        }

        return weeks
      },
      getTotalDays(year) {
        let totalFeb;
        if ((year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
          totalFeb = 29;
        } else {
          totalFeb = 28;
        }
        return [31, totalFeb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      }

    }
  }
</script>

<style lang="sass" scoped>
    .calendar
        width: 500px

</style>
