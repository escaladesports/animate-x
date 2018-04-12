import { expect } from 'chai'
import Animate from '../dist'

describe('Animate class', () => {
	it('Should have state', () => {
		let anim = new Animate({
			from: 100,
			to: 200,
		})
		expect(anim.state).to.equal(100)
	})
	it('Should increment values', done => {
		let anim = new Animate({
				from: 1,
				to: 100,
				duration: 1000,
			})
			.start()
		setTimeout(() => {
			anim.stop()
			expect(anim.state).to.be.above(1)
			expect(anim.state).to.be.below(100)
			done()
		}, 200)
	})
	it('Should reduce values', done => {
		let anim = new Animate({
				from: 100,
				to: 0,
				duration: 1000,
			})
			.start()
		setTimeout(() => {
			anim.stop()
			expect(anim.state).to.be.above(0)
			expect(anim.state).to.be.below(100)
			done()
		}, 200)
	})
	it('Should not go above end value', done => {
		let anim = new Animate({
				from: -50,
				to: 50,
				duration: 100,
			})
			.start()
		setTimeout(() => {
			anim.stop()
			expect(anim.state).to.equal(50)
			done()
		}, 200)
	})
	it('Should loop animation', done => {
		let anim = new Animate({
				from: 100,
				to: 0,
				duration: 1000,
				loop: true,
			})
			.start()
		setTimeout(() => {
			anim.stop()
			expect(anim.state).to.be.above(0)
			expect(anim.state).to.be.below(100)
			done()
		}, 1500)
	})
})