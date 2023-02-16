import { RectangleSelector as selector } from '../../src/selectors';

function createRect ({ x, y, width, height } = { x: 10, y: 10, width: 10, height: 10 }) {
  return {
    x, y, width, height
  }
}

describe('RectangleSelector', () => {
  describe('TYPE', () => {
    it('should be a defined string', () => {
      expect(typeof selector.TYPE).toBe('string')
    })
  })

  describe('intersects', () => {
    it('should return true when point is on top left of geometry', () => {
      expect(
        selector.intersects({ x: 10, y: 10 }, createRect())
      ).toBeTruthy()
    })
    it('should return true when point is on top right of geometry', () => {
      expect(
        selector.intersects({ x: 20, y: 10 }, createRect())
      ).toBeTruthy()
    })
    it('should return true when point is on bottom left of geometry', () => {
      expect(
        selector.intersects({ x: 10, y: 20 }, createRect())
      ).toBeTruthy()
    })
    it('should return true when point is on bottom right of geometry', () => {
      expect(
        selector.intersects({ x: 20, y: 20 }, createRect())
      ).toBeTruthy()
    })
    it('should return true when point is inside geometry', () => {
      expect(
        selector.intersects({ x: 15, y: 15 }, createRect())
      ).toBeTruthy()
    })
    it('should return false when point is outside of geometry', () => {
      expect(selector.intersects({ x: 0, y: 0 }, createRect())).toBeFalsy()
      expect(selector.intersects({ x: 10, y: 0 }, createRect())).toBeFalsy()
      expect(selector.intersects({ x: 0, y: 10 }, createRect())).toBeFalsy()
      expect(selector.intersects({ x: 30, y: 30 }, createRect())).toBeFalsy()
    })
  })

  describe('area', () => {
    it('should return geometry area', () => {
      expect(selector.area(createRect({ x: 10, y: 10, width: 10, height: 10 }))).toBe(100)
    })
  })

  describe('methods', () => {
    it.todo('should be defined');
  })
});
