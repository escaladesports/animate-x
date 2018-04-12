import clone from 'clone'
import rafLoop from 'raf-loop'
import { tween } from 'keyframe-x'

class Animate{
	constructor(options){
		options = {
			...defaultOptions,
			...options,
		}
		for(let i in options){
			this[i] = options[i]
		}
		this.reset()
		this.engine = rafLoop(this.step.bind(this))
	}
	reset() {
		this.stop()
		this.time = 0
		this.keyframe = tween(this.from, this.to)
		this.state = this.keyframe(0)
		this.onStep(this.state)
		return this
	}
	start(){
		this.reset()
		this.animating = true
		this.engine.start()
		return this
	}
	stop(){
		this.animating = false
		if (this.engine) {
			this.engine.stop()
		}
		return this
	}
	pause(){
		this.stop()
		this.engine.stop()
		return this
	}
	unpause() {
		this.animating = true
		this.engine.start()
		return this
	}
	step(delta){
		this.time += delta
		if(this.time >= this.duration){
			this.end()
			return this
		}
		this.state = this.keyframe(this.easing(this.time / this.duration))
		this.onStep(this.state)
		return this
	}
	end() {
		this.stop()
		this.state = this.keyframe(1)
		this.onStep(this.state)
		this.onEnd()
		return this
	}
	toggle(){
		if(this.animating){
			this.stop()
		}
		else{
			this.start()
		}
		return this
	}
	togglePause() {
		if (this.animating) {
			this.pause()
		}
		else {
			this.unpause()
		}
		return this
	}
}

const defaultOptions = {
	from: 0,
	to: 100,
	duration: 1000,
	time: 0,
	animating: false,
	easing: t => t,
	onStart: noop,
	onStep: noop,
	onEnd: noop,
}

function noop(){}

export default Animate