<h2 align="center">
  React Image Annotator
</h2>

<p align="center">
  A fully featured & easily customizable image annotation library built on React
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-image-annotator" alt="npm">
    <img src="https://img.shields.io/npm/v/react-image-annotator" />
  </a>
  <a href="https://github.com/rafyzg/react-image-annotator/blob/main/LICENSE.md" alt="license">
    <img src="https://img.shields.io/github/license/rafyzg/react-image-annotator" />
  </a>
</p>

<p align="center" >
  <a href="https://rafyzg.github.io/react-image-annotator">
    <img src="https://raw.githubusercontent.com/rafyzg/react-image-annotator/main/demo.gif" alt="react-image-annotator example" width="600" height="515" />
  </a>
</p>

[Docs and Demo](https://rafyzg.github.io/react-image-annotator/).

Inspired by [react-image-annotation](https://github.com/Secretmapper/react-image-annotation).

## Installation

```
npm install --save react-image-annotator
# or
yarn add react-image-annotator
```

## Usage

```js


const Simple = () => {

  const [annotations, setAnnotations] = useState([]);
  const [annotation, setAnnotation] = useState({});

  const onChange = (newAnnotation) => {
    setAnnotation(newAnnotation);
  }

  const onSubmit = (newAnnotation) => {
    const { geometry, data } = newAnnotation;

    const newAnnotations = annotations.concat({
      geometry,
      data: {
        ...data,
        id: Math.random()
      }
    });

    setAnnotation({});
    setAnnotations(newAnnotations);
  }

  return (
    <Annotation
      src={img}
      alt='Two persons with umbrella'
      annotations={annotations}
      type={'RECTANGLE'}
      value={annotation}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
}

export default Simple;
```


### Props

Prop | Description | Default
---- | ----------- | -------
`src` | Image src attribute |
`alt` | Image alt attribute |
`annotations` | Array of annotations |
`value` | Annotation object currently being created. See [annotation object](#annotation-object)  |
`onChange` | `onChange` handler for annotation object |
`onSubmit` | `onSubmit` handler for annotation object |
`type` | Selector type. See [custom shapes](#using-custom-shapes) | `RECTANGLE`
`allowTouch` | Set to `true` to allow the target to handle touch events. This disables one-finger scrolling | `false`
`selectors` | An array of selectors. See [adding custom selector logic](#adding-custom-selector-logic) | `[RectangleSelector, PointSelector, OvalSelector]`
`activeAnnotations` | Array of annotations that will be passed as 'active' (active highlight and shows content) |
`activeAnnotationComparator` | Method to compare annotation and `activeAnnotation` item (from `props.activeAnnotations`). Return `true` if it's the annotations are equal | `(a, b) => a === b`
`disableAnnotation` | Set to `true` to disable creating of annotations (note that no callback methods will be called if this is `true`) | `false`
`disableSelector` | Set to `true` to not render `Selector` | `false`
`disableEditor` | Set to `true` to not render `Editor` | `false`
`disableOverlay` | Set to `true` to not render `Overlay` | `false`
`renderSelector` | Function that renders `Selector` Component | See [custom components](#using-custom-components)
`renderEditor` | Function that renders `Editor` Component | See [custom components](#using-custom-components)
`renderHighlight` | Function that renders `Highlight` Component | See [custom components](#using-custom-components)
`renderContent` | Function that renders `Content` | See [custom components](#using-custom-components)
`renderOverlay` | Function that renders `Overlay` | See [custom components](#using-custom-components)
`onMouseUp` | `onMouseUp` handler on annotation target |
`onMouseDown` | `onMouseDown` handler on annotation target |
`onMouseMove` | `onMouseMove` handler on annotation target |
`onClick` | `onClick` handler on annotation target |

#### Annotation object

An Annotation object is an object that conforms to the object shape

```js
({
  selection: T.object, // temporary object for selector logic
  geometry: T.shape({ // geometry data for annotation
    type: T.string.isRequired // type is used to resolve Highlighter/Selector renderer
  }),
  // auxiliary data object for application.
  // Content data can be stored here (text, image, primary key, etc.)
  data: T.object
})
```

## Using custom components

`Annotation` supports `renderProp`s for almost every internal component.

This allows you to customize everything about the the look of the annotation interface, and you can even use canvas elements for performance or more complex interaction models.

- `renderSelector` - used for selecting annotation area (during annotation creation)
- `renderEditor` - appears after annotation area has been selected (during annotation creation)
- `renderHighlight` - used to render current annotations in the annotation interface. It is passed an object that contains the property `active`, which is true if the mouse is hovering over the higlight
- `renderComponent` - auxiliary component that appears when mouse is hovering over the highlight. It is passed an object that contains the annotation being hovered over. `{ annotation }`
- `renderOverlay` - Component overlay for Annotation (i.e. 'Click and Drag to Annotate')

You can view the default renderProps [here](src/components/defaultProps.js)

**Note**: You cannot use `:hover` selectors in css for components returned by `renderSelector` and `renderHighlight`. This is due to the fact that `Annotation` places DOM layers on top of these components, preventing triggering of `:hover`

## Using custom shapes

`Annotation` supports three shapes by default, `RECTANGLE`, `POINT` and `OVAL`.

You can switch the shape selector by passing the appropriate `type` as a property. Default shape `TYPE`s are accessible on their appropriate selectors:

```js
import {
  PointSelector,
  RectangleSelector,
  OvalSelector
} from 'react-image-annotation/lib/selectors'

<Annotation
  type={PointSelector.TYPE}
/>
```

### Adding custom selector logic

#### This is an Advanced Topic

The Annotation API allows support for custom shapes that use custom logic such as polygon or freehand selection. This is done by defining your own selection logic and passing it as a selector in the `selectors` property.

Selectors are objects that must have the following properties:

- `TYPE` - string that uniquely identifies this selector (i.e. `RECTANGLE`)
- `intersects` - method that returns true if the mouse point intersects with the annotation geometry
- `area` - method that calculates and returns the area of the annotation geometry
- `methods` - object that can contain various listener handlers (`onMouseUp`, `onMouseDown`, `onMouseMove`, `onClick`). These listener handlers are called when triggered in the annotation area. These handlers must be reducer-like methods - returning a new annotation object depending on the change of the method

You can view a defined `RectangleSelector` [here](src/hocs/RectangleSelector.js)

### Connecting selector logic to Redux/MobX

First see [Selectors](#adding-custom-selector-logic)

You can use `Selector` methods to connect these method logic to your stores. This is due to the fact that selector methods function as reducers, returning new state depending on the event.

***Note that it is not necessary to connect the selector logic with redux/mobx. Connecting the annotation and annotations state is more than enough for most use cases.***

## License

MIT
