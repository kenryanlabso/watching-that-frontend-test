import Headers from "../headers";
import WidgetStyles from "./styles";
import { getPercentageOfValueFromRange, kFormatter } from "../../utils/helpers";

const {
  Container,
  Cell,
  DataCell,
  Dot,
  Progress,
  Range,
  Value,
} = WidgetStyles;

const Widget = ({ config, data, headers }) => {

  // Get the minimum and maximum value of data base on key
  const getRange = key => {
    let values = [];
    data.forEach(item => {
      if (item.find(({ k }) => k === key)) {
        values.push(item.find(({ k }) => k === key).v);
      }
    });
    return {
      min: Math.min(...Object.values(values)),
      max: Math.max(...Object.values(values))
    };
  };

  // Get the percentage representation of the value
  const getPercentage = (key, value) => {
    const { min, max } = getRange(key);
    return getPercentageOfValueFromRange(value, min, max);
  };

  // Get the formatting details for value such as suffix, decimals, etc.
  const getFormatDetails = key => headers.find(header => header.key === key);

  // Format number value into shorter K format string
  const getFormattedValue = (key, value) => {
    if (typeof value === 'number') {
      const formatDetails = getFormatDetails(key);
      return `${kFormatter(value, formatDetails.decimals)}${formatDetails.suffix || ''}`;
    }
    return value;
  };

  // Render a cell of table driven by the data's key and value
  const renderCell = (key, value, i, isFirstRow) => {
    const isHidden = !!(config[key] && config[key].isHidden);
    const showPlot = !!(config[key] && config[key].showPlot);
    const showValue = !!(config[key] && config[key].showValue);
    const range = isFirstRow ? getRange(key) : {};
    const cellHeaders = headers.map(item => item.title);
    if (!isHidden) {
      return (
        <DataCell
          cellHeaders={cellHeaders}
          key={`col-${value}${key}`}
        >
          <Cell showPlot={showPlot}>
            {(showValue || !i) && (
              <Value>
                {getFormattedValue(key, value)}
              </Value>
            )}
            {showPlot && (
              <Progress>
                <Range>
                  <div>{getFormattedValue(key, range.min)}</div>
                  <div>{getFormattedValue(key, range.max)}</div>
                </Range>
                <Dot percentage={getPercentage(key, value)} />
              </Progress>
            )}
          </Cell>
        </DataCell>
      );
    }
    return null;
  };

  return (
    <Container>
      <table>
        <Headers config={config} headers={headers} />
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {item.map(({ k, v }, i) => renderCell(k, v, i, !rowIndex))}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

Widget.defaultProps = {
  config: {},
  data: [],
  headers: [],
};

export default Widget;
