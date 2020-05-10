import * as React from 'react';
import styled from 'styled-components/native';

interface SectionProps {
  offsetTop?: number;
  offsetBottom?: number;
  offsetLeft?: number;
  offsetRight?: number;
  clientLeft?: number;
  clientRight?: number;
  clientTop?: number;
  clientBottom?: number;
  fluid?: boolean;
  stretchContent?: boolean;
  children?: React.ReactNode;
  centerContentHorizontally?: boolean;
  centerContentVertically?: boolean;
  flexEndContentVertically?: boolean;
  flexStartContentHorizontally?: boolean;
  bgColor: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  borderColor?: string | null;
  borderTopWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
  borderBottomWidth?: number;
  customStyle?: any;
  directionRow?: boolean;
}

const Section = ({
  offsetTop,
  offsetBottom,
  offsetLeft,
  offsetRight,
  clientLeft,
  clientRight,
  clientTop,
  clientBottom,
  children,
  fluid,
  stretchContent,
  centerContentHorizontally,
  centerContentVertically,
  flexEndContentVertically,
  flexStartContentHorizontally,
  bgColor,
  width,
  height,
  borderRadius,
  borderColor,
  borderTopWidth,
  borderLeftWidth,
  borderRightWidth,
  borderBottomWidth,
  customStyle,
  directionRow,
}: SectionProps) => (
  <Container
    directionRow={directionRow}
    bgColor={bgColor}
    offsetTop={offsetTop}
    offsetBottom={offsetBottom}
    offsetLeft={offsetLeft}
    offsetRight={offsetRight}
    clientLeft={clientLeft}
    clientRight={clientRight}
    clientTop={clientTop}
    clientBottom={clientBottom}
    fluid={fluid}
    stretchContent={stretchContent}
    centerContentHorizontally={centerContentHorizontally}
    centerContentVertically={centerContentVertically}
    flexEndContentVertically={flexEndContentVertically}
    flexStartContentHorizontally={flexStartContentHorizontally}
    width={width}
    height={height}
    borderRadius={borderRadius}
    borderColor={borderColor}
    borderTopWidth={borderTopWidth}
    borderLeftWidth={borderLeftWidth}
    borderRightWidth={borderRightWidth}
    borderBottomWidth={borderBottomWidth}
    style={customStyle}
  >
    {children}
  </Container>
);

Section.defaultProps = {
  offsetTop: 0,
  offsetBottom: 0,
  offsetLeft: 0,
  offsetRight: 0,
  clientLeft: 0,
  clientRight: 0,
  clientTop: 0,
  clientBottom: 0,
  fluid: false,
  stretchContent: false,
  centerContentHorizontally: false,
  centerContentVertically: false,
  flexStartContentHorizontally: false,
  bgColor: 'transparent',
  borderRadius: 0,
  borderColor: null,
  customStyle: {},
};

const Container = styled.View<SectionProps>`
  flex-direction: ${(props) => (props.directionRow ? 'row' : 'column')};
  margin-top: ${(props) => props.offsetTop};
  margin-bottom: ${(props) => props.offsetBottom};
  margin-left: ${(props) => props.offsetLeft};
  margin-right: ${(props) => props.offsetRight};
  padding-left: ${(props) => props.clientLeft};
  padding-right: ${(props) => props.clientRight};
  padding-top: ${(props) => props.clientTop};
  padding-bottom: ${(props) => props.clientBottom};
  ${(props) => props.fluid && 'flex: 1'};
  ${(props) => props.stretchContent && 'justify-content: space-between;'};
  ${(props) => props.centerContentHorizontally && 'align-items: center;'};
  ${(props) => props.centerContentVertically && 'justify-content: center;'};
  ${(props) => props.flexEndContentVertically && 'justify-content: flex-end;'};
  ${(props) => props.width && `width: ${props.width}`};
  ${(props) => props.height && `height: ${props.height}`};
  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius}`};
  ${(props) => props.borderColor && `border-color: ${props.borderColor}`};
  ${(props) => props.borderColor && `border-width: 1`};
  ${(props) =>
    props.borderTopWidth && `border-top-width: ${props.borderTopWidth}`};
  ${(props) =>
    props.borderLeftWidth && `border-left-width: ${props.borderLeftWidth}`};
  ${(props) =>
    props.borderRightWidth && `border-right-width: ${props.borderRightWidth}`};
  ${(props) =>
    props.borderBottomWidth &&
    `border-bottom-width: ${props.borderBottomWidth}`};
  background-color: ${(props) => props.bgColor};
  ${(props) =>
    props.flexStartContentHorizontally &&
    props.directionRow &&
    `justify-content: flex-start`};
  ${(props) =>
    props.flexStartContentHorizontally &&
    !props.directionRow &&
    `align-items: flex-start`};
`;

export default Section;
