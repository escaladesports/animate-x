import clone from 'clone'
import rafLoop from 'raf-loop'

class Animate{
	constructor(options){
		options = {
			...defaultOptions,
			...options,
		}
		for(let i in options){
			this[i] = options[i]
		}
		this.engine = rafLoop(this.step.bind(this))
	}
	start(){
		this.type = typeof this.from
		if(this.type === 'number'){
			this.state = this.from
		}
		else{
			this.state = clone(this.from)
		}
		this.engine.start()
	}
	stop(){
		this.engine.stop()
	}
	step(delta){
		this.time += delta
		if(this.time >= this.duration){
			this.end()
			return
		}
		if(this.type === 'number'){
			this.state = this.tweenNumber(this.from, this.to)
		}
		else {
			this.deepTween(this.state, this.from, this.to)
		}
		this.onStep(this.state)
	}
	end() {
		this.state = clone(this.to)
		this.stop()
		this.onEnd()
	}
	reset(){
		this.stop()
		this.time = 0
		this.state = clone(this.from)
	}
	tweenNumber(from, to){
		return from + this.easing(this.time / this.duration) * to - from
	}
	deepTween(state, from, to){
		for(let i in from){
			if (typeof from[i] === 'number'){
				state[i] = this.tweenNumber(from[i], to[i])
			}
			else{
				this.deepTween(state[i], from[i], to[i])
			}
		}
	}
}

const defaultOptions = {
	from: 0,
	to: 100,
	duration: 1000,
	time: 0,
	easing: t => t,
	onStart: noop,
	onStep: noop,
	onEnd: noop,
}

function noop(){}

export default Animate