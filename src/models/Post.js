import _ from 'lodash'

const forEscape = ['_', '*', '[', ']', '(', ')', '~', '`', /*'>', '#', '+', '-', '=', '|', '{', '}', '.', '!'*/]
const useful = ['_', '*', '[', ']', '(', ')', '~', '`']
const aRegExp = /(?<!\\)\[(.*?)\]\((.*)(?<!\\)\)/g
const preRegExp = /(?<!\\)`{3}((?:.|\n)*?)(?<!\\)`{3}/g
const codeRegExp = /(?<!\\)`{1}((?:.|\n)*?)(?<!\\)`{1}/g
const bRegExp = /(?<!\\)\*((?:.|\n)*?)(?<!\\)\*/g
const sRegExp = /(?<!\\)~((?:.|\n)*?)(?<!\\)~/g
const iRegExp = /(?<!\\)_{1}((?:.|\n)*?)(?<!\\)_{1}/g
const uRegExp = /(?<!\\)_{2}((?:.|\n)*?)(?<!\\)_{2}/g
const iuRegExp = /(?<!\\)_{3}((?:.|\n)*?)(?<!\\)_{3}/g

export class Post {
	text

	type = 'text' // animation

	get textMaxLength() {
		switch (this.type) {
			case 'text':
				return 4096
			case 'animation':
			case 'photo':
			case 'audio':
			case 'document':
			case 'video':
			case 'voice':
				return 1024
		}
		return 1024
	}

	get html() {
		return _.trim(this.text)
			.replace(bRegExp, (a1, a2) => `<b>${_.trim(a2)}</b>`)
			.replace(uRegExp, (a1, a2) => `<u>${_.trim(a2)}</u>`)
			.replace(iRegExp, (a1, a2) => `<i>${_.trim(a2)}</i>`)
			.replace(sRegExp, (a1, a2) => `<s>${_.trim(a2)}</s>`)
			.replace(preRegExp, function (a1, a2) {
				const exec = /`{3}(\S+)/.exec(a1)
				if (exec) {
					const codeLang = exec[1]
					const others = a2.replace(new RegExp(`^${codeLang}`), '')
					return `<pre><code class="language-${codeLang}">${_.trim(others)}</code></pre>`
				} else {
					return `<pre>${_.trim(a2)}</pre>`
				}
			})
			.replace(codeRegExp, (a1, a2) => `<code>${_.trim(a2)}</code>`)
			.replace(aRegExp, (a1, a2, a3) => `<a href="${_.trim(a3)}">${_.trim(a2)}</a>`)
			.replace(/\\/g, '').split('\n').join('<br/>')
	}

	get markdown() {
		if (!this.text.length) {
			return ''
		}
		let result = '\\' + this.text.split('').join('\\')
		useful.forEach(char =>
			result = result.replace(new RegExp(`(?<!\\\\)\\\\\\${char}`, 'g'), `${char}`))
		return result
			.replace(/\\\\\\/g, '\\')
			.replace(iuRegExp, (a1, a2) => `___${a2}_\r__`)
	}

	get hasError() {
		const markdown = this.markdown
		const clean = useful
			.reduce((text, char) => text.replace(new RegExp(`\\${char}`, 'g'), ''), markdown)
		return markdown && (useful.some((char) =>
				!!(((markdown.match(new RegExp(`\\${char}`, 'g')) || []).length -
					(markdown.match(new RegExp(`\\\\\\${char}`, 'g')) || []).length) % 2)) || !clean.length)
	}

	constructor() {
		// this.text = 'simple text. \n'
		// 	+ '*bold \\*text*\n'
		// 	+ '_italic \\*text_\n'
		// 	+ '__underline__\n'
		// 	+ '~strikethrough~\n'
		// 	+ '___underline italic___\n'
		// 	+ '*bold _italic bold ~italic bold strikethrough~ __underline italic bold___ bold*\n'
		// 	+ '[inline URL](http://www.example.com/)\n'
		// 	+ '[inline mention of a user](tg://user?id=214697709)\n'
		// 	+ '`inline fixed-width code`\n'
		// 	+ '```\n'
		// 	+ 'pre-formatted fixed-width code block\n'
		// 	+ '```\n'
		// 	+ '```python\n'
		// 	+ 'pre-formatted fixed-width code block written in the Python programming language\n'
		// 	+ '```'
		this.text = '`code``'
		console.log(this.markdown)
	}
}
