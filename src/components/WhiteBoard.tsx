import { useCallback, useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { useResizeObserver } from '@/hooks/util/useResizeObserver'
import useCustomState from '@/hooks/util/useCustomState'

type ToolType = 'select' | 'pen' | 'hand' | 'record' | 'play' | 'eraser'
const MIN_ZOOM = 0.01
const MAX_ZOOM = 20

const WhiteBoard = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvas = useRef<fabric.Canvas | null>(null)
  // const [activeTool, setActiveTool] = useState('select')
  const { observer, rect } = useResizeObserver()

  const [control] = useCustomState<{ tool: ToolType; zoom: number }>({ tool: 'select', zoom: 1 })
  const [savedData] = useCustomState<{ version: string; objects: fabric.Object[] }[]>([])

  const resizeHandler = useCallback(() => {
    if (rect) fabricCanvas.current?.setWidth(rect.width).setHeight(rect.height)
  }, [rect])

  const toolHandler = useCallback(() => {
    if (!canvasRef.current || !fabricCanvas.current) return
    switch (control.state.tool) {
      case 'select':
        fabricCanvas.current.selection = true
        fabricCanvas.current.isDrawingMode = false
        fabricCanvas.current.defaultCursor = 'default'
        break
      case 'pen':
        fabricCanvas.current.selection = false
        fabricCanvas.current.isDrawingMode = true
        fabricCanvas.current.defaultCursor = 'default'
        fabricCanvas.current.freeDrawingBrush.width = 5
        break
      case 'hand':
        console.log('hand selected')
        fabricCanvas.current.selection = false
        fabricCanvas.current.isDrawingMode = false
        fabricCanvas.current.defaultCursor = 'move'
        break
      case 'record':
        recordCanvas()
        break
      case 'play':
        // fabricCanvas.current.loadFromJSON(savedData.state, () => {})
        playCanvas()
        break
    }
  }, [control.state.tool])

  const recordCanvas = useCallback(() => {
    let frameLimit = 200

    const interval = setInterval(() => {
      savedData.setState((prev) => {
        const newFrame = fabricCanvas.current?.toJSON()
        return newFrame ? [...prev, newFrame] : prev
      })
      if (--frameLimit <= 0) clearInterval(interval)
    }, 50)
  }, [])

  const playCanvas = useCallback(() => {
    let frame = 0
    const interval = setInterval(() => {
      fabricCanvas.current?.loadFromJSON(savedData.state[frame], () => {})
      if (++frame >= savedData.state.length) clearInterval(interval)
    }, 50)
  }, [savedData.state])

  const init = useCallback(() => {
    observer(containerRef.current)
    const { offsetWidth: width = 0, offsetHeight: height = 0 } = { ...containerRef.current }
    fabricCanvas.current = new fabric.Canvas(canvasRef.current as HTMLCanvasElement, { width, height })

    fabricCanvas.current.on('mouse:wheel', (ie) => {
      if (!fabricCanvas.current) return

      const zoom = fabricCanvas.current.getZoom() * 0.999 ** ie.e.deltaY
      zoomHandler(zoom, { x: ie.e.offsetX, y: ie.e.offsetY })
      ie.e.preventDefault()
      ie.e.stopPropagation()
    })
  }, [])

  const zoomHandler = useCallback((zoom: number, point?: { x: number; y: number }) => {
    const _point = point
      ? point
      : { x: (fabricCanvas.current?.width ?? 0) / 2, y: (fabricCanvas.current?.height ?? 0) / 2 }

    if (zoom >= MAX_ZOOM) zoom = MAX_ZOOM
    else if (zoom <= MIN_ZOOM) zoom = MIN_ZOOM

    fabricCanvas.current?.zoomToPoint(_point, zoom)
    control.set.zoom(zoom)
  }, [])

  useEffect(() => {
    init()

    return () => {
      fabricCanvas.current?.dispose()
    }
  }, [])

  useEffect(() => {
    resizeHandler()
  }, [resizeHandler])

  useEffect(() => {
    toolHandler()
  }, [toolHandler])

  console.log('savedData', savedData.state)

  return (
    <div
      className='white_board_container'
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100%', border: '1px solid var(--border-color)' }}
    >
      <canvas ref={canvasRef} />
      <div
        className='white_board_tool_box'
        style={{ position: 'absolute', top: 0, left: 0, margin: '5px', padding: '5px', border: '1px solid black' }}
      >
        <button disabled={control.state.tool === 'select'} onClick={() => control.set.tool('select')}>
          선택
        </button>
        <button disabled={control.state.tool === 'hand'} onClick={() => control.set.tool('hand')}>
          이동
        </button>
        <button disabled={control.state.tool === 'pen'} onClick={() => control.set.tool('pen')}>
          펜
        </button>
        <button disabled={control.state.tool === 'eraser'} onClick={() => control.set.tool('eraser')}>
          지우개
        </button>
        <button disabled={control.state.tool === 'record'} onClick={() => control.set.tool('record')}>
          녹화
        </button>
        <button disabled={control.state.tool === 'play'} onClick={() => control.set.tool('play')}>
          불러오기
        </button>
        <button
          onClick={() => {
            zoomHandler(1)
          }}
        >
          줌 초기화
        </button>
        <input
          name='zoom'
          type='range'
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          value={control.state.zoom}
          onChange={(e) => {
            console.log('e', e)
          }}
        />
        <span>{control.state.zoom}</span>
      </div>
    </div>
  )
}

export default WhiteBoard
