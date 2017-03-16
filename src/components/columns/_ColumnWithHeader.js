// @flow

import React from 'react';
import styled from 'styled-components/native';

import Column, { getRadius, getColumnContentWidth } from './_Column';
import Icon from '../../libs/icon';
import ProgressBar from '../ProgressBar';
import StatusMessage from '../StatusMessage';
import { iconRightMargin } from '../cards/__CardComponents';
import { contentPadding } from '../../styles/variables';
import type { Subscription, ThemeObject } from '../../utils/types';

export * from './_Column';

export const HeaderButtonsContainer = styled.View`
  flex-direction: row;
  padding-right: ${iconRightMargin}px;
`;

export const TitleWrapper = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const headerFontSize = 18;
export const Title = styled.Text`
  padding: ${contentPadding}px;
  padding-top: ${contentPadding + 4}px;
  line-height: ${headerFontSize}px;
  font-size: ${headerFontSize}px;
  font-weight: 500;
  color: ${({ theme }) => theme.base04};
  background-color: transparent;
`;

export const TitleIcon = styled(Icon)`
  font-size: ${headerFontSize}px;
`;

export const HeaderButton = styled.TouchableOpacity`
  padding-vertical: ${contentPadding}px;
  padding-horizontal: ${contentPadding}px;
`;

export const HeaderButtonIcon = styled(Icon)`
  font-size: ${headerFontSize}px;
  color: ${({ active, muted, theme }) => (
    muted ? theme.base05 : (active ? theme.brand : theme.base04)
  )};
`;

export const FixedHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: ${20 + (2 * contentPadding)}px;
`;

export const ProgressBarContainer = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.base01};
`;

export default class extends React.PureComponent {
  props: {
    errors?: ?Array<string>,
    rightHeader?: React.Element,
    icon: string,
    items: Array<Object>,
    loading?: boolean,
    radius?: number,
    onRefresh?: Function,
    refreshText?: string,
    renderItem: Function,
    style?: ?Object,
    readIds: Array<string>,
    subscriptions: Array<Subscription>,
    theme: ThemeObject,
    title: string,
    width?: number,
  };

  render() {
    const {
      children,
      errors,
      rightHeader,
      icon,
      items,
      loading,
      renderItem,
      onRefresh,
      refreshText,
      theme,
      title,
      width,
      ...props
    } = this.props;

    const _radius = getRadius(props);

    return (
      <Column {...this.props}>
        <FixedHeader>
          <TitleWrapper>
            <Title numberOfLines={1} style={{ maxWidth: 280 }}>
              <TitleIcon name={icon} />&nbsp;{title}
            </Title>
          </TitleWrapper>

          {rightHeader}
        </FixedHeader>

        <ProgressBarContainer>
          {
            loading &&
            <ProgressBar
              width={width || getColumnContentWidth()}
              height={1}
              indeterminate
            />
          }
        </ProgressBarContainer>

        {
          errors && errors.filter(Boolean).map(error => (
            <StatusMessage key={`error-${error}`} message={error} error />
          ))
        }

        {children}
      </Column>
    );
  }
}