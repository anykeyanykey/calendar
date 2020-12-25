<template>
  <div>
    <div style="white-space: nowrap">
      <v-btn
        small
        class="mr-3"
        @click="makeBold">
        <v-icon small>
          mdi-format-bold
        </v-icon>
      </v-btn>
      <v-btn
        small
        class="mr-3"
        @click="makeItalic">
        <v-icon small>
          mdi-format-italic
        </v-icon>
      </v-btn>
      <v-btn
        small
        class="mr-3"
        @click="makeUnderline">
        <v-icon small>
          mdi-format-underline
        </v-icon>
      </v-btn>
      <v-btn
        small
        class="mr-3"
        @click="makeStrikethrough">
        <v-icon small>
          mdi-format-strikethrough
        </v-icon>
      </v-btn>
      <v-btn
        small
        class="mr-3"
        @click="makeCode">
        <v-icon small>
          mdi-code-braces
        </v-icon>
      </v-btn>
      <v-btn
        small
        @click="pasteLink">
        <v-icon small>
          mdi-link-variant-plus
        </v-icon>
      </v-btn>
    </div>
    <div>
      <v-textarea
        ref="textarea"
        v-model="valueI"
        counter="100"
        placeholder="Post text"
        @input="$emit('input', $event)"
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
      makeBold() {
        this.$refs.textarea.focus()
        this.replaceWith('*', 'bold')
      },
      makeItalic() {
        this.$refs.textarea.focus()
        this.replaceWith('_', 'italic')
      },
      makeUnderline() {
        this.$refs.textarea.focus()
        this.replaceWith('__', 'underline')
      },
      makeStrikethrough() {
        this.$refs.textarea.focus()
        this.replaceWith('~', 'strikethrough')
      },
      makeCode() {
        this.$refs.textarea.focus()
        this.replaceWith('`', 'code')
      },
      pasteLink() {
        const _textarea = this.$refs.textarea.$el.querySelector('textarea')
        const { selectionStart, selectionEnd } = _textarea
        this.valueI = this.valueI.substring(0, selectionStart) +
          '[inline URL](http://www.example.com/)' + this.valueI.substring(selectionEnd)
        this.$emit('input', this.valueI)
      },
      replaceWith(quote, placeholder) {
        const _textarea = this.$refs.textarea.$el.querySelector('textarea')
        const { selectionStart, selectionEnd } = _textarea
        if (selectionEnd !== selectionStart) {
          this.valueI = this.valueI.substring(0, selectionStart) +
            quote + this.valueI.substring(selectionStart, selectionEnd) + quote
            + this.valueI.substring(selectionEnd)
        } else {
          this.valueI = this.valueI.substring(0, selectionStart) +
            `${quote}${placeholder}${quote}` + this.valueI.substring(selectionEnd)
        }
        this.$emit('input', this.valueI)
      }
    }
  };
</script>
