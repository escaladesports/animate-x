import Animation from '../src'

const el = document.createElement('div')
el.textContent = 'test'
document.body.appendChild(el)

let animation = new Animation({
	from: 0,
	to: 50,
	onStep: left => {
		el.style.transform = `translateX(${left}px)`
	}
})
animation.start()