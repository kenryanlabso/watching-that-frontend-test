// CSS styling for the widget components, elements
import styled, { css } from "styled-components";

const WidgetStyles = {
  Container: styled.div`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    margin: auto;
    margin-bottom: 80px;
    max-width: 850px;
    width: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    & > table {
      border: 1px solid #ebebeb;
      border-spacing: 0;
      padding: 32px;
      table-layout: fixed;
      width: 100%;
    }

    @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
      table, thead, tbody, th, tr {
        display: block;
      }

      thead tr {
        display: none;
      }

      tr {
        margin: 0 0 1rem 0;
      }
    }
  `,
  DataCell: styled.td`
    :not(:first-child) > div {
      text-align: right;
    }

    @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
      border: none;
      display: block;
			position: relative;
			padding-left: 50%;

      ::before {
        position: absolute;
        top: 0;
        left: 6px;
        width: 45%;
        padding-right: 10px;
        white-space: nowrap;
      }

      :not(:first-child) > div {
        text-align: left;
      }
      
      ${props => props.cellHeaders.map((title, i) => css`
        :nth-of-type(${i + 1})::before {
          content: "${title}";
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `)}
    }
  `,
  Cell: styled.div`
    display: grid;
    grid-template-columns: ${props => props.showPlot ? '4fr 8fr' : '1fr'};
  `,
  Value: styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  Progress: styled.div`
    align-items: center;
    background-color: #f2f2f3;
    display: flex;
    height: 20px;
    margin-left: 10px;
    position: relative;
    width: 100%;

    ::before {
      background-color: #f2f2f3;
      content: '';
      width: 5px;
      height: inherit;
      position: absolute;
      left: -5px;
    }
  `,
  Dot: styled.div`
    background-color: #84a7ea;
    border-radius: 50%;
    height: 5px;
    left: calc(${props => props.percentage}% - 5px);
    position: absolute;
    width: 5px;
  `,
  Range: styled.div`
    align-items: center;
    color: #7c7c83;
    display: flex;
    font-size: 12px;
    font-weight: 600;
    justify-content: space-between;
    position: absolute;
    top: -15px;
    width: 100%;

    @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
      display: none;
    }
  `,
};

export default WidgetStyles;
