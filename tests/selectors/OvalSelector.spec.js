import { OvalSelector as selector } from '../../src/selectors';

function createOval ({ x, y, width, height } = { x: 10, y: 10, width: 20, height: 10 }) {
  return {
    x, y, width, height
  }
}

describe('OvalSelector', () => {
  describe('TYPE', () => {
    it('should be a defined string', () => {
      expect(typeof selector.TYPE).toBe('string')
    })
  })

  describe('intersects', () => {
    it('should return true when point is inside geometry', () => {
      expect(
        selector.intersects({ x: 15, y: 15 }, createOval())
      ).toBeTruthy()

      const x = 15
      const y = 17
      expect(
        selector.intersects({ x, y }, createOval())
      ).toBeTruthy()
    })
    it('should return false when point is outside of geometry', () => {
      expect(selector.intersects({ x: 0, y: 0 }, createOval())).toBeFalsy()
      expect(selector.intersects({ x: 10, y: 0 }, createOval())).toBeFalsy()
      expect(selector.intersects({ x: 0, y: 10 }, createOval())).toBeFalsy()
      expect(selector.intersects({ x: 30, y: 30 }, createOval())).toBeFalsy()
    })
  })

  describe('area', () => {
    it('should return geometry area', () => {
      expect(selector.area(createOval())).toBe(157.07963267948966)
    })
  })

  describe('methods', () => {
    it.todo('should be defined')
  })
})
