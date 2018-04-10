import { expect } from 'chai'
import Animate from '../src'

describe('Animate class', () => {
	it('Should have state', () => {
		const anim = new Animate({
			from: 100,
			to: 200
		})
		expect(anim.state).to.equal(100)
	})
})