# React PPM Component

`react-ppm` is a performant React Component that renders an animated Peak Programme Meter (PPM) for a connected Web Audio API webaudioNode.

[<img width="400" alt="react-awesome-button demo" src="https://github.com/rcaferati/react-awesome-button/blob/master/demo/public/images/theme-set.gif?raw=true">](https://caferati.me/demo/react-awesome-button)

## Key Features

- 60fps PPM
- Integration time of <5 ms
- Return time of 20 dB in 1.7 s
- Follows standard IEC 60268-18 and EBU R.68
- Look and feel customisable and extendable via **CSS custom properties** 

## Live demo

Checkout the live demo with the `CSS customizer` at my <a title="React Awesome Button - CSS Customizer" href="https://caferati.me/demo/react-awesome-button" target="_blank">web portfolio</a> page.

[<img src="https://github.com/rcaferati/react-awesome-button/blob/master/demo/public/images/react-awesome-button-customizer.png?raw=true" width="800" />](https://caferati.me/demo/react-awesome-button)

You can run this demo locally on `8080` by cloning this repository and running `npm start`

## Storybook

Checkout the `Storybook` at my <a title="React Awesome Button - CSS Customizer" href="https://caferati.me/demo/react-awesome-button/storybook" target="_blank">web portfolio</a> page.

[<img src="https://github.com/rcaferati/react-awesome-button/blob/master/demo/public/images/react-awesome-button-storybook.png?raw=true" width="800" />](https://caferati.me/demo/react-awesome-button/storybook)

## Figma File

Import it directly into your [Figma](https://www.figma.com/file/Ug8sNPzmevU3ZQus9Klu5aHq/react-awesome-button-theme-blue) project.

[<img src="https://github.com/rcaferati/react-awesome-button/blob/master/demo/public/images/figma.png?raw=true" width="800" />](https://www.figma.com/file/Ug8sNPzmevU3ZQus9Klu5aHq/react-awesome-button-theme-blue)

You can run the storybook locally on `6006` by cloning this repository and running `npm run storybook`

## Installation

```
yarn add react-ppm
```


### `AwesomeButton` rendered with a button tag

Renders the component with a `Button` tag and an onPress prop called on animation release.
Checkout this example live on the [storyboard](https://caferati.me/demo/react-awesome-button/storybook/?selectedKind=AwesomeButton&selectedStory=Primary).
```jsx
import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";

function Button() {
  return (
    <AwesomeButton
      cssModule={AwesomeButtonStyles}
      type="primary"
      ripple
      onPress={() => {
        // do something
      }}
    >
      Button
    </AwesomeButton>
  );
}
```


### `AwesomeButton` props

| Attribute |    Type    |  Default  | Description                                                                                              |
| :-------- | :--------: | :-------: | :------------------------------------------------------------------------------------------------------- |
| type      |  `string`  | `primary` | Render a specific button type, styled by the .scss type list                                             |
| size      |  `string`  |  `auto`   | Render a specific button size, styled by the .scss size list                                             |
| element   |   `node`   |  `null`   | Overwrites the default container element renderer, useful for using it with react-router Link component. |
| disabled  |   `bool`   |  `false`  | Should render a disabled button                                                                          |
| visible   |   `bool`   |  `true`   | Should the button be visible                                                                             |
| ripple    |   `bool`   |  `false`  | Should render the animated ripple effect                                                                 |
| onPress   | `function` |  `null`   | Default click/press function                                                                             |
| href      |  `string`  |  `null`   | Forces the button to be rendered on an `anchor` container and sets the href to the specified value       |
| target    |  `string`  |  `null`   | When used together with `href` renders an anchor with a specific target attribute                        |


## License

MIT. Copyright (c) 2020 Lars Vinter. Created with passion during the 2020 lockdown.