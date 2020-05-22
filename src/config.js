import convict from 'convict';
import convict_format_with_validator from 'convict-format-with-validator';

convict.addFormat(convict_format_with_validator.url);

// Define a schema
var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  weather_request_url: {
    format: 'url',
    default: 'https://api.scit-bo.de/weather'
  },
  pv_request_url: {
    format: 'url',
    default: 'https://api.scit-bo.de/pv'
  },
  api_key: {
    doc: 'API key to request the context data',
    format: '*',
    default: 'af7d173c57f5c4816747ada9e7aad23e',
    sensitive: false
  },
  context_broker_url: {
    format: 'url',
    default: 'http://localhost:1026/v2/'
  },
  api_port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
    arg: 'port'
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'server1.dev.test'
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'users'
    }
  },
});

export default config;