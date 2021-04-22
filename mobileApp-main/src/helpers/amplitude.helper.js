import amplitude from 'amplitude-js';
import config from 'resources/config';

const amplitudeInstance = amplitude.getInstance();

amplitudeInstance.init(config.amplitudeApiKey);

export default amplitudeInstance;
