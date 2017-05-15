import {configure} from '@kadira/storybook';

function loadStories() {
	require('../.stories/Forms');
}

configure(loadStories, module);
