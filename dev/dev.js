import Animation from '../src'
import { bounceOut as easing } from 'eases'

const el = document.createElement('div')
el.textContent = 'test'
document.body.appendChild(el)

let animation = new Animation({
	from: {
		left: 0,
		top: 0,
	},
	to: {
		left: 50,
		top: 100,
	},
	easing,
	onStep: ({left, top}) => {
		el.style.transform = `translate(${left}px, ${top}px)`
	}
})
animation.start()

document.addEventListener('click', () => {
	animation.toggle()
})