<template>
  <div>
    <div>
      <v-btn
        class="mr-3"
        @click="makeBold">
        <v-icon>mdi-format-bold</v-icon>
      </v-btn>
      <v-btn
        class="mr-3"
        @click="makeItalic">
        <v-icon>mdi-format-italic</v-icon>
      </v-btn>
      <v-btn
        class="mr-3"
        @click="makeUnderline">
        <v-icon>mdi-format-underline</v-icon>
      </v-btn>
      <v-btn
        class="mr-3"
        @click="makeStrikethrough">
        <v-icon>mdi-format-strikethrough</v-icon>
      </v-btn>
      <v-btn
        class="mr-3"
        @click="makeCode">
        <v-icon>mdi-link-variant-plus</v-icon>
      </v-btn>
      <v-btn
        @click="pasteLink">
        <v-icon>mdi-link-variant-plus</v-icon>
      </v-btn>
    </div>
    <div>
      <v-textarea
        ref="textarea"
        v-model="valueI"
        counter
        placeholder="Post text"
        @input="onChange"
      />
      <!--@change="$emit('input', $event.target.value)"-->
    </div>
  </div>
</template>

<script>

  export default {
    name: 'DescriptionInput',
    components: {},
    props: ['value'],
    data: () => ({
      valueI: '',
    }),
    created() {
      this.valueI = this.value
    },
    methods: {
      onChange(value) {
        //  console.log('HERE', $event)
        this.$emit('input', value)
      },
      makeBold() {
        this.$refs.textarea.focus()
        this.replaceWith('*')
      },
      makeItalic() {
        this.$refs.textarea.focus()
        this.replaceWith('_')
      },
      makeUnderline() {
        this.$refs.textarea.focus()
        this.replaceWith('__')
      },
      makeStrikethrough() {
        this.$refs.textarea.focus()
        this.replaceWith('~')
      },
      makeCode() {
        this.$refs.textarea.focus()
        this.replaceWith('`')
      },
      pasteLink() {
        const _textarea = this.$refs.textarea.$el.querySelector('textarea')
        const { selectionStart, selectionEnd } = _textarea
        this.valueI = this.valueI.substring(0, selectionStart) +
          '[inline URL](http://www.example.com/)' + this.valueI.substring(selectionEnd)
        this.$emit('input', this.valueI)
      },
      replaceWith(quote) {
        const _textarea = this.$refs.textarea.$el.querySelector('textarea')
        const { selectionStart, selectionEnd } = _textarea
        if (selectionEnd !== selectionStart) {
          this.valueI = this.valueI.substring(0, selectionStart) +
            quote + this.valueI.substring(selectionStart, selectionEnd) + quote
            + this.valueI.substring(selectionEnd)
          this.$emit('input', this.valueI)
        }
      }
    }
  };
</script>
