import { useState } from 'react'
import { formatMm } from 'shared/utils.js'
import ClearIcon from 'shared/components/icons/clear.js'
import EditIcon from 'shared/components/icons/edit.js'

const CoreSettingMm = props => {
  const { dflt, min, max } = props
  const val = props.gist?.[props.setting]

  const [value, setValue] = useState(val)

  const handleChange = evt => {
    const newVal = parseFloat(evt.target.value)

    setValue(newVal)
    if (props.gist.sa) props.setGist({
      ...props.gist,
      saMm: newVal,
      sa: newVal,
    })
    else props.updateGist(['saMm'], newVal)
  }
  const reset = () => {
    setValue(dflt)
    props.updateGist(['saMm'], dflt)
  }


  return (
    <div className="py-4 mx-6 border-l-2 pl-2">
      <p className="m-0 p-0 px-2 mb-2 text-neutral-content opacity-60 italic">
        {props.app.t(`settings.sa.description`)}
      </p>
      <div className="flex flex-row justify-between">
        <span
          className="opacity-50"
          dangerouslySetInnerHTML={{__html: formatMm(min, props.gist.units)}}
        />
        <span
          className={`font-bold ${val===dflt ? 'text-secondary' : 'text-accent'}`}
          dangerouslySetInnerHTML={{__html: formatMm(val, props.gist.units)}}
        />
        <span
          className="opacity-50"
          dangerouslySetInnerHTML={{__html: formatMm(max, props.gist.units)}}
        />
      </div>
      <input
        type="range"
        max={max}
        min={min}
        step={0.1}
        value={value}
        onChange={handleChange}
        className={`
          range range-sm mt-1
          ${val === dflt ? 'range-secondary' : 'range-accent'}
        `}
      />
      <div className="flex flex-row justify-between">
        <span />
        <button
          title={props.app.t('app.reset')}
          className="btn btn-ghost btn-xs text-accent"
          disabled={val === dflt}
          onClick={reset}
        >
          <ClearIcon />
        </button>
      </div>
    </div>
  )
}

export default CoreSettingMm
