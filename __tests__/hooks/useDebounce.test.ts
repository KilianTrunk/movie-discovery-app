import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@/hooks/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should return a debounced function', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDebounce(callback, 500))

    expect(typeof result.current).toBe('function')
  })

  it('should debounce function calls', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDebounce(callback, 500))

    // Call the debounced function multiple times quickly
    result.current('arg1')
    result.current('arg2')
    result.current('arg3')

    // Callback should not have been called yet
    expect(callback).not.toHaveBeenCalled()

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Now callback should have been called once with the last arguments
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('arg3')
  })

  it('should reset timer on rapid calls', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDebounce(callback, 500))

    // First call
    result.current('first')
    expect(callback).not.toHaveBeenCalled()

    // Advance time partially
    act(() => {
      jest.advanceTimersByTime(300)
    })
    expect(callback).not.toHaveBeenCalled()

    // Second call before first completes - should reset timer
    result.current('second')
    expect(callback).not.toHaveBeenCalled()

    // Advance time past original delay
    act(() => {
      jest.advanceTimersByTime(300)
    })
    expect(callback).not.toHaveBeenCalled()

    // Advance remaining time for second call
    act(() => {
      jest.advanceTimersByTime(200)
    })

    // Now callback should have been called with second argument
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('second')
  })

  it('should handle different delay values', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDebounce(callback, 1000))

    result.current('test')

    // Advance by 500ms - should not call yet
    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(callback).not.toHaveBeenCalled()

    // Advance another 500ms - should call now
    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('test')
  })

  it('should clear previous timeout when called again', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDebounce(callback, 500))

    result.current('first')

    // Advance partial time
    act(() => {
      jest.advanceTimersByTime(300)
    })

    // Call again - should clear first timeout
    result.current('second')

    // Advance remaining time
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Should only call with second argument
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('second')
  })
})
