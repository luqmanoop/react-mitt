# react-mitt

> React event emitter / pubsub

A react port of the awesome [mitt](https://github.com/developit/mitt) library

## Install

```
$ npm install react-mitt
```

## Usage

Wrap your app in the `MittProvider` component, providing descendants access to the `useMitt` hook for event pubsub

```jsx
import { MittProvider } from "react-mitt"

function App() {
  return (
    <MittProvider>
      <ComponentA />
      <ComponentB />
    </MittProvider>
  )
}
```

## Example

Once you wrap your app with the `MittProvider` as demonstrated [above](https://github.com/codeshifu/react-mitt#usage), event pubsub becomes a breeze with the `useMitt` hook

```jsx
import { useMitt } from 'react-mitt'

function ComponentA() {
  const { emitter } = useMitt()

  const handleClick = () => {
    emitter.emit('foo', { data: 'ComponentA says foo!'})
  }

  return <button onClick={handleClick}>emit!</button>
}

function ComponentB() {
  const { emitter } = useMitt()

  useEffect(() => {
    // listen and respond to 'foo' events
    emitter.on('foo', event => alert(event.data))
  }, [])

  return ...
}

```

## Hook

The `useMitt` hook has the following signature

```
const { emitter } = useMitt()
```

For usage of the `emitter` object, see **mitt** API [docs](https://github.com/developit/mitt#api)
