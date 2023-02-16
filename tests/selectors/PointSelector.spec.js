import { PointSelector as selector } from '../../src/selectors'

function createPoint ({ x, y } = { x: 10, y: 10 }) {
  return { x, y }
}

function createContainer({ width, height } = { width: 100, height: 100 }) {
  return { width, height }
}

describe('PoinntSelector', () => {
  describe('TYPE', () => {
    it('should be a defined string', () => {
      expect(typeof selector.TYPE).toBe('string')
    })
  })

  describe('intersects', () => {
    it('should return true when point is inside geometry', () => {
      expect(
        selector.intersects({ x: 10, y: 10 }, createPoint(), createContainer())
      ).toBeTruthy()
    })
    it('should return false when point is outside of geometry', () => {
      expect(selector.intersects({ x: 0, y: 0 }, createPoint(), createContainer())).toBeFalsy()
      expect(selector.intersects({ x: 10, y: 0 }, createPoint(), createContainer())).toBeFalsy()
      expect(selector.intersects({ x: 0, y: 10 }, createPoint(), createContainer())).toBeFalsy()
      expect(selector.intersects({ x: 30, y: 30 }, createPoint(), createContainer())).toBeFalsy()
    })
  })

  describe('area', () => {
    it('should return geometry area', () => {
      expect(
        selector.area(createPoint(), createContainer())
      ).toBe(36)
    })
    it('should return geometry area based on container', () => {
      expect(
        selector.area(createPoint(), createContainer({ width: 200, height: 200 }))
      ).toBe(9)
    })
  })

  describe('methods', () => {
    it.todo('should be defined')
  })
})
