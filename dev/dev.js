import Animation from '../src'

const el = document.createElement('div')
el.textContent = 'test'
document.body.appendChild(el)

let animation = new Animation({
	from: {
		left: 0
	},
	to: {
		left: 50
	},
	onStep: ({ left }) => {
		el.style.transform = `translateX(${left}px)`
	}
})
animation.start()