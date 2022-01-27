import { array } from 'prop-types';
import HeaderStyles from './styles';
import { object } from 'prop-types';

const { THeadCell } = HeaderStyles;

// Render the headers fetched from API
const Headers = ({ config, headers }) => (
  <thead>
    <tr>
      {headers.map(({ key, title }, i) => {
        if (!(config[key] && config[key].isHidden)) {
          return (
            <THeadCell key={`header-${key}${i}`}>
              {title}
            </THeadCell>
          );
        }
        return null;
      })}
    </tr>
  </thead>
);

Headers.propTypes = {
  config: object,
  headers: array,
};

Headers.defaultProps = {
  config: {},
  headers: [],
};

export default Headers;
