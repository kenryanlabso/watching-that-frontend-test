// CSS styling for the table head component
import styled from 'styled-components';

const HeaderStyles = {
  THeadCell: styled.th`
    height: 24px;
    padding: 20px 0;
    text-align: left;
    white-space: nowrap;

    :not(:first-child) {
      text-align: right;
    }
  `,
};

export default HeaderStyles;
