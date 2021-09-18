import { useState, useEffect } from 'react'
import { throttle } from 'lodash'
import IcicleGraph, { nodeLabel } from './IcicleGraph'
import { ProfileSource } from './ProfileSource'
import { Spinner } from 'react-bootstrap'
import { CalcWidth } from '@parca/dynamicsize'
import { Flamegraph, FlamegraphNode, FlamegraphRootNode } from '@parca/client'

interface ProfileIcicleGraphProps {
  graph: Flamegraph.AsObject | undefined
}

function arrayEquals (a, b): boolean {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  )
}

function formatBytes(bytes: number): string {
    const decimals = 2;
    if (bytes === 0) return '0 Bytes';

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;

    // https://physics.nist.gov/cuu/Units/binary.html

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];

    const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatDefault(value: number): string {
    return value.toString()
}

export default function ProfileIcicleGraph ({
  graph,
}: ProfileIcicleGraphProps) {
  const [hoveringNode, setHoveringNode] = useState<FlamegraphNode.AsObject | undefined | null>(null)
  const [curPath, setCurPath] = useState<string[]>([])

  useEffect(()=>{
      setHoveringNode(null);
  },[graph])

  if (graph === undefined) return <div>no data...</div>
  const total = graph.total
  if (total == 0) return <>Profile has no samples</>

  const knownValueFormatter = {
    'bytes': formatBytes,
  }[graph.unit]

  const valueFormatter = knownValueFormatter !== undefined ? knownValueFormatter : formatDefault

  function nodeNumbers(name: string, d: number | undefined, cumulative: number): string {
      const diff = d === undefined ? 0 : d
      const prevValue = cumulative - diff
      const diffRatio = Math.abs(diff) > 0 ? (diff / prevValue) : 0
      const diffRatioText = prevValue > 0 ? ` (${diff > 0 ? '+' : ''}${(diffRatio*100).toFixed(2)}%)` : ''

      const diffText = (d !== undefined && diff != 0) ? ` Diff: ${diff > 0 ? '+' : ''}${valueFormatter(diff)}${diffRatioText}` : ''

      return `${name} (${((cumulative * 100) / total).toFixed(2)}%) ${valueFormatter(cumulative)}${diffText}`
  }

  function nodeAsText (node: FlamegraphNode.AsObject | FlamegraphRootNode.AsObject | undefined): string {
    if (node === undefined) return ''

    if ((node as FlamegraphNode.AsObject).meta !== undefined) {
      const n = (node as FlamegraphNode.AsObject)
      return nodeNumbers(nodeLabel(n), n.diff, n.cumulative)
    }

    return nodeNumbers('root', node.diff, node.cumulative)
  }

  const hoveringNodeText = (hoveringNode == null || hoveringNode === undefined) ? nodeAsText(graph.root) : nodeAsText(hoveringNode)

  const setNewCurPath = (path: string[]) => {
    if (!arrayEquals(curPath, path)) {
      setCurPath(path)
    }
  }

  return (
    <div className='container-fluid' style={{ padding: 0 }}>
      <p>Node: {hoveringNodeText}</p>
      <CalcWidth throttle={300} delay={2000}>
        <IcicleGraph
          graph={graph}
          setHoveringNode={throttle(setHoveringNode, 100)}
          curPath={curPath}
          setCurPath={throttle(setNewCurPath, 100)}
        />
      </CalcWidth>
    </div>
  )
}