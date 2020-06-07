import "@testing-library/jest-dom/extend-expect"
import { fireEvent, render } from "@testing-library/react"
import { act, renderHook } from "@testing-library/react-hooks"
import React, { useEffect, useState } from "react"
import { useMitt, MittProvider } from "../"

describe("useMitt", () => {
  test("should return an emitter", () => {
    const { result } = renderHook(() => useMitt())

    expect(result.current.emitter).toBeTruthy()
    expect(result.current.emitter).toHaveProperty("emit")
    expect(result.current.emitter).toHaveProperty("on")
    expect(result.current.emitter).toHaveProperty("off")
  })

  test("should listen for emitted event", () => {
    const { result } = renderHook(() => useMitt())

    result.current.emitter.on("foo", e => {
      expect(e.foo).toEqual("bar")
    })

    act(() => result.current.emitter.emit("foo", { foo: "bar" }))
  })
})

describe("MittProvider", () => {
  const EVENT_NAME = "clear"
  const EVENT_DATA = { data: "emitted from A" }

  function A() {
    const { emitter } = useMitt()
    const emit = () => {
      emitter.emit(EVENT_NAME, EVENT_DATA)
    }
    return (
      <button data-testid="emit-btn" onClick={emit}>
        emit
      </button>
    )
  }

  function B() {
    const [state, setState] = useState("")
    const { emitter } = useMitt()

    useEffect(() => {
      let didCancel = false

      emitter.on(EVENT_NAME, e => {
        if (!didCancel) setState(e.data)
      })

      return () => {
        didCancel = true
      }
    }, [])

    return <p data-testid="listener">{state || "waiting for event"}</p>
  }

  function App() {
    return (
      <MittProvider>
        <A />
        <B />
      </MittProvider>
    )
  }

  test("should match button text", () => {
    const { queryByTestId } = render(<App />)
    expect(queryByTestId("emit-btn").textContent).toEqual("emit")
  })

  test("should match listener text", () => {
    const { queryByTestId } = render(<App />)
    expect(queryByTestId("listener").textContent).toEqual("waiting for event")
  })

  test("should emit event on button click", () => {
    const { queryByTestId } = render(<App />)
    fireEvent.click(queryByTestId("emit-btn"))

    expect(queryByTestId("listener").textContent).not.toEqual(
      "waiting for event"
    )
    expect(queryByTestId("listener").textContent).toEqual(EVENT_DATA.data)
  })
})
