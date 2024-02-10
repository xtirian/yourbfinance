import bunyan from 'bunyan';
import BunyanFormat from 'bunyan-format';

const logger = bunyan.createLogger({
  name: 'yourbfinance.io',
  streams: [
    {
      stream: BunyanFormat({ outputMode: 'short' })
    }
  ]
});

export default logger;
