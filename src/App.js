import AppStyles from './styles';
import { JSON_ENDPOINT } from './utils/constants';
import Loader from './components/loader';
import Widget from './components/widget/index.js';
import { Fragment, useEffect, useState } from 'react'

const { Title, Wrapper } = AppStyles;

const App = () => {
  const [config, setConfig] = useState({});
  const [error, setError] = useState('');
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Save config to state
  const handleConfig = (configData, key) => {
    const updatedConfig = {};
    configData.forEach(config => updatedConfig[config.key] = config);
    // Store the formatted config into state
    setConfig(prevState => ({
      ...prevState,
      [key]: updatedConfig,
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    // Fetch the JSON API
    fetch(JSON_ENDPOINT).then(response => response.json())
      .then(result => {
        const { config1, config2, data: resultData } = result;
        const { data, meta } = resultData.query;

        // Convert config to object for easier access point
        handleConfig(config1, 'config1');
        handleConfig(config2, 'config2');

        setData({
          ...resultData.query,
          data: data.map((item, i) => [{ k: meta[i].key, v: meta[i].title }, ...item]),
        });
        setError('');
        setIsLoading(false);
      }).catch(() => {
        // Show error message if fetching of data failed
        setError('Unable to fetch data. Refresh the browser to try again.');
        setIsLoading(false);
      });
  }, []);


  return (
    <Wrapper>
      <Title>Dashboard widget</Title>
      {error && <p>{error}</p>}
      {isLoading
        ? <Loader />
        : (
          <Fragment>
            <Widget
              config={config.config1}
              data={data.data}
              headers={data.headers}
            />
            <Widget
              config={config.config2}
              data={data.data}
              headers={data.headers}
            />
          </Fragment>
        )}
    </Wrapper>
  );
}


export default App;
