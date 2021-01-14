<template>
  <v-btn
    v-if="!rows.length"
    block
    color="primary"
    @click="rows.push([{text: 'Button text'}])">
    Add keyboard
  </v-btn>

  <div v-else>
    <div
      v-for="(row,i) in rows"
      :key="i"
      class="d-flex flex-row align-center mb-2">
      <div
        v-for="(column, k) in row"
        :key="k"
        class="flex-grow-1"
        :class="{'pl-2': k > 0}">
        <v-sheet
          rounded
          class="pa-2"
          elevation="2">
          <div class="d-flex flex-row align-center">
            <div class="flex-grow-1">
              <v-text-field
                v-model="column.text"
                class="pa-0"
                hide-details />
            </div>
            <div class="pl-2">
              <v-btn
                small
                icon
                @click="removeColumn(column, row)">
                <v-icon small>
                  mdi-delete
                </v-icon>
              </v-btn>
            </div>
          </div>
        </v-sheet>
      </div>
      <div class="pl-2">
        <v-btn

          icon
          elevation="2"
          @click="row.push({text: 'Button text'})">
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-btn
      text
      block
      @click="rows.push([{}])">
      Add row
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'KeyboardConstructor',
    props: {
      post: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        rows: []
      }
    },
    watch: {
      rows: {
        deep: true,
        handler() {
          this.$emit('input', this.rows)
        }
      }
    },
    methods: {
      removeColumn(column, row) {
        row.splice(row.indexOf(column), 1);
        if (!row.length) {
          this.rows.splice(this.rows.indexOf(row), 1);
        }
      }
    }
  }
</script>

<style lang="sass" scoped>


</style>
