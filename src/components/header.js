import { ipcRenderer } from 'electron'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCog from '@fortawesome/fontawesome-free-solid/faCog'
import faAngleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faPowerOff from '@fortawesome/fontawesome-free-solid/faPowerOff'
import Button, { ButtonIcon } from './button'
import IconLink from './icon-link'
import IconWrap from './icon-wrap'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  onQuitApp () {
    ipcRenderer.send('quit')
  }

  render() {
    let rightAligned = !this.props.withCreateTaskButton && !this.props.withBackButton

    return (
      <Fragment>
        <HeaderStyled rightAligned={rightAligned}>

          {this.props.withCreateTaskButton && (
            <Link to="/create-task">
              <Button default withIcon>
                <ButtonIcon icon={faPlus} />
                New task
              </Button>
            </Link>
          )}

          {this.props.withBackButton && (
            <IconLink large to="/dashboard">
              <FontAwesomeIcon icon={faAngleLeft} />
            </IconLink>
          )}

          <Title>{this.props.titleText}</Title>


          <IconWrap>
            {this.props.withQuitButton && (
              <IconLink to="/dashboard" onClick={this.onQuitApp}>
                <FontAwesomeIcon icon={faPowerOff} />
              </IconLink>
            )}

            {this.props.withSettingsButton && (
              <IconLink to={this.props.settingsLink}>
                <FontAwesomeIcon icon={faCog} />
              </IconLink>
            )}
          </IconWrap>

        </HeaderStyled>
      </Fragment>
    )
  }
}

Header.propTypes = {
  titleText: PropTypes.string.isRequired
}

const HeaderStyled = styled.div`
  background: ${props => props.theme.darkMode ? props.theme.darkBackground : '#FFF' };
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid #D7D7D7;
  border-radius: 6px 6px 0 0;

  ${props => (props.rightAligned) && css`
    flex-direction: row-reverse;
  `}
`

const Title = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 0;
  font-weight: 500;
  color: ${props => props.theme.darkMode ? props.theme.darkColor : '#000' };
`

export default Header
