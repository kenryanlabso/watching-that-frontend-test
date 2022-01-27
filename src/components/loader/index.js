// Loading indicator for fetching of data
import Spinner from 'react-spinkit';
import LoaderStyles from './styles';

const { Container } = LoaderStyles;

const Loader = () => (
  <Container>
    <Spinner
      color="#84a7ea"
      name="folding-cube"
    />
  </Container>
);

export default Loader;
