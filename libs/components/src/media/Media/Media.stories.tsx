import { Meta, Story } from '@storybook/react';
import { Media as Component, MediaProps } from './Media';

const meta: Meta = {
    component: Component,
    argTypes: {
        children: {
            control: {
                type: 'text',
            },
        },
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story<MediaProps> = args => <Component {...args} />;

export const Media = Template.bind({});
Media.args = {
    src: 'https://cdn.icatalyst.com/wp-content/uploads/sites/5/2014/02/27000520/gear-banner-1920x500.png'
};

export const MediaAudio = Template.bind({});
MediaAudio.args = {
    src: 'https://free-loops.com/data/mp3/42/f5/3b60ca3cdd98302d92a1aa941553.mp3'
};

export const MediaVideo = Template.bind({});
MediaVideo.args = {
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
};
