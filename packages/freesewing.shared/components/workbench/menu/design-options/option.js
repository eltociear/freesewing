import { Chevron } from 'shared/components/navigation/primary.js'
import PctDegOption from 'shared/components/workbench/inputs/design-option-pct-deg'
import CountOption from 'shared/components/workbench/inputs/design-option-count'
import ListOption from 'shared/components/workbench/inputs/design-option-list'
import { formatMm, formatPercentage, optionType } from 'shared/utils.js'
import { Li, Ul, Details, Summary, SumButton, SumDiv, Deg } from 'shared/components/workbench/menu'

const values = {
  pct: props => {
    const val = (typeof props.gist?.options?.[props.option] === 'undefined')
      ? props.pattern.config.options[props.option].pct/100
      : props.gist.options[props.option]
    return (
      <span className={
        val=== props.pattern.config.options[props.option].pct/100
          ? 'text-secondary'
          : 'text-accent'
      }>
        {formatPercentage(val)}
        {props.pattern.config.options[props.option]?.toAbs
          ? ' | ' +formatMm(props.pattern.config.options[props.option]?.toAbs(val, props.gist))
          : null
        }
      </span>
    )
  },
  bool: props => {
    const dflt = props.pattern.config.options[props.option].bool
    const current = props.gist?.options?.[props.option]
    return (
      <span className={
        (dflt==current || typeof current === 'undefined')
          ? 'text-secondary'
          : 'text-accent'
      }>
        {props.gist?.options?.[props.option]
          ? props.app.t('app.yes')
          : props.app.t('app.no')
        }
      </span>
    )
  },
  count: props => {
    const dflt = props.pattern.config.options[props.option].count
    const current = props.gist?.options?.[props.option]
    return (dflt==current || typeof current === 'undefined')
      ? <span className="text-secondary">{dflt}</span>
      : <span className="text-accent">{current}</span>
  },
  list: props => {
    const dflt = props.pattern.config.options[props.option].dflt
    const current = props.gist?.options?.[props.option]
    const prefix = `options.${props.pattern.config.name}.${props.option}.options.`
    return (dflt==current || typeof current === 'undefined')
      ? <span className="text-secondary">{props.app.t(prefix+dflt)}</span>
      : <span className="text-accent">{props.app.t(prefix+current)}</span>
  },
  deg: props => {
    const dflt = props.pattern.config.options[props.option].deg
    const current = props.gist?.options?.[props.option]
    return (dflt==current || typeof current === 'undefined')
      ? <span className="text-secondary">{dflt}&deg;</span>
      : <span className="text-accent">{current}&deg;</span>
  },
  mm: props => {
    return <p>No mm val yet</p>
  },
  constant: props => {
    return <p>No constant val yet</p>
  },
}

const Tmp = props => <p>not yet</p>

const inputs = {
  pct: PctDegOption,
  count: CountOption,
  deg: props => <PctDegOption {...props} type='deg' />,
  list: ListOption,
  mm: <p>Mm options are not supported. Please report this.</p>,
  constant: Tmp,
}


const Option = props => {
  const type = optionType(props.pattern.config.options[props.option])
  const Input = inputs[type]
  const Value = values[type]

  const toggleBoolean = () => {
    const dflt = props.pattern.config.options[props.option].bool
    const current = props.gist?.options?.[props.option]
    if (typeof current === 'undefined')
      props.updateGist(['options', props.option], !dflt)
    else props.unsetGist(['options', props.option])
  }

  return (type === 'bool')
    ? (
      <Li>
        <SumButton onClick={toggleBoolean}>
          <SumDiv>
            <Deg />
            <span>
              { props.app.t(`options.${props.pattern.config.name}.${props.option}.title`) }
            </span>
          </SumDiv>
          <Value type={type} {...props} />
        </SumButton>
      </Li>
    ) : (
      <Li>
        <Details>
          <Summary>
            <SumDiv>
              <Deg />
              <span>
                { props.app.t(`options.${props.pattern.config.name}.${props.option}.title`) }
              </span>
            </SumDiv>
            <Value type={type} {...props} />
            <Chevron w={6} m={3}/>
          </Summary>
          <Input {...props} />
        </Details>
      </Li>
    )
}

export default Option
